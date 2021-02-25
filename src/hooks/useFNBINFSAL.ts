import {useState, useEffect} from 'react';
import {useDatabase} from '../context/DatabaseContext';
import {FNBINFSAL} from '../types';

export function useFNBINFSAL() {
  const [listFNBINFSAL, setItem] = useState<FNBINFSAL[]>([]);
  const [itemFNBINFSAL, setFNBINFSAL] = useState<FNBINFSAL>();
  const [countFNBINFSAL, setCount] = useState<number>(0);
  const [loadingFNBINFSAL, setLoading] = useState<boolean>(false);
  const database = useDatabase();
  useEffect(() => {}, []);
  function getAllFNBINFSAL() {
    return database.getAllFromEntity('FNBINFSAL').then(setItem);
  }
  function clearAllFNBINFSAL() {
    return database.executeQuery('FNBINFSAL', 'delete from {0}');
  }
  function getFNBINFSALbyID(
    FNBINFSALID: number,
    _FNCPERSON_ID: any = undefined,
  ) {
    let statement = `
    SELECT * FROM {0} WHERE ID = ${FNBINFSALID}`;
    if (_FNCPERSON_ID) {
      statement = `
        SELECT * FROM {0} WHERE FNCPERSON_ID = ${_FNCPERSON_ID}`;
    }
    return database.executeQuery('FNBINFSAL', statement).then((results) => {
      const count = results.rows.length;
      const items: FNBINFSAL[] = [];
      for (let i = 0; i < count; i++) {
        const row = results.rows.item(i);
        const {
          ID,
          FNCPERSON_ID,
          PESO,
          TALLA,
          TA_SISTOLICA,
          TA_DIASTOLICA,
          USO_PROTESIS,
          TIEMPO_PROTESIS,
          ULTIMA_VISITA,
          FECHA_MUERTE,
          FNCINTIMC_ID,
          FNCINTTEA_ID,
          ESTADO,
        } = row;
        items.push({
          ID,
          FNCPERSON_ID,
          PESO,
          TALLA,
          TA_SISTOLICA,
          TA_DIASTOLICA,
          USO_PROTESIS,
          TIEMPO_PROTESIS,
          ULTIMA_VISITA,
          FECHA_MUERTE,
          FNCINTIMC_ID,
          FNCINTTEA_ID,
          ESTADO,
        });
      }
      setFNBINFSAL(items[0]);
      return items[0];
    });
  }
  async function createFNBINFSAL(item: FNBINFSAL) {
    setLoading(true);
    let statement = `INSERT INTO {0} 
            (FNCPERSON_ID) 
            VALUES ('${item.FNCPERSON_ID}');`;
    return await database
      .executeQuery('FNBINFSAL', statement)
      .then(async (results) => {
        const {insertId} = results;
        return await getFNBINFSALbyID(insertId);
      })
      .catch((err) => {console.error('error createFNBINFSAL');})
      .finally(() => {
        setLoading(false);
      });
  }
  async function updateFNBINFSAL(item: FNBINFSAL): Promise<void> {
    setLoading(true);
    let statement = `UPDATE {0}  SET
            TALLA=${item.TALLA ? item.TALLA : null}, 
            PESO=${item.PESO ? item.PESO : null}, 
            TA_SISTOLICA=${item.TA_SISTOLICA ? item.TA_SISTOLICA : null}, 
            TA_DIASTOLICA=${item.TA_DIASTOLICA ? item.TA_DIASTOLICA : null}, 
            USO_PROTESIS=${item.USO_PROTESIS ? 1 : 0}, 
            TIEMPO_PROTESIS=${item.TIEMPO_PROTESIS ? 1 : 0}, 
            ULTIMA_VISITA='${item.ULTIMA_VISITA ? item.ULTIMA_VISITA : ''}', 
            FECHA_MUERTE='${item.FECHA_MUERTE ? item.FECHA_MUERTE : ''}',
            FNCINTIMC_ID=${item.FNCINTIMC_ID ? item.FNCINTIMC_ID : null}, 
            FNCINTTEA_ID=${item.FNCINTTEA_ID ? item.FNCINTTEA_ID : null}, 
            ESTADO=1
            WHERE ID = ${item.ID}`;
    return await database
      .executeQuery('FNBINFSAL', statement)
      .then((results) => {
        getFNBINFSALbyID(item.ID);
        updateEstado(item.FNCPERSON_ID);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  async function updateEstado(personID: any): Promise<void> {
    setLoading(true);
    let statement = `UPDATE {0} SET
            ESTADO=1
            WHERE ID = ${personID}`;
    return await database
      .executeQuery('FNCPERSON', statement)
      .then((results) => {
        getNucleos(personID);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  async function getNucleos(personID: any): Promise<void> {
    setLoading(true);
    let statement = `SELECT * FROM {0} 
    INNER JOIN FNBNUCVIV_FNCPERSON ON FNBNUCVIV_FNCPERSON.FNBNUCVIV_ID = FNBNUCVIV.ID 
    WHERE FNBNUCVIV_FNCPERSON.FNCPERSON_ID = ${personID}`;
    return await database
      .executeQuery('FNBNUCVIV', statement)
      .then((results) => {
        const count = results.rows.length;
        const items = [];
        for (let i = 0; i < count; i++) {
          const row = results.rows.item(i);
          udpateNucleos(results.rows.item(i).ID);
          udpateViviendas(results.rows.item(i).FUBUBIVIV_ID);
        }
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

  async function udpateNucleos(ID: any): Promise<void> {

    let statement = `UPDATE {0} SET
    ESTADO=1
    WHERE ID = ${ID}`;
    return await database
    .executeQuery('FNBNUCVIV', statement)
    .then((results) => {
    })
    .finally(() => {
    setLoading(false);
    });

  }  


  async function countEntity(): Promise<void> {
    return database.countEntity('FNBINFSAL').then(setCount);
  }
  function deleteFNBINFSAL(itemToDelete: FNBINFSAL): Promise<void> {
    if (itemToDelete !== undefined) {
      return database
        .deleteItem('FNBINFSAL', 'ID', itemToDelete.ID)
        .then(getAllFNBINFSAL);
    }
    return Promise.reject(Error('Could not delete an undefined item'));
  }
  async function selectFNBINFSAL(list: FNBINFSAL) {
    setFNBINFSAL(list);
  }
  return {
    itemFNBINFSAL,
    listFNBINFSAL,
    countFNBINFSAL,
    loadingFNBINFSAL,
    getFNBINFSALbyID,
    createFNBINFSAL,
    deleteFNBINFSAL,
    selectFNBINFSAL,
    getAllFNBINFSAL,
    updateFNBINFSAL,
  };
}
