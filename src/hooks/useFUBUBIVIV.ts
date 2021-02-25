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
  const [itemsFilter, setItemsFilter] = useState<any>([]);
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

  async function filterFUBUBIVIV(_fububiviv: number, single = false) {
    let statement = `
     SELECT * FROM {0} WHERE ID = ${_fububiviv}`;
    return await database
      .executeQuery('FUBUBIVIV', statement)
      .then((results) => {
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
          return items[0];
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
      const items: any[] = [];
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
  function search(query: string, person = false) {
    let statement = `
    SELECT 
    p.PRIMER_NOMBRE, p.SEGUNDO_NOMBRE , p.PRIMER_APELLIDO , p.SEGUNDO_APELLIDO,
    viv.DIRECCION , barver.NOMBRE as BARRIO_VEREDA, zoncui.NOMBRE as ZONA_CUIDADO, viv.*
    FROM FNCPERSON p
    LEFT JOIN FNBNUCVIV_FNCPERSON nvp on nvp.FNCPERSON_ID = p.ID 
    LEFT JOIN FNBNUCVIV nucviv on nucviv.ID = nvp.FNBNUCVIV_ID 
    LEFT JOIN FUBUBIVIV viv on viv.ID  = nucviv.FUBUBIVIV_ID 
    LEFT JOIN FUCZONCUI_FUCBARVER fbar on fbar.ID = viv.FUCZONCUI_FUCBARVER_ID 
    LEFT JOIN  FUCBARVER barver on barver.ID  = fbar.FUCBARVER_ID  
    LEFT JOIN FUCZONCUI zoncui on zoncui.ID = fbar.FUCZONCUI_ID 
    where p.IDENTIFICACION  LIKE '%${query}%';`;
    if (!person) {
      statement = `
      SELECT bv.NOMBRE as barver, dep.NOMBRE as Dept, mu.NOMBRE as Muni , tipt.CODIGO as CODIGOTERRITORIO, f.*  FROM FUBUBIVIV f 
      LEFT JOIN FUCZONCUI_FUCBARVER ff  ON ff.ID = f.FUCZONCUI_FUCBARVER_ID 
      LEFT JOIN FUCZONCUI zc ON zc.ID = ff.FUCZONCUI_ID 	
      LEFT JOIN FUCBARVER bv ON bv.ID  = ff.FUCBARVER_ID 
      LEFT JOIN FUCRESGUA re ON re.ID = bv.FUCRESGUA_ID 
      LEFT JOIN FUCMUNICI mu ON mu.ID  = re.FUCMUNICI_ID 
      LEFT JOIN FUCTIPTER_FUCRESGUA tipregu ON tipregu.FUCRESGUA_ID =  re.ID 
      LEFT JOIN FUCTIPTER tipt ON tipt.ID  = tipregu.FUCTIPTER_ID 
      LEFT JOIN FUCDEPART dep ON dep.ID = mu.FUCDEPART_ID 
      WHERE f.DIRECCION LIKE '%${query}%' 
      OR bv.NOMBRE  like '%${query}%' or f.CODIGO like '%${query}%' 
      or dep.NOMBRE like '%${query}%' or mu.NOMBRE  like '%${query}%'
      `;
    }
    database.executeQuery('', statement).then((results) => {
      const count = results.rows.length;
      const items: any[] = [];
      for (let i = 0; i < count; i++) {
        const row = results.rows.item(i);
        if (!person) {
          const {
            ID,
            CODIGO,
            DIRECCION,
            COORDENADA_X,
            COORDENADA_Y,
            FVBENCUES_ID,
            FUCZONCUI_FUCBARVER_ID,
            FECHA_ACTIVIDAD,
            FECHA_CREACION,
            ORIGEN_DATA,
            USUARIO_DATA,
            PRIMER_NOMBRE,
            SEGUNDO_NOMBRE,
            PRIMER_APELLIDO,
            SEGUNDO_APELLIDO,
            BARRIO_VEREDA,
            ZONA_CUIDADO,
          } = row;
          items.push({
            ID,
            CODIGO,
            DIRECCION,
            COORDENADA_X,
            COORDENADA_Y,
            FVBENCUES_ID,
            FUCZONCUI_FUCBARVER_ID,
            FECHA_ACTIVIDAD,
            FECHA_CREACION,
            ORIGEN_DATA,
            USUARIO_DATA,
            PRIMER_NOMBRE,
            SEGUNDO_NOMBRE,
            PRIMER_APELLIDO,
            SEGUNDO_APELLIDO,
            BARRIO_VEREDA,
            ZONA_CUIDADO,
          });
        } else {
          const {
            barver,
            Dept,
            Muni,
            CODIGOTERRITORIO,
            ID,
            CODIGO,
            DIRECCION,
            COORDENADA_X,
            COORDENADA_Y,
            FVBENCUES_ID,
            FUCZONCUI_FUCBARVER_ID,
            FECHA_ACTIVIDAD,
            FECHA_CREACION,
            ORIGEN_DATA,
            USUARIO_DATA,
            PRIMER_NOMBRE,
            SEGUNDO_NOMBRE,
            PRIMER_APELLIDO,
            SEGUNDO_APELLIDO,
            BARRIO_VEREDA,
            ZONA_CUIDADO,
          } = row;
          items.push({
            barver,
            Dept,
            Muni,
            CODIGOTERRITORIO,
            ID,
            CODIGO,
            DIRECCION,
            COORDENADA_X,
            COORDENADA_Y,
            FVBENCUES_ID,
            FUCZONCUI_FUCBARVER_ID,
            FECHA_ACTIVIDAD,
            FECHA_CREACION,
            ORIGEN_DATA,
            USUARIO_DATA,
            PRIMER_NOMBRE,
            SEGUNDO_NOMBRE,
            PRIMER_APELLIDO,
            SEGUNDO_APELLIDO,
            BARRIO_VEREDA,
            ZONA_CUIDADO,
          });
        }
      }
      setItemsFilter(items);
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
      FUCZONCUI_FUCBARVER_ID= ?,
      ESTADO=1
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
    itemsFilter,
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
    search,
  };
}
