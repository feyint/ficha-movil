/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {Alert, StyleSheet, View} from 'react-native';
import {useDatabase} from '../../../context/DatabaseContext';
import AsyncStorage from '@react-native-community/async-storage'

import {
  Appbar,
  Card,
  DataTable,
  FAB,
  Paragraph,
  Subheading,
  Text,
  withTheme,
} from 'react-native-paper';
import {useSYNC} from '../hooks';
import {FububivivListSync} from '../models/FububivivListSync';
import {FNBNUCVIV_FVCCONVIV} from '../../../types/FNBNUCVIV_FVCCONVIV';
import SyncService from '../service/SyncService';
let web_id:any = null;
const SyncScreen = () => {
  const [countVivienda, setCountVivienda] = useState(0);
  const [countNucleos, setCountNucleos] = useState(0);
  const [countPersonas, setCountPersonas] = useState(0);
  const [countSalud, setCountSalud] = useState(0);
  const {
    countFububivivToSync,
    countFnbnucvivToSync,
    countFnbnucvivFvcconvivToSync,
    countFnbnucvivFncpersonToSync,
    countFncpersonToSync,
    countFnbinfsalsonToSync,
    countFububiviv,
    countFcGen,
    getAllCountForSync,
    getAllCountForSyncWEB,
    getDataSincronizacion,
    updateDataSyncFububiviv,
    resetSync,
    resetSyncWEB
  } = useSYNC();

  const [loading, setIsLoading] = useState(false);
  useEffect(() => {
    forSync();
  }, []);
  async function forSync() {
    await getAllCountForSync();
  }
  async function resetSyncEntidades() {
    setCountVivienda(0);
    setCountNucleos(0);
    setCountPersonas(0);
    setCountSalud(0);
  }
  async function sync() {
    resetSyncEntidades();
    setIsLoading(true);
    var SUMA_FUBUBIVIV = 0;
    var SUMA_FNBNUCVIV = 0;
    var SUMA_FNCPERSON = 0;
    var SUMA_FNBINFSAL = 0;
    const data: any = await  getDataSincronizacion();
    SUMA_FUBUBIVIV = data.length;
    try {
      for (var i = 0; i < data.length; i++) {
        const result = await new SyncService().enviarData(data[i]);
        var json = result.data; 
        console.log(JSON.stringify(json));
        const dataBD: any = await  updateDataSyncFububiviv('FUBUBIVIV', json.movilId, json.webId);
        for (var i = 0; i < json.responseNucleoVO.length; i++) {
          SUMA_FNBNUCVIV += 1;
           const dataFNBNUCVIV: any = await  updateDataSyncFububiviv('FNBNUCVIV', json.responseNucleoVO[i].movilId, json.responseNucleoVO[i].webId);
           for (var j = 0; j < json.responseNucleoVO[i].responsePersonaVO.length; j++) {
            SUMA_FNCPERSON += 1;
            SUMA_FNBINFSAL += 1;
             const dataPersonMovilId = json.responseNucleoVO[i].responsePersonaVO[j].movilId;
             const dataPersonWebId = json.responseNucleoVO[i].responsePersonaVO[j].webId;
             const dataBDPERSON: any = await  updateDataSyncFububiviv('FNCPERSON', dataPersonMovilId, dataPersonWebId);
             const dataInformacionSaludVOMovilId = json.responseNucleoVO[i].responsePersonaVO[j].responseInformacionSaludVO.movilId;
             const dataInformacionSaludVOWebId = json.responseNucleoVO[i].responsePersonaVO[j].responseInformacionSaludVO.webId;
             const dataInfSalud: any = await  updateDataSyncFububiviv('FNBINFSAL', dataInformacionSaludVOMovilId, dataInformacionSaludVOWebId);
           }
          }
      }
      setIsLoading(false);
      setCountVivienda(SUMA_FUBUBIVIV);
      setCountNucleos(SUMA_FNBNUCVIV);
      setCountPersonas(SUMA_FNCPERSON);
      setCountSalud(SUMA_FNBINFSAL);
      
    } catch (e) {
      console.log(e, 1);
    }
  }
  function renderRow(
    catalog: string,
    loading: boolean,
    count: number,
    detail: string = '',
  ) {
    return (
      <DataTable.Row style={styles.row}>
        <DataTable.Cell>
          <View>
            <Subheading>{catalog}</Subheading>
            {detail.length > 0 ? <Paragraph>{detail}</Paragraph> : null}
          </View>
        </DataTable.Cell>
        <DataTable.Cell numeric>
          {loading ? 'Cargando..' : count}
        </DataTable.Cell>
      </DataTable.Row>
    );
  }
  return (
    <View>
      <Appbar.Header>
        <Appbar.Content title="Sincronización de información" />
      </Appbar.Header>
      <Card style={styles.container}>
        <DataTable collapsable={true}>
          <DataTable.Header>
            <DataTable.Title>Entidad </DataTable.Title>
            <DataTable.Title numeric>Cantidad por sincronizar</DataTable.Title>
          </DataTable.Header>
          {renderRow('FUBUBIVIV', loading, countVivienda)}
          {renderRow('FNBNUCVIV', loading, countNucleos)}
          {renderRow('FNCPERSON', loading, countPersonas)}
          {renderRow('FNBINFSAL', loading, countSalud)}
          {renderRow('FNBINFSAL_FNCDESARM', loading, 0)}
          {renderRow('FNCSALREP', loading, 0)}
          {renderRow('FNCSALREP_FNCCONREP', loading, 0)}
        </DataTable>
      </Card>
      <FAB
        loading={loading}
        label="Sincronizar"
        style={styles.fab}
        icon="arrow-up-circle"
        onPress={() => sync()}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    padding: 10,
    margin: 20,
    height: '70%',
  },
  titles: {
    color: 'red',
    fontSize: 20,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
  row: {
    marginBottom: 10,
  },
});
export default withTheme(SyncScreen);
