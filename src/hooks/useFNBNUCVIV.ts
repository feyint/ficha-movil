import {useState, useEffect} from 'react';
import { useFNBNUCVIV_FVCCONVIV, useFVCCONVIV } from '.';
import {useDatabase} from '../context/DatabaseContext';
import { QuestionFamilyCodes } from '../core/utils/HousingTypes';
import {PersonParametersConst} from '../core/utils/SystemParameters';
import {FNBNUCVIV, FUBUBIVIVDETAILS, FVCCONVIV} from '../types';

export function useFNBNUCVIV() {
  const [listFNBNUCVIV, setItem] = useState<FNBNUCVIV[]>([]);
  const [itemFNBNUCVIV, setFNBNUCVIV] = useState<FNBNUCVIV>();
  const [itemFUBUBIVIVDETAILS, setFUBUBIVIVDETAILS] = useState<
    FUBUBIVIVDETAILS
  >();
  const [countFNBNUCVIV, setCount] = useState<number>(0);
  const [loadingFNBNUCVIV, setLoading] = useState<boolean>(false);
  const database = useDatabase();
  const {getQuestionsOptions} = useFVCCONVIV();
  const {saveAnswer, getAnswerquestion} = useFNBNUCVIV_FVCCONVIV();

  useEffect(() => {
    //clearAllFNBNUCVIV();
    // createFNBNUCVIV({
    //   ID: 1,
    //   FUBUBIVIV_ID: 12,
    //   CODIGO: 'PRUEBA-UNO-1',
    // });
    // countEntity();
  }, []);
  function getAllFNBNUCVIV() {
    return database.getAllFromEntity('FNBNUCVIV').then(setItem);
  }
  function clearAllFNBNUCVIV() {
    return database.executeQuery('FNBNUCVIV', 'delete from {0}');
  }
  async function getLastNucleoCode(FUBUBIVIV: number, FUBUBIVIVCODE: string) {
    let NEWCODIGO = '';
    let statement = `
    SELECT * FROM {0} WHERE FUBUBIVIV_ID = ${FUBUBIVIV} ORDER BY ID DESC LIMIT 1;`;
    await database.executeQuery('FNBNUCVIV', statement).then((results) => {
      const count = results.rows.length;
      if (count === 0) {
        NEWCODIGO = FUBUBIVIVCODE + '-' + '1';
      }
      for (let i = 0; i < count; i++) {
        const row = results.rows.item(i);
        const {CODIGO} = row;
        let values = CODIGO.split('-');
        let increment = '' + (parseInt(values[2], 10) + 1);
        NEWCODIGO = FUBUBIVIVCODE + '-' + increment;
      }
    });
    return NEWCODIGO;
  }
  function filterFNBNUCVIV(FUBUBIVIV: number, single = false) {
    let statement = `
     SELECT CODIGO ,* FROM {0} WHERE FUBUBIVIV_ID = ${FUBUBIVIV}`;
    database.executeQuery('FNBNUCVIV', statement).then((results) => {
      const count = results.rows.length;
      const items: FNBNUCVIV[] = [];
      for (let i = 0; i < count; i++) {
        const row = results.rows.item(i);
        const {ID, CODIGO, FUBUBIVIV_ID} = row;
        items.push({
          ID: ID,
          CODIGO: CODIGO,
          FUBUBIVIV_ID: FUBUBIVIV_ID,
        });
      }
      if (single) {
        setFNBNUCVIV(items[0]);
      } else {
        setItem(items);
      }
    });
  }
  function getFNBNUCVIVbyID(FNBNUCVIVID: number) {
    let statement = `
     SELECT * FROM {0} WHERE ID = ${FNBNUCVIVID}`;
    return database.executeQuery('FNBNUCVIV', statement).then((results) => {
      const count = results.rows.length;
      const items: FNBNUCVIV[] = [];
      for (let i = 0; i < count; i++) {
        const row = results.rows.item(i);
        const {
          ID,
          CODIGO,
          FUBUBIVIV_ID,
          ACCESO_INTERNET,
          ANIMAL_NOVACUNADO,
          ANIMAL_VACUNADO,
          HUMO_CASA,
          LUGAR_COCINA,
          OBSERVACION,
          HUMO_DENTRO,
          RESIDUO_BOR,
          RESIDUO_PELIGROSO,
          RIESGO,
          TOTAL_ANIMAL,
        } = row;
        items.push({
          ID: ID,
          CODIGO: CODIGO,
          FUBUBIVIV_ID: FUBUBIVIV_ID,
          ACCESO_INTERNET: ACCESO_INTERNET,
          ANIMAL_NOVACUNADO: ANIMAL_NOVACUNADO,
          ANIMAL_VACUNADO: ANIMAL_VACUNADO,
          HUMO_CASA: HUMO_CASA,
          LUGAR_COCINA: LUGAR_COCINA,
          OBSERVACION: OBSERVACION,
          HUMO_DENTRO: HUMO_DENTRO,
          RESIDUO_BOR: RESIDUO_BOR,
          RESIDUO_PELIGROSO: RESIDUO_PELIGROSO,
          RIESGO: RIESGO,
          TOTAL_ANIMAL: TOTAL_ANIMAL,
        });
      }
      setFNBNUCVIV(items[0]);
      return items[0];
    });
  }
  async function createFNBNUCVIV(newItem: FNBNUCVIV) {
    setLoading(true);
    let statement = `INSERT INTO {0} 
    ( CODIGO, 
      HUMO_CASA, 
      RESIDUO_BOR, 
      RESIDUO_PELIGROSO, 
      ANIMAL_VACUNADO, 
      ANIMAL_NOVACUNADO, 
      RIESGO, 
      OBSERVACION, 
      LUGAR_COCINA, 
      HUMO_DENTRO, 
      ACCESO_INTERNET, 
      FUBUBIVIV_ID) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`;
    let params = [
      newItem.CODIGO,
      newItem.HUMO_CASA,
      newItem.RESIDUO_BOR,
      newItem.RESIDUO_PELIGROSO,
      newItem.ANIMAL_VACUNADO,
      newItem.ANIMAL_NOVACUNADO,
      newItem.RIESGO,
      newItem.OBSERVACION,
      newItem.LUGAR_COCINA,
      newItem.HUMO_DENTRO,
      newItem.ACCESO_INTERNET,
      newItem.FUBUBIVIV_ID,
    ];
    return database
      .executeQuery('FNBNUCVIV', statement, params)
      .then(async (results) => {
        const {insertId} = results;
        return await getFNBNUCVIVbyID(insertId);
      })
      .finally(() => {
        setLoading(false);
      });
  }
  async function cloneFNBNUCVIV(
    item: FNBNUCVIV,
    FUBUBIVIVID: number,
    FUBUBIVIVCODE: string,
  ) {
    setLoading(true);
    let NFCODIGO = await getLastNucleoCode(FUBUBIVIVID, FUBUBIVIVCODE);
    let NUCVIV = await getFNBNUCVIVbyID(item.ID);
    let originalNUCVIVid = NUCVIV.ID;
    NUCVIV.CODIGO = NFCODIGO;
    NUCVIV.ID = -1;
    NUCVIV.FUBUBIVIV_ID = FUBUBIVIVID;
    let created = await createFNBNUCVIV(NUCVIV);
    if (created) {
      await CloneAnswers(originalNUCVIVid, created.ID);
      return created;
    }
    setLoading(false);
    return null;
  }
  async function CloneAnswers(
    originalNUCVIVID: number,
    FNBNUCVIVID: number,
    type: 1 | 2 = 1,
  ) {
    const questions = [
      QuestionFamilyCodes.MaterialTecho,
      QuestionFamilyCodes.MaterialPiso,
      QuestionFamilyCodes.MaterialPared,
      QuestionFamilyCodes.Tenenciavivienda,
      QuestionFamilyCodes.Cocinacon,
      QuestionFamilyCodes.Numerodepersonaspordormitorio,
      QuestionFamilyCodes.Habitacionesenlavivienda,
      QuestionFamilyCodes.TipodeAlumbrado,
    ];
    let listFVCCONVIV = await getQuestionsOptions(questions);
    listFVCCONVIV.forEach(async (question) => {
      let ans = await getAnswerquestion(
        originalNUCVIVID,
        question.FVCELEVIV_ID,
        type,
      );
      if (ans) {
        saveAnswer(type, ans, FNBNUCVIVID, question.FVCELEVIV_ID);
      }
    });
  }
  async function updateFNBNUCVIV(item: FNBNUCVIV): Promise<void> {
    setLoading(true);
    let statement = `UPDATE {0}  SET
      CODIGO = ?, 
      HUMO_CASA= ?, 
      RESIDUO_BOR= ?, 
      RESIDUO_PELIGROSO= ?, 
      ANIMAL_VACUNADO= ?, 
      ANIMAL_NOVACUNADO= ?, 
      RIESGO= ?, 
      OBSERVACION= ?, 
      LUGAR_COCINA= ?, 
      HUMO_DENTRO= ?, 
      ACCESO_INTERNET= ?,
      ESTADO=1
    WHERE ID = ${item.ID}`;
    let params = [
      item.CODIGO,
      item.HUMO_CASA,
      item.RESIDUO_BOR,
      item.RESIDUO_PELIGROSO,
      item.ANIMAL_VACUNADO,
      item.ANIMAL_NOVACUNADO,
      item.RIESGO,
      item.OBSERVACION,
      item.LUGAR_COCINA,
      item.HUMO_DENTRO,
      item.ACCESO_INTERNET,
    ];
    return await database
      .executeQuery('FNBNUCVIV', statement, params)
      .then((results) => {
        getFNBNUCVIVbyID(item.ID);
        udpateViviendas(item.FUBUBIVIV_ID);
      })
      .finally(() => {
        setLoading(false);
      });
  }


  async function udpateViviendas(FUBUBIVIV_ID: any): Promise<void> {

    let statement = `UPDATE {0} SET
    ESTADO=1
    WHERE ID = ${FUBUBIVIV_ID}`;
    return await database
    .executeQuery('FUBUBIVIV', statement)
    .then((results) => {
    })
    .finally(() => {
    setLoading(false);
    });

  }  
  async function countEntity(): Promise<void> {
    return database.countEntity('FNBNUCVIV').then(setCount);
  }
  function deleteFNBNUCVIV(itemToDelete: FNBNUCVIV): Promise<void> {
    if (itemToDelete !== undefined) {
      return database
        .deleteItem('FNBNUCVIV', 'ID', itemToDelete.ID)
        .then(getAllFNBNUCVIV);
    }
    return Promise.reject(Error('Could not delete an undefined item'));
  }
  async function selectFNBNUCVIV(list: FNBNUCVIV) {
    setFNBNUCVIV(list);
  }
  async function alreadyexistParent(FNBNUCVIV_ID: number) {
    let statement = `
    SELECT prnt.ID FROM FNCPERSON p 
    INNER JOIN FNBNUCVIV_FNCPERSON np ON np.FNCPERSON_ID  = p.ID
    LEFT JOIN FNCPAREN prnt ON prnt.ID = p.FNCPAREN_ID 
    WHERE  np .FNBNUCVIV_ID = ${FNBNUCVIV_ID} AND prnt.CODIGO = '${PersonParametersConst.fncpersonparentheadercode}'`;
    return await database
      .executeQuery('FNCPERSON', statement)
      .then((results) => {
        let _id = null;
        const count = results.rows.length;
        for (let i = 0; i < count; i++) {
          const row = results.rows.item(i);
          const {ID} = row;
          _id = ID;
        }
        return _id;
      });
  }
  async function alreadyexistConyugue(FNBNUCVIV_ID: number) {
    let statement = `
    SELECT prnt.ID FROM FNCPERSON p 
    INNER JOIN FNBNUCVIV_FNCPERSON np ON np.FNCPERSON_ID  = p.ID
    LEFT JOIN FNCPAREN prnt ON prnt.ID = p.FNCPAREN_ID 
    WHERE  np .FNBNUCVIV_ID = ${FNBNUCVIV_ID} AND prnt.CODIGO = '${PersonParametersConst.fncpersonConyugueheadercode}'`;
    return await database
      .executeQuery('FNCPERSON', statement)
      .then((results) => {
        let _id = null;
        const count = results.rows.length;
        for (let i = 0; i < count; i++) {
          const row = results.rows.item(i);
          const {ID} = row;
          _id = ID;
        }
        return _id;
      });
  }
  return {
    itemFUBUBIVIVDETAILS,
    itemFNBNUCVIV,
    listFNBNUCVIV,
    countFNBNUCVIV,
    loadingFNBNUCVIV,
    alreadyexistParent,
    alreadyexistConyugue,
    getFNBNUCVIVbyID,
    createFNBNUCVIV,
    deleteFNBNUCVIV,
    selectFNBNUCVIV,
    getAllFNBNUCVIV,
    filterFNBNUCVIV,
    cloneFNBNUCVIV,
    updateFNBNUCVIV,
    getLastNucleoCode,
  };
}
