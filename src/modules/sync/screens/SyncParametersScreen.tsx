import React, {useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Appbar, Card, DataTable, FAB, Paragraph} from 'react-native-paper';
import {
  useFNCCONPER,
  useFNCELEPER,
  useFNCGENERO,
  useFNCINTIMC,
  useFNCINTTEA,
  useFNCLUNIND,
  useFNCOCUPAC,
  useFNCPAREN,
  useFNCPUEIND,
  useFNCTIPIDE,
  useFSCSEMAFO,
  useFUCBARVER,
  useFUCDEPART,
  useFUCMUNICI,
  useFUCPAIS,
  useFUCRESGUA,
  useFUCTIPTER,
  useFUCTIPTER_FUCRESGUA,
  useFUCZONCUI,
  useFUCZONCUI_FUCBARVER,
  useFVCCONVIV,
  useFVCELEVIV,
  useSGCSISPAR,
} from '../../../hooks';
import {useFNCCONREP} from '../../../hooks/useFNCCONREP';
import {useFNCCONSAL} from '../../../hooks/useFNCCONSAL';
import {useFNCDESARM} from '../../../hooks/useFNCDESARM';
import {useFNCELEREP} from '../../../hooks/useFNCELEREP';
import {useFNCELESAL} from '../../../hooks/useFNCELESAL';
import {useFNCORGANI} from '../../../hooks/useFNCORGANI';

const SyncParametersScreen = () => {
  const {countFVCELEVIV, syncFVCELEVIV, loadingFVCELEVIV} = useFVCELEVIV();
  const {countFVCCONVIV, syncFVCCONVIV, loadingFVCCONVIV} = useFVCCONVIV();
  const {countFUCDEPART, syncFUCDEPART, loadingFUCDEPART} = useFUCDEPART();
  const {countFUCMUNICI, syncFUCMUNICI, loadingFUCMUNICI} = useFUCMUNICI();
  const {countFUCTIPTER, syncFUCTIPTER, loadingFUCTIPTER} = useFUCTIPTER();
  const {countFUCBARVER, syncFUCBARVER, loadingFUCBARVER} = useFUCBARVER();
  const {countFUCRESGUA, syncFUCRESGUA, loadingFUCRESGUA} = useFUCRESGUA();
  const {countFUCZONCUI, syncFUCZONCUI, loadingFUCZONCUI} = useFUCZONCUI();
  const {countFNCTIPIDE, syncFNCTIPIDE, loadingFNCTIPIDE} = useFNCTIPIDE();
  const {countFNCPAREN, syncFNCPAREN, loadingFNCPAREN} = useFNCPAREN();
  const {countFNCOCUPAC, syncFNCOCUPAC, loadingFNCOCUPAC} = useFNCOCUPAC();
  const {countFNCPUEIND, syncFNCPUEIND, loadingFNCPUEIND} = useFNCPUEIND();
  const {countFNCLUNIND, syncFNCLUNIND, loadingFNCLUNIND} = useFNCLUNIND();
  const {countFNCGENERO, syncFNCGENERO, loadingFNCGENERO} = useFNCGENERO();
  const {countFNCELEPER, syncFNCELEPER, loadingFNCELEPER} = useFNCELEPER();
  const {countFNCCONPER, syncFNCCONPER, loadingFNCCONPER} = useFNCCONPER();
  const {countFUCPAIS, syncFUCPAIS, loadingFUCPAIS} = useFUCPAIS();
  const {countFNCORGANI, syncFNCORGANI, loadingFNCORGANI} = useFNCORGANI();
  const {countFNCDESARM, syncFNCDESARM, loadingFNCDESARM} = useFNCDESARM();
  const {countFNCELESAL, syncFNCELESAL, loadingFNCELESAL} = useFNCELESAL();
  const {countFNCCONSAL, syncFNCCONSAL, loadingFNCCONSAL} = useFNCCONSAL();
  const {countFNCELEREP, syncFNCELEREP, loadingFNCELEREP} = useFNCELEREP();
  const {countFNCCONREP, syncFNCCONREP, loadingFNCCONREP} = useFNCCONREP();
  const {countSGCSISPAR, syncSGCSISPAR, loadingSGCSISPAR} = useSGCSISPAR();
  const {countFNCINTIMC, syncFNCINTIMC, loadingFNCINTIMC} = useFNCINTIMC();
  const {countFSCSEMAFO, syncFSCSEMAFO, loadingFSCSEMAFO} = useFSCSEMAFO();
  const {countFNCINTTEA, syncFNCINTTEA, loadingFNCINTTEA} = useFNCINTTEA();
  const {
    syncFUCZONCUI_FUCBARVER,
    countFUCZONCUI_FUCBARVER,
    loadingFUCZONCUI_FUCBARVER,
  } = useFUCZONCUI_FUCBARVER();
  const {
    countFUCTIPTER_FUCRESGUA,
    loadingFUCTIPTER_FUCRESGUA,
    syncFUCTIPTER_FUCRESGUA,
  } = useFUCTIPTER_FUCRESGUA();
  useEffect(() => {}, []);
  function syncCatalogs() {
    if (
      loadingFVCELEVIV ||
      loadingFVCCONVIV ||
      loadingFUCDEPART ||
      loadingFUCMUNICI ||
      loadingFUCTIPTER ||
      loadingFUCBARVER ||
      loadingFUCRESGUA ||
      loadingFUCZONCUI ||
      loadingFUCZONCUI_FUCBARVER ||
      loadingFNCTIPIDE ||
      loadingFNCOCUPAC ||
      loadingFNCPUEIND ||
      loadingFNCLUNIND ||
      loadingFNCGENERO ||
      loadingFNCELEPER ||
      loadingFNCCONPER ||
      loadingFNCORGANI ||
      loadingFNCDESARM ||
      loadingFNCELESAL ||
      loadingFNCCONSAL ||
      loadingFNCELEREP ||
      loadingFNCCONREP ||
      loadingFUCTIPTER_FUCRESGUA ||
      loadingSGCSISPAR ||
      loadingFNCINTIMC ||
      loadingFSCSEMAFO ||
      loadingFNCINTTEA
    ) {
    } else {
      syncFVCELEVIV();
      syncFVCCONVIV();
      syncFUCDEPART();
      syncFUCMUNICI();
      syncFUCTIPTER();
      syncFUCBARVER();
      syncFUCRESGUA();
      syncFUCZONCUI();
      syncFUCZONCUI_FUCBARVER();
      syncFNCTIPIDE();
      syncFNCPAREN();
      syncFNCOCUPAC();
      syncFNCPUEIND();
      syncFNCLUNIND();
      syncFNCGENERO();
      syncFNCELEPER();
      syncFNCCONPER();
      syncFUCPAIS();
      syncFNCORGANI();
      syncFNCDESARM();
      syncFNCELESAL();
      syncFNCCONSAL();
      syncFNCELEREP();
      syncFNCCONREP();
      syncFUCTIPTER_FUCRESGUA();
      syncSGCSISPAR();
      syncFNCINTIMC();
      syncFSCSEMAFO();
      syncFNCINTTEA();
    }

    //await this.clearPollEntities();
    // this.countEntity();
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
          {catalog}
          <View>
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
    <View style={{flex: 1}}>
      <Appbar.Header>
        <Appbar.Content title="Parametrización de información" />
      </Appbar.Header>
      <KeyboardAwareScrollView>
        <Card style={styles.container}>
          <DataTable collapsable={true}>
            <DataTable.Header>
              <DataTable.Title style={styles.titles}>Catalogo</DataTable.Title>
              <DataTable.Title numeric>Registros</DataTable.Title>
            </DataTable.Header>
            {renderRow(
              'FVCELEVIV',
              loadingFVCELEVIV,
              countFVCELEVIV,
              '(Preguntas Nucleo familiar)',
            )}
            {renderRow(
              'FVCCONVIV',
              loadingFVCCONVIV,
              countFVCCONVIV,
              '(Opciones de Respuestas Nucleo familiar)',
            )}
            {renderRow('FUCPAIS (Departamentos)', loadingFUCPAIS, countFUCPAIS)}
            {renderRow(
              'FUCDEPART (Departamentos)',
              loadingFUCDEPART,
              countFUCDEPART,
            )}
            {renderRow(
              'FUCMUNICI (Municipios)',
              loadingFUCMUNICI,
              countFUCMUNICI,
            )}
            {renderRow(
              'FUCTIPTER (tipo territorio)',
              loadingFUCTIPTER,
              countFUCTIPTER,
            )}
            {renderRow(
              'FUCBARVER (centros poblados)',
              loadingFUCBARVER,
              countFUCBARVER,
            )}
            {renderRow(
              'FUCRESGUA (reguardo/c poblado)',
              loadingFUCRESGUA,
              countFUCRESGUA,
            )}
            {renderRow(
              'FUCZONCUI (Zona de cuidado)',
              loadingFUCZONCUI,
              countFUCZONCUI,
            )}
            {renderRow(
              '(FUCZONCUI relación barrios/veredas)',
              loadingFUCZONCUI_FUCBARVER,
              countFUCZONCUI_FUCBARVER,
            )}
            {renderRow(
              'FUCTIPTER_FUCRESGUA',
              loadingFUCTIPTER_FUCRESGUA,
              countFUCTIPTER_FUCRESGUA,
            )}
            {renderRow(
              'FNCTIPIDE (tipo identificacion)',
              loadingFNCTIPIDE,
              countFNCTIPIDE,
            )}
            {renderRow('FNCPAREN (parentezco)', loadingFNCPAREN, countFNCPAREN)}
            {renderRow(
              'FNCOCUPAC (ocupación)',
              loadingFNCOCUPAC,
              countFNCOCUPAC,
            )}
            {renderRow(
              'FNCPUEIND (pueblo indigena)',
              loadingFNCPUEIND,
              countFNCPUEIND,
            )}
            {renderRow(
              'FNCLUNIND (luna indigena)',
              loadingFNCLUNIND,
              countFNCLUNIND,
            )}
            {renderRow('FNCGENERO(genero)', loadingFNCGENERO, countFNCGENERO)}
            {renderRow(
              'FNCELEPER(Person question)',
              loadingFNCELEPER,
              countFNCELEPER,
            )}
            {renderRow(
              'FNCCONPER(Person options)',
              loadingFNCCONPER,
              countFNCCONPER,
            )}
            {renderRow(
              'FNCORGANI(Organizacion)',
              loadingFNCORGANI,
              countFNCORGANI,
            )}
            {renderRow(
              'FNCORGANI(Desarmonia)',
              loadingFNCDESARM,
              countFNCDESARM,
            )}
            {renderRow(
              'PARAMTEROS DEL SISTEMA ',
              loadingSGCSISPAR,
              countSGCSISPAR,
            )}
            {renderRow('FNCELESAL()', loadingFNCELESAL, countFNCELESAL)}
            {renderRow('FNCCONSAL()', loadingFNCCONSAL, countFNCCONSAL)}
            {renderRow('FNCELEREP()', loadingFNCELEREP, countFNCELEREP)}
            {renderRow('FNCCONREP()', loadingFNCCONREP, countFNCCONREP)}
            {renderRow('FNCINTIMC()', loadingFNCINTIMC, countFNCINTIMC)}
            {renderRow('FSCSEMAFO()', loadingFSCSEMAFO, countFSCSEMAFO)}
            {renderRow('FNCINTTEA()', loadingFNCINTTEA, countFNCINTTEA)}
          </DataTable>
        </Card>
      </KeyboardAwareScrollView>
      <FAB
        loading={
          loadingFVCELEVIV ||
          loadingFVCCONVIV ||
          loadingFUCDEPART ||
          loadingFUCMUNICI ||
          loadingFUCTIPTER ||
          loadingFUCBARVER ||
          loadingFUCRESGUA ||
          loadingFUCZONCUI ||
          loadingFUCZONCUI_FUCBARVER ||
          loadingFNCTIPIDE ||
          loadingFNCOCUPAC ||
          loadingFNCPUEIND ||
          loadingFNCLUNIND ||
          loadingFNCGENERO ||
          loadingFNCELEPER ||
          loadingFNCCONPER ||
          loadingFNCORGANI ||
          loadingFNCDESARM ||
          loadingFNCELESAL ||
          loadingFNCELEREP ||
          loadingFNCCONREP ||
          loadingFUCTIPTER_FUCRESGUA ||
          loadingSGCSISPAR ||
          loadingFNCINTIMC ||
          loadingFSCSEMAFO ||
          loadingFNCINTTEA
        }
        label="Sincronizar Catalogos"
        style={styles.fab}
        icon="arrow-down-circle"
        onPress={() => syncCatalogs()}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    padding: 10,
    margin: 20,
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
export default SyncParametersScreen;
