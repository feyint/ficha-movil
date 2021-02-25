import {useState, useEffect} from 'react';
import {useFNBINFSAL, useFNBNUCVIV_FNCPERSON} from '.';
import {useDatabase} from '../context/DatabaseContext';
import {FNCPERSON, FUBUBIVIVDETAILS, FNBINFSAL, FNCSALREP} from '../types';
import { useFNCSALREP } from './useFNCSALREP';

export function useFNCPERSON() {
  const [listFNCPERSON, setItem] = useState<FNCPERSON[]>([]);
  const [itemFNCPERSON, setFNCPERSON] = useState<FNCPERSON>();
  const [itemFUBUBIVIVDETAILS, setFUBUBIVIVDETAILS] = useState<
    FUBUBIVIVDETAILS
  >();
  const [countFNCPERSON, setCount] = useState<number>(0);
  const [loadingFNCPERSON, setLoading] = useState<boolean>(false);
  const {
    itemFNBNUCVIV_FNCPERSON,
    createFNBNUCVIV_FNCPERSON,
  } = useFNBNUCVIV_FNCPERSON();
  const {createFNBINFSAL} = useFNBINFSAL();
  const {createFNCSALREP} = useFNCSALREP();
  const database = useDatabase();
  useEffect(() => {}, []);
  function getAllFNCPERSON() {
    return database.getAllFromEntity('FNCPERSON').then(setItem);
  }
  function clearAllFNCPERSON() {
    return database.executeQuery('FNCPERSON', 'delete from {0}');
  }
  function filterFNCPERSON(FNBNUCVIV: number, single = false) {
    let statement = `
        SELECT p.* FROM FNCPERSON p
        INNER JOIN FNBNUCVIV_FNCPERSON nf ON nf.FNCPERSON_ID  = p.ID 
        WHERE nf.FNBNUCVIV_ID  = ${FNBNUCVIV}`;
    database.executeQuery('FNCPERSON', statement).then((results) => {
      const count = results.rows.length;
      const items: FNCPERSON[] = [];
      for (let i = 0; i < count; i++) {
        const row = results.rows.item(i);
        const {
          ID,
          CODIGO,
          IDENTIFICACION,
          PRIMER_NOMBRE,
          SEGUNDO_NOMBRE,
          PRIMER_APELLIDO,
          SEGUNDO_APELLIDO,
          FECHA_NACIMIENTO,
          TEL_CELULAR,
          TEL_ALTERNO,
          CORREO_ELECTRONICO,
          FNCTIPIDE_ID,
          FNCORGANI_ID,
          FNCLUNIND_ID,
          FNCOCUPAC_ID,
          FUCMUNICI_ID,
          FNCPAREN_ID,
          FNCGENERO_ID,
          FNCPUEIND_ID,
          FVBENCUES_ID,
        } = row;
        items.push({
          ID: ID,
          CODIGO: CODIGO,
          IDENTIFICACION: IDENTIFICACION,
          PRIMER_NOMBRE: PRIMER_NOMBRE,
          SEGUNDO_NOMBRE: SEGUNDO_NOMBRE,
          PRIMER_APELLIDO: PRIMER_APELLIDO,
          SEGUNDO_APELLIDO: SEGUNDO_APELLIDO,
          FECHA_NACIMIENTO: FECHA_NACIMIENTO,
          TEL_CELULAR: TEL_CELULAR,
          TEL_ALTERNO: TEL_ALTERNO,
          CORREO_ELECTRONICO: CORREO_ELECTRONICO,
          FNCTIPIDE_ID: FNCTIPIDE_ID,
          FNCORGANI_ID: FNCORGANI_ID,
          FNCLUNIND_ID: FNCLUNIND_ID,
          FNCOCUPAC_ID: FNCOCUPAC_ID,
          FUCMUNICI_ID: FUCMUNICI_ID,
          FNCPAREN_ID: FNCPAREN_ID,
          FNCGENERO_ID: FNCGENERO_ID,
          FNCPUEIND_ID: FNCPUEIND_ID,
          FVBENCUES_ID: FVBENCUES_ID,
        });
      }
      if (single) {
        setFNCPERSON(items[0]);
      } else {
        setItem(items);
      }
    });
  }
  function getFNCPERSONbyID(FNCPERSONID: number) {
    let statement = `
     SELECT * FROM {0} WHERE ID = ${FNCPERSONID}`;
    return database.executeQuery('FNCPERSON', statement).then((results) => {
      const count = results.rows.length;
      const items: FNCPERSON[] = [];
      for (let i = 0; i < count; i++) {
        const row = results.rows.item(i);
        const {
          ID,
          CODIGO,
          IDENTIFICACION,
          PRIMER_NOMBRE,
          SEGUNDO_NOMBRE,
          PRIMER_APELLIDO,
          SEGUNDO_APELLIDO,
          FECHA_NACIMIENTO,
          TEL_CELULAR,
          TEL_ALTERNO,
          CORREO_ELECTRONICO,
          FNCTIPIDE_ID,
          FNCORGANI_ID,
          FNCLUNIND_ID,
          FNCOCUPAC_ID,
          FUCMUNICI_ID,
          FNCPAREN_ID,
          FNCGENERO_ID,
          FNCPUEIND_ID,
          FVBENCUES_ID,
        } = row;
        items.push({
          ID,
          CODIGO,
          IDENTIFICACION,
          PRIMER_NOMBRE,
          SEGUNDO_NOMBRE,
          PRIMER_APELLIDO,
          SEGUNDO_APELLIDO,
          FECHA_NACIMIENTO,
          TEL_CELULAR,
          TEL_ALTERNO,
          CORREO_ELECTRONICO,
          FNCTIPIDE_ID,
          FNCORGANI_ID,
          FNCLUNIND_ID,
          FNCOCUPAC_ID,
          FUCMUNICI_ID,
          FNCPAREN_ID,
          FNCGENERO_ID,
          FNCPUEIND_ID,
          FVBENCUES_ID,
        });
      }
      setFNCPERSON(items[0]);
      return items[0];
    });
  }
  function getByIdentification(
    identificationType: number,
    identification: string,
  ) {
    let statement = `
        SELECT  * FROM {0} WHERE IDENTIFICACION  = '${identification}' AND  FNCTIPIDE_ID = ${identificationType}`;
    return database.executeQuery('FNCPERSON', statement).then((results) => {
      const count = results.rows.length;
      const items: FNCPERSON[] = [];
      for (let i = 0; i < count; i++) {
        const row = results.rows.item(i);
        const {
          ID,
          CODIGO,
          IDENTIFICACION,
          PRIMER_NOMBRE,
          SEGUNDO_NOMBRE,
          PRIMER_APELLIDO,
          SEGUNDO_APELLIDO,
          FECHA_NACIMIENTO,
          TEL_CELULAR,
          TEL_ALTERNO,
          CORREO_ELECTRONICO,
          FNCTIPIDE_ID,
          FNCORGANI_ID,
          FNCLUNIND_ID,
          FNCOCUPAC_ID,
          FUCMUNICI_ID,
          FNCPAREN_ID,
          FNCGENERO_ID,
          FNCPUEIND_ID,
          FVBENCUES_ID,
        } = row;
        items.push({
          ID,
          CODIGO,
          IDENTIFICACION,
          PRIMER_NOMBRE,
          SEGUNDO_NOMBRE,
          PRIMER_APELLIDO,
          SEGUNDO_APELLIDO,
          FECHA_NACIMIENTO,
          TEL_CELULAR,
          TEL_ALTERNO,
          CORREO_ELECTRONICO,
          FNCTIPIDE_ID,
          FNCORGANI_ID,
          FNCLUNIND_ID,
          FNCOCUPAC_ID,
          FUCMUNICI_ID,
          FNCPAREN_ID,
          FNCGENERO_ID,
          FNCPUEIND_ID,
          FVBENCUES_ID,
        });
      }
      return items[0];
    });
  }
  async function createFNCPERSON(item: FNCPERSON, FNBNUCVIVID: number) {
    setLoading(true);
    let statement = `INSERT INTO {0} 
            (IDENTIFICACION, 
            PRIMER_NOMBRE, 
            SEGUNDO_NOMBRE, 
            PRIMER_APELLIDO, 
            SEGUNDO_APELLIDO, 
            FECHA_NACIMIENTO, 
            FNCTIPIDE_ID,
            FNCPAREN_ID, 
            FNCGENERO_ID,
            FNCPUEIND_ID,
            FVBENCUES_ID
            ) 
            VALUES ('${item.IDENTIFICACION}',
                '${item.PRIMER_NOMBRE}',
                '${item.SEGUNDO_NOMBRE}',
                '${item.PRIMER_APELLIDO}',
                '${item.SEGUNDO_APELLIDO}',
                '${item.FECHA_NACIMIENTO}',
                ${item.FNCTIPIDE_ID ? item.FNCTIPIDE_ID : null},
                ${item.FNCPAREN_ID ? item.FNCPAREN_ID : null},
                ${item.FNCGENERO_ID ? item.FNCGENERO_ID : null},
                ${item.FNCPUEIND_ID ? item.FNCPUEIND_ID : null},
                ${item.FVBENCUES_ID ? item.FVBENCUES_ID : null}
                );`;
    return database
      .executeQuery('FNCPERSON', statement)
      .then(async (results) => {
        const {insertId} = results;
        await createFNBNUCVIV_FNCPERSON({
          FNCPERSON_ID: insertId,
          FNBNUCVIV_ID: FNBNUCVIVID,
        });
        let fnbifsal: FNBINFSAL = {
          FNCPERSON_ID: insertId,
        };
        let fncsalrep: FNCSALREP = {
          FNCPERSON_ID: insertId,
        };
        await createFNBINFSAL(fnbifsal);
        await createFNCSALREP(fncsalrep);
        return await getFNCPERSONbyID(insertId);
      })
      .catch((err) => {})
      .finally(() => {
        setLoading(false);
      });
  }
  async function updateFNCPERSON(item: FNCPERSON): Promise<void> {
    setLoading(true);
    let statement = `UPDATE {0}  SET
            CODIGO='${item.CODIGO ? item.CODIGO : ''}', 
            IDENTIFICACION='${item.IDENTIFICACION ? item.IDENTIFICACION : ''}', 
            PRIMER_NOMBRE='${item.PRIMER_NOMBRE ? item.PRIMER_NOMBRE : ''}', 
            SEGUNDO_NOMBRE='${item.SEGUNDO_NOMBRE ? item.SEGUNDO_NOMBRE : ''}', 
            PRIMER_APELLIDO='${
              item.PRIMER_APELLIDO ? item.PRIMER_APELLIDO : ''
            }', 
            SEGUNDO_APELLIDO='${
              item.SEGUNDO_APELLIDO ? item.SEGUNDO_APELLIDO : ''
            }', 
            FECHA_NACIMIENTO='${
              item.FECHA_NACIMIENTO ? item.FECHA_NACIMIENTO : ''
            }', 
            TEL_CELULAR='${item.TEL_CELULAR ? item.TEL_CELULAR : ''}', 
            TEL_ALTERNO='${item.TEL_ALTERNO ? item.TEL_ALTERNO : ''}', 
            CORREO_ELECTRONICO='${
              item.CORREO_ELECTRONICO ? item.CORREO_ELECTRONICO : ''
            }',
            FNCTIPIDE_ID=${item.FNCTIPIDE_ID ? item.FNCTIPIDE_ID : null}, 
            FNCORGANI_ID=${item.FNCORGANI_ID ? item.FNCORGANI_ID : null}, 
            FNCLUNIND_ID=${item.FNCLUNIND_ID ? item.FNCLUNIND_ID : null}, 
            FNCOCUPAC_ID=${item.FNCOCUPAC_ID ? item.FNCOCUPAC_ID : null}, 
            FUCMUNICI_ID=${item.FUCMUNICI_ID ? item.FUCMUNICI_ID : null},
            FNCPAREN_ID=${item.FNCPAREN_ID ? item.FNCPAREN_ID : null}, 
            FNCGENERO_ID=${item.FNCGENERO_ID ? item.FNCGENERO_ID : null},
            FNCPUEIND_ID=${item.FNCPUEIND_ID ? item.FNCPUEIND_ID : null},
            FVBENCUES_ID=${item.FVBENCUES_ID ? item.FVBENCUES_ID : null},
            ESTADO=1
            WHERE ID = ${item.ID}`;
    return await database
      .executeQuery('FNCPERSON', statement)
      .then((results) => {
        getFNCPERSONbyID(item.ID);
        getNucleos(item.ID);
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
    return database.countEntity('FNCPERSON').then(setCount);
  }
  async function existbyIdentification(identification: string) {
    let statement = `
        SELECT COUNT(*) as total FROM {0}  WHERE
        IDENTIFICACION = '${identification}'`;
    return await database
      .executeQuery('FNCPERSON', statement)
      .then((results) => {
        const count = results.rows.length;
        for (let i = 0; i < count; i++) {
          const row = results.rows.item(i);
          const {total} = row;
          return total > 0;
        }
      });
  }
  function deleteFNCPERSON(itemToDelete: FNCPERSON): Promise<void> {
    if (itemToDelete !== undefined) {
      return database
        .deleteItem('FNCPERSON', 'ID', itemToDelete.ID)
        .then(getAllFNCPERSON);
    }
    return Promise.reject(Error('Could not delete an undefined item'));
  }
  async function selectFNCPERSON(list: FNCPERSON) {
    setFNCPERSON(list);
  }
  return {
    itemFUBUBIVIVDETAILS,
    itemFNCPERSON,
    listFNCPERSON,
    countFNCPERSON,
    loadingFNCPERSON,
    getFNCPERSONbyID,
    getByIdentification,
    existbyIdentification,
    createFNCPERSON,
    deleteFNCPERSON,
    selectFNCPERSON,
    getAllFNCPERSON,
    filterFNCPERSON,
    updateFNCPERSON,
  };
}
