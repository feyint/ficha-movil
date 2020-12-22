import {useState, useEffect} from 'react';
import {useDatabase} from '../context/DatabaseContext';
import {FUBUBIVIV, FUBUBIVIVDETAILS} from '../types';
const HOUSECODE_INCREMENT = '0000';
export function useFUBUBIVIV() {
  const [listFUBUBIVIV, setItem] = useState<FUBUBIVIV[]>([]);
  const [itemFUBUBIVIV, setFUBUBIVIV] = useState<FUBUBIVIV>();
  const [itemFUBUBIVIVDETAILS, setFUBUBIVIVDETAILS] = useState<
    FUBUBIVIVDETAILS
  >();
  const [countFUBUBIVIV, setCount] = useState<number>(0);
  const [loadingFUBUBIVIV, setLoading] = useState<boolean>(false);
  const database = useDatabase();
  useEffect(() => {
    countEntity();
  }, []);
  function getAllFUBUBIVIV() {
    return database.getAllFromEntity('FUBUBIVIV').then(setItem);
  }
  function clearAllFUBUBIVIV() {
    return database.executeQuery('FUBUBIVIV', 'delete from {0}');
  }
  async function getLastCode(FUBUBIVIVCODE: string) {
    let NEWCODIGO = '';
    let statement = ` SELECT * FROM FUBUBIVIV 
    WHERE CODIGO LIKE '%${FUBUBIVIVCODE}%' ORDER BY ID DESC LIMIT 1;`;
    await database.executeQuery('FNBNUCVIV', statement).then((results) => {
      const count = results.rows.length;
      if (count === 0) {
        NEWCODIGO = FUBUBIVIVCODE + '-' + incrementNumber('0');
      }
      for (let i = 0; i < count; i++) {
        const row = results.rows.item(i);
        const {CODIGO} = row;
        let values = CODIGO.split('-');
        let increment = incrementNumber(values[1]);
        NEWCODIGO = FUBUBIVIVCODE + '-' + increment;
      }
    });
    return NEWCODIGO;
  }
  function incrementNumber(numberstring) {
    let number = parseInt(numberstring, 10) + 1;
    let initial = HOUSECODE_INCREMENT.substring(
      0,
      HOUSECODE_INCREMENT.length - number.toString().length,
    );
    let code = initial + number;
    return code;
  }

  function filterFUBUBIVIV(_fububiviv: number, single = false) {
    let statement = `
     SELECT FUBUBIVIV.* FROM {0} WHERE ID = ${_fububiviv}`;
    database.executeQuery('FUBUBIVIV', statement).then((results) => {
      const count = results.rows.length;
      const items: FUBUBIVIV[] = [];
      for (let i = 0; i < count; i++) {
        const row = results.rows.item(i);
        const {
          ID,
          CODIGO,
          COORDENADA_X,
          COORDENADA_Y,
          FVBENCUES_ID,
          FUCZONCUI_FUCBARVER_ID,
          DIRECCION,
        } = row;
        items.push({
          ID: ID,
          CODIGO: CODIGO,
          DIRECCION: DIRECCION,
          COORDENADA_X: COORDENADA_X,
          COORDENADA_Y: COORDENADA_Y,
          FVBENCUES_ID: FVBENCUES_ID,
          FUCZONCUI_FUCBARVER_ID: FUCZONCUI_FUCBARVER_ID,
        });
      }
      if (single) {
        setFUBUBIVIV(items[0]);
      } else {
        setItem(items);
      }
    });
  }
  function getFUBUBIVIVDETAILS(_fububiviv: number) {
    let statement = `
    SELECT ff.FUCBARVER_ID , ff.FUCZONCUI_ID,bv.FUCRESGUA_ID, tipregu.FUCTIPTER_ID, tipt.CODIGO as CODIGOTERRITORIO, re.FUCMUNICI_ID, mu.FUCDEPART_ID ,  f.*  FROM FUBUBIVIV f 
    LEFT JOIN FUCZONCUI_FUCBARVER ff  ON ff.ID = f.FUCZONCUI_FUCBARVER_ID 
    LEFT JOIN FUCZONCUI zc ON zc.ID = ff.FUCZONCUI_ID 
    LEFT JOIN FUCBARVER bv ON bv.ID  = ff.FUCBARVER_ID 
    LEFT JOIN FUCRESGUA re ON re.ID = bv.FUCRESGUA_ID 
    LEFT JOIN FUCMUNICI mu ON mu.ID  = re.FUCMUNICI_ID 
    LEFT JOIN FUCTIPTER_FUCRESGUA tipregu ON tipregu.FUCRESGUA_ID =  re.ID 
    LEFT JOIN FUCTIPTER tipt ON tipt.ID  = tipregu.FUCTIPTER_ID 
    LEFT JOIN FUCDEPART dep ON dep.ID = mu.FUCDEPART_ID 
    WHERE f.ID = ${_fububiviv};`;
    database.executeQuery('FUBUBIVIV', statement).then((results) => {
      const count = results.rows.length;
      const items: FUBUBIVIVDETAILS[] = [];
      for (let i = 0; i < count; i++) {
        const row = results.rows.item(i);
        const {
          ID,
          FUCBARVER_ID,
          FUCZONCUI_ID,
          FUCRESGUA_ID,
          FUCTIPTER_ID,
          FUCMUNICI_ID,
          FUCDEPART_ID,
          CODIGOTERRITORIO,
        } = row;
        items.push({
          ID,
          FUCBARVER_ID,
          FUCZONCUI_ID,
          FUCRESGUA_ID,
          FUCTIPTER_ID,
          FUCMUNICI_ID,
          FUCDEPART_ID,
          CODIGOTERRITORIO,
        });
      }
      setFUBUBIVIVDETAILS(items[0]);
    });
  }
  async function createFUBUBIVIV(newItem: FUBUBIVIV): Promise<void> {
    let statement = `INSERT INTO {0} 
    (CODIGO, DIRECCION, COORDENADA_X, COORDENADA_Y, FVBENCUES_ID, FUCZONCUI_FUCBARVER_ID) 
    VALUES (?, ?, ?, ?, ?, ?);`;
    let params = [
      newItem.CODIGO,
      newItem.DIRECCION,
      newItem.COORDENADA_X,
      newItem.COORDENADA_Y,
      newItem.FVBENCUES_ID, // TODO
      newItem.FUCZONCUI_FUCBARVER_ID,
    ];
    return database
      .executeQuery('FUBUBIVIV', statement, params)
      .then((results) => {
        const {insertId} = results;
        filterFUBUBIVIV(insertId, true);
      });
  }
  async function updateFUBUBIVIV(item: FUBUBIVIV): Promise<void> {
    setLoading(true);
    let statement = `UPDATE {0}  SET
      CODIGO = ?, 
      COORDENADA_X= ?, 
      COORDENADA_Y= ?, 
      DIRECCION= ?, 
      FUCZONCUI_FUCBARVER_ID= ?
    WHERE ID = ${item.ID}`;
    let params = [
      item.CODIGO,
      item.COORDENADA_X,
      item.COORDENADA_Y,
      item.DIRECCION,
      item.FUCZONCUI_FUCBARVER_ID,
    ];
    return await database
      .executeQuery('FUBUBIVIV', statement, params)
      .then((results) => {
        filterFUBUBIVIV(item.ID, true);
      })
      .finally(() => {
        setLoading(false);
      });
  }
  async function countEntity(): Promise<void> {
    return database.countEntity('FUBUBIVIV').then(setCount);
  }
  function deleteFUBUBIVIV(itemToDelete: FUBUBIVIV): Promise<void> {
    if (itemToDelete !== undefined) {
      return database
        .deleteItem('FUBUBIVIV', 'ID', itemToDelete.ID)
        .then(getAllFUBUBIVIV);
    }
    return Promise.reject(Error('Could not delete an undefined item'));
  }
  async function selectFUBUBIVIV(list: FUBUBIVIV) {
    setFUBUBIVIV(list);
  }
  return {
    itemFUBUBIVIVDETAILS,
    itemFUBUBIVIV,
    listFUBUBIVIV,
    countFUBUBIVIV,
    loadingFUBUBIVIV,
    getLastCode,
    getFUBUBIVIVDETAILS,
    createFUBUBIVIV,
    updateFUBUBIVIV,
    deleteFUBUBIVIV,
    selectFUBUBIVIV,
    getAllFUBUBIVIV,
    filterFUBUBIVIV,
  };
}
