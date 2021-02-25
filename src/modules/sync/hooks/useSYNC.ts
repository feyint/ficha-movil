import {FnbnucvivSync} from './../models/FnbnucvivSync';
import {FUBUBIVIV} from './../../../types/FUBUBIVIV';
import {FUCZONCUI_FUCBARVER} from './../../../types/FUCZONCUI_FUCBARVER';
import {FNBNUCVIV_FVCCONVIV} from './../../../types/FNBNUCVIV_FVCCONVIV';
import {FNBNUCVIV_FNCPERSON} from './../../../types/FNBNUCVIV_FNCPERSON';
import {FNCPERSON} from './../../../types/FNCPERSON';
import {FNBINFSAL} from './../../../types/FNBINFSAL';
import {FNBINFSAL_FNCDESARM} from './../../../types/FNBINFSAL_FNCDESARM';
import {FububivivSync} from './../models/FububivivSync';
import {FububivivListSync} from './../models/FububivivListSync';
/* eslint-disable react-hooks/exhaustive-deps */
import {useState, useEffect} from 'react';
import {useDatabase} from '../../../context/DatabaseContext';
import {FNBNUCVIV} from '../../../types';
import axios from 'axios';
import Moment from 'moment';
const API_REST_URL = 'http://192.168.0.3:9098/api/solicitud/';

export function useSYNC() {
  const [countFububivivToSync, setCountFububivivToSync] = useState<number>(0);
  const [countFububiviv, setCountFububiviv] = useState<number>(0);
  const [countFnbnucvivToSync, setCountFnbnucvivToSync] = useState<number>(0);
  const [countFnbnucvivFvcconvivToSync,setCountFnbnucvivFvcconvivToSync] = useState<number>(0);
  const [countFnbnucvivFncpersonToSync,setCountFnbnucvivFncpersonToSync,] = useState<number>(0);
  const [countFncpersonToSync, setCountFncpersonToSync] = useState<number>(0);
  const [countFnbinfsalsonToSync,setCountFnbinfsalsonToSync,] = useState<number>(0);
  const [countFcGen, setCountFcGen] = useState<number>(0);
  const database = useDatabase();
  useEffect(() => {}, []);

  async function getCountForEntinty(entity: string, setValue: any) {
    let count = 0;
      let statement = 'SELECT COUNT(*) as total FROM {0} WHERE WEB_ID IS NULL;';
      await database.executeQuery(entity, statement).then((results) => {
        for (let i = 0; i < results.rows.length; i++) {
          const row = results.rows.item(i);
          const {total} = row;
          count += total;
        }
      });
      setValue(count);
  }

  async function getAllCountForSync() {
    await getCountForEntinty('FUBUBIVIV', setCountFububiviv);
    await getCountForEntinty('FUBUBIVIV', setCountFububivivToSync);
    await getCountForEntinty('FNBNUCVIV', setCountFnbnucvivToSync);
    await getCountForEntinty('FNBNUCVIV_FVCCONVIV',setCountFnbnucvivFvcconvivToSync);
    await getCountForEntinty('FNBNUCVIV_FNCPERSON',setCountFnbnucvivFncpersonToSync);
    await getCountForEntinty('FNCPERSON', setCountFncpersonToSync);
    await getCountForEntinty('FNBINFSAL', setCountFnbinfsalsonToSync);
    await getCountForEntintyWeb(setCountFcGen);
  }
  async function getAllCountForSyncWEB() {
    await getCountForEntintyWeb(setCountFcGen);
  }
  function resetSync() {
    setCountFububivivToSync(0);
    setCountFnbnucvivToSync(0);
    setCountFnbnucvivFvcconvivToSync(0);
    setCountFnbnucvivFncpersonToSync(0);
    setCountFncpersonToSync(0);
    setCountFnbinfsalsonToSync(0);
    setCountFcGen(0);
  }
  function resetSyncWEB() {
    setCountFcGen(0);
  }

  async function getCountForEntintyWeb(setValue: any) {
    let count = 0;
    let lote = await axios.get(API_REST_URL + "count_generos");
    count = lote.data
    setValue(count);
  }

  async function getFuczoncuiFucbarver(FUCZONCUI_FUCBARVER_ID: any)
  {
    let statement = `SELECT * FROM FUCZONCUI_FUCBARVER WHERE ID = ${FUCZONCUI_FUCBARVER_ID};`;
    return await database
      .executeQuery('FUCZONCUI_FUCBARVER', statement)
      .then((results) => {
        const count = results.rows.length;
        const items = [];
        for (let i = 0; i < count; i++) {
          const row = results.rows.item(i);
          items.push({
            "id": row.ID,
            "idZonaCuidadado": row.FUCZONCUI_ID,
            "idBarVer": row.FUCBARVER_ID
          });
        }
        return items;
      });
  }
  async function  getFnbnucviv_fvcconviv(ID: any)
  {
    let statement = `SELECT * FROM FNBNUCVIV_FVCCONVIV WHERE WEB_ID IS NULL AND FNBNUCVIV_ID = ${ID};`;
    return await database
      .executeQuery('FNBNUCVIV_FVCCONVIV', statement)
      .then((results) => {
        const count = results.rows.length;
        const items = [];
        for (let i = 0; i < count; i++) {
          const row = results.rows.item(i);
          items.push({
            "id": row.ID,
            "idNucleoVivienda": row.FNBNUCVIV_ID,
            "idCondicionVivienda": row.FVCCONVIV_ID,
            "idEmementoVivienda": row.FVCELEVIV_ID
          });
        }
        return items;
      });
  }
  async function getFnbInfsalFncdesarm(ID: any)
  {
    let statement = `SELECT * FROM FNBINFSAL_FNCDESARM WHERE FNBINFSAL_ID = ${ID};`;
    return await database
      .executeQuery('FNBINFSAL_FNCDESARM', statement)
      .then((results) => {
        const count = results.rows.length;
        const items = [];
        for (let i = 0; i < count; i++) {
          const row = results.rows.item(i);
          items.push({
            'id': row.ID,
            'fnbinfsalId': row.FNBINFSAL_ID,
            'fncdesarmId': row.FNCDESARM_ID
          });
        }
        return items;
      });
  }

  async function getFnbinfSal(ID: any)
  {
    let statement = `SELECT * FROM FNBINFSAL WHERE (WEB_ID IS NULL OR ESTADO = 1) AND FNCPERSON_ID = ${ID};`;
    return await database
      .executeQuery('FNBINFSAL', statement)
      .then(async (results) => {
        const count = results.rows.length;
        const items = [];
        for (let i = 0; i < count; i++) {
          const row = results.rows.item(i);
          results.rows.item(i).FNBINFSAL_FNCDESARM = await getFnbInfsalFncdesarm(results.rows.item(i).ID);

          if(row.FECHA_MUERTE === null || row.FECHA_MUERTE == "")
          {
            row.FECHA_MUERTE = null;
          }
          else
          {
            row.FECHA_MUERTE = Moment(row.FECHA_MUERTE).format('YYYY-MM-DD');
          }

          items.push({
            'id': row.ID,
            'idPersona': row.FNCPERSON_ID,
            'peso': row.PESO,
            'talla': row.TALLA,
            'TaSistolica': row.TA_SISTOLICA,
            'TaDiastolica': row.TA_DIASTOLICA,
            'usoProtesis': row.USO_PROTESIS,
            'tiempoProtesis': row.TIEMPO_PROTESIS,
            'ultimaVisita': ( row.ULTIMA_VISITA != null) ? Moment(row.ULTIMA_VISITA).format('YYYY-MM-DD') : null,   
            'fechaMuerte': row.FECHA_MUERTE,  
            'interpretacionImc': row.FNCINTIMC_ID,
            'interpretacionTa': row.FNCINTTEA_ID,
            'estado': row.ESTADO,
            'informacionSaludDesarmonia': row.FNBINFSAL_FNCDESARM
          });
        }
        return items;
      });
  }
  async function getFncSalRepFncconRep(ID: any)
  {
    let statement = `SELECT * FROM FNCSALREP_FNCCONREP WHERE FNCSALREP_ID = ${ID};`;
    return await database
      .executeQuery('FNCSALREP_FNCCONREP', statement)
      .then(async (results) => {
        const count = results.rows.length;
        const items = [];
        for (let i = 0; i < count; i++) {
          const row = results.rows.item(i);
          items.push({
            'id  ': row.ID,
            'fncsalrepId': row.FNCSALREP_ID,
            'fncconrepId': row.FNCCONREP_ID,
            'seleccion': row.SELECCION,
            'fncelerepId': row.FNCELEREP_ID,
            'fechaActividad': ( row.FECHA_ACTIVIDAD != null ) ? Moment(row.FECHA_ACTIVIDAD).format('YYYY-MM-DD') : null,  
            'usuarioData': row.USUARIO_DATA,
            'fechaCreacion': ( row.FECHA_CREACION != null ) ? Moment(row.FECHA_CREACION).format('YYYY-MM-DD') : null, 
            'origenData': row.ORIGEN_DATA,
          });
        }
        return items;
      });
  }
  async function getFncSalRep(ID: any)
  {
    let statement = `SELECT * FROM {0} WHERE WEB_ID IS NULL AND FNCPERSON_ID = ${ID};`;
    return await database
      .executeQuery('FNCSALREP', statement)
      .then(async (results) => {
        const count = results.rows.length;
        const items = [];
        for (let i = 0; i < count; i++) {
          const row = results.rows.item(i);
          results.rows.item(i).FNCSALREP_FNCCONREP = await getFncSalRepFncconRep(results.rows.item(i).ID);
          items.push({
            'id': row.ID,
            'edadPrimeraRegla': row.EDAD_PRIMERA_REGLA,
            'gravidez': row.GRAVIDEZ,
            'paridez': row.PARIDEZ,
            'aborto': row.ABORTO,
            'cesarea': row.CESAREA,
            'nacidosVivos': row.NACIDOS_VIVOS,
            'nacidosMuertos': row.NACIDOS_MUERTOS,
            'partoUltimo': ( row.PARTO_ULTIMO != null ) ? Moment(row.PARTO_ULTIMO).format('YYYY-MM-DD') : null, 
            'ultimaRegla': ( row.ULTIMA_REGLA != null ) ? Moment(row.ULTIMA_REGLA).format('YYYY-MM-DD') : null, 
            'edadGestacion': row.EDAD_GESTACION,
            'partoEstimado': ( row.PARTO_ESTIMADO != null ) ? Moment(row.PARTO_ESTIMADO).format('YYYY-MM-DD') : null,
            'presenciaFam': row.PRESENCIA_FAM,
            'serologia': row.SEROLOGIA,
            'vih': row.VIH,
            'resulCitologia': row.RESUL_CITOLOGIA,
            'accionCitologia': row.ACCION_CITOLOGIA,
            'resulProstata': row.RESUL_PROSTATA,
            'accionProstata': row.ACCION_PROSTATA,
            'fechaActividad': ( row.FECHA_ACTIVIDAD != null ) ? Moment(row.FECHA_ACTIVIDAD).format('YYYY-MM-DD') : null,
            'usuarioData': row.USUARIO_DATA,
            'fechaCreacion': ( row.FECHA_CREACION != null ) ? Moment(row.FECHA_CREACION).format('YYYY-MM-DD') : null,
            'origenData': row.ORIGEN_DATA,
            'fncpersonId': row.FNCPERSON_ID,
            'saludReproductiva': row.FNCSALREP_FNCCONREP
          });
        }
        return items;
      });
  }
  async function getFnbnucviv_fncperson(ID: any)
  {
    let statement = `SELECT * FROM FNBNUCVIV_FNCPERSON WHERE WEB_ID IS NULL AND FNBNUCVIV_ID = ${ID};`;
    return await database
      .executeQuery('FNBNUCVIV_FNCPERSON', statement)
      .then(async (results) => {
        const count = results.rows.length;
        const items = [];
        for (let i = 0; i < count; i++) {
          const row = results.rows.item(i);
          items.push({
            "id": row.ID,
            "idNucleoVivienda": row.FNBNUCVIV_ID,
            "idPersona": row.FNCPERSON_ID,
          });
        }
        return items;
      });
  }

  async function convert(str: any) {
    var date = new Date(str),
        mnth = ("0" + (date.getMonth() + 1)).slice(-2),
        day = ("0" + date.getDate()).slice(-2);
    return [date.getFullYear(), mnth, day].join("-");
 }

  async function fncDataPerson(ID: any)
  {
    let statement = `SELECT P.ID,P.WEB_ID,P.CODIGO,P.IDENTIFICACION,P.PRIMER_NOMBRE,P.SEGUNDO_NOMBRE,P.PRIMER_APELLIDO,P.SEGUNDO_APELLIDO,P.FECHA_NACIMIENTO,P.TEL_CELULAR,P.TEL_ALTERNO,P.CORREO_ELECTRONICO,P.FECHA_ACTIVIDAD,P.FECHA_CREACION,P.FNCTIPIDE_ID,P.FNCORGANI_ID,P.FNCLUNIND_ID,P.FNCOCUPAC_ID,P.FUCMUNICI_ID,P.FNCPAREN_ID,P.FNCGENERO_ID,P.FVBENCUES_ID,P.FNCPUEIND_ID,P.ESTADO FROM FNCPERSON P INNER JOIN FNBNUCVIV_FNCPERSON F ON F.FNCPERSON_ID = P.ID WHERE (P.WEB_ID IS NULL OR P.ESTADO = 1) AND F.FNBNUCVIV_ID = ${ID};`;
    return await database
      .executeQuery('FNCPERSON', statement)
      .then(async (results) => {
        const count = results.rows.length;
        const items = [];
        for (let i = 0; i < count; i++) {
          const row = results.rows.item(i);
          results.rows.item(i).FNBINFSAL = await getFnbinfSal(results.rows.item(i).ID);
          results.rows.item(i).FNCSALREP = await getFncSalRep(results.rows.item(i).ID);
          items.push({
            "id": row.ID,
            "codigo": row.CODIGO,
            "identificacion": row.IDENTIFICACION,
            "primerNombre": row.PRIMER_NOMBRE,
            "segundoNombre": row.SEGUNDO_NOMBRE,
            "primerApellido": row.PRIMER_APELLIDO,
            "segundoApellido": row.SEGUNDO_APELLIDO,
            "fechaNacimiento": ( row.FECHA_NACIMIENTO != null ) ? Moment(row.FECHA_NACIMIENTO).format('YYYY-MM-DD') : null, 
            "telCelular": row.TEL_CELULAR,
            "telAlterno": row.TEL_ALTERNO,
            "correoElectronico": row.CORREO_ELECTRONICO,
            "FECHA_ACTIVIDAD": ( row.FECHA_ACTIVIDAD != null ) ? Moment(row.FECHA_ACTIVIDAD).format('YYYY-MM-DD') : null,  
            "FECHA_CREACION": ( row.FECHA_CREACION != null ) ? Moment(row.FECHA_CREACION).format('YYYY-MM-DD') : null,  
            "tipoIde": row.FNCTIPIDE_ID,
            "organizacion": row.FNCORGANI_ID,
            "lunaIndigena": row.FNCLUNIND_ID,
            "ocupacion": row.FNCOCUPAC_ID,
            "municipio": row.FUCMUNICI_ID,
            "parentesco": row.FNCPAREN_ID,
            "genero": row.FNCGENERO_ID,
            "puebloIndigena": row.FNCPUEIND_ID,
            "encuestador": row.FVBENCUES_ID,
            "informacionSalud": row.FNBINFSAL,
            "saludReproductiva": row.FNCSALREP,
            "estado": row.ESTADO,
            "web_id": row.WEB_ID

          });
        }
        return items;
      });

  }
  async function getFnbnucviv(ID: any)
  {
    let statement = `SELECT * FROM {0} WHERE (WEB_ID IS NULL OR ESTADO = 1) AND FUBUBIVIV_ID = ${ID};`;
    return await database
      .executeQuery('FNBNUCVIV', statement)
      .then(async (results) => {
        const count = results.rows.length;
        const items = [];
        for (let i = 0; i < count; i++) {
          const row = results.rows.item(i);
          results.rows.item(i).FNBNUCVIV_FVCCONVIV = await getFnbnucviv_fvcconviv(results.rows.item(i).ID);
          results.rows.item(i).FNBNUCVIV_FNCPERSON = await getFnbnucviv_fncperson(results.rows.item(i).ID);
          results.rows.item(i).FNCPERSON = await fncDataPerson(results.rows.item(i).ID);
          items.push({
            "id": row.ID,
            "web_id": row.WEB_ID,
            "codigo": row.CODIGO,
            "humo_casa": row.HUMO_CASA,
            "residuo_bor": row.RESIDUO_BOR,
            "residuo_peligroso": row.RESIDUO_PELIGROSO,
            "animal_vacunado": row.ANIMAL_VACUNADO,
            "animal_novacunado": row.ANIMAL_NOVACUNADO,
            "riesgo": row.RIESGO,
            "observacion":  row.OBSERVACION,
            "lugar_cocina": row.LUGAR_COCINA,
            "humo_dentro": row.HUMO_DENTRO,
            "acceso_internet": row.ACCESO_INTERNET,
            "total_animal": row.TOTAL_ANIMAL,
            "nucleoViviendaCondicionVivienda": row.FNBNUCVIV_FVCCONVIV,
            "nucleoViviendaPersona": row.FNBNUCVIV_FNCPERSON,
            "persona": row.FNCPERSON,
            "estado": row.ESTADO,

          });
        }
        return items;
      });
  }

  async function getDataSincronizacion(): Promise<any> {

    const MAX_OBJECTS_TO_SYNC = 2;
    const fububivivListSync: FububivivListSync = new FububivivListSync();
    let statement = `SELECT * FROM FUBUBIVIV WHERE WEB_ID IS NULL OR ESTADO =1;`;
    const results = await database.executeQuery('FUBUBIVIV', statement);
    const myData = [];
    for (let i = 0; i < results.rows.length && i < MAX_OBJECTS_TO_SYNC; i++) {
      const row = results.rows.item(i);
      results.rows.item(i).FUCZONCUI_FUCBARVER = await getFuczoncuiFucbarver(results.rows.item(i).FUCZONCUI_FUCBARVER_ID);
      results.rows.item(i).FNBNUCVIV = await getFnbnucviv(results.rows.item(i).ID);


      myData.push({
        "estado": row.ESTADO,
        "encuestador": 1,
        "coordenada_x": row.COORDENADA_X,
        "direccion": row.DIRECCION,
        "codigo": row.CODIGO,
        "idZonaCuidadoBarVer": row.FUCZONCUI_FUCBARVER_ID,
        "web_id": row.WEB_ID,
        "coordenada_y": row.COORDENADA_Y,
        "id": row.ID,
        "zonaCuidadoBarVer": row.FUCZONCUI_FUCBARVER,
        "nucleoVivienda": row.FNBNUCVIV
      });
    }
    return myData;
  }

  async function updateDataSyncFububiviv(entity: string, movilId:any,webId:any){
    let statement = `UPDATE {0} SET
    WEB_ID = ?,
    ESTADO = 2
    WHERE ID = ${movilId}`;
    let params = [
      webId,
    ];
    return await database
      .executeQuery(entity, statement, params)
      .then((results) => {
      })
      .finally(() => {
      });
  }
  return {
    countFububiviv,
    countFububivivToSync,
    countFnbnucvivToSync,
    countFnbnucvivFvcconvivToSync,
    countFnbnucvivFncpersonToSync,
    countFncpersonToSync,
    countFnbinfsalsonToSync,
    countFcGen,
    getAllCountForSync,
    getAllCountForSyncWEB,
    getDataSincronizacion,
    updateDataSyncFububiviv,
    resetSync,
    resetSyncWEB,
  };
}
