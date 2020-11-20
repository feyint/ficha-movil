import {useState, useEffect} from 'react';
import {useDatabase} from '../context/DatabaseContext';
import {SyncCatalogService} from '../services';
import {FNCTIPIDE} from '../types';

// Hook for managing and accessing (CRUD)
export function useFNCTIPIDE() {
  const [listFNCTIPIDE, setlist] = useState<FNCTIPIDE[]>([]);
  const [itemFNCTIPIDE, setFNCTIPIDE] = useState<FNCTIPIDE>();
  const [countFNCTIPIDE, setCount] = useState<number>(0);
  const [loadingFNCTIPIDE, setLoading] = useState<boolean>(false);
  const database = useDatabase();
  useEffect(() => {
    countEntity();
  }, []);
  function getAllFNCTIPIDE() {
    return database.getAllFromEntity('FNCTIPIDE').then(setlist);
  }
  async function createFNCTIPIDE(newItem: FNCTIPIDE): Promise<void> {
    let statement = `INSERT INTO {0} 
    (ID, CODIGO, NOMBRE, ESTADO) 
    VALUES (?, ?, ?, ?);`;
    let params = [newItem.ID, newItem.CODIGO, newItem.NOMBRE, newItem.ESTADO];
    return await database.executeQuery('FNCTIPIDE', statement, params);
  }
  async function countEntity(): Promise<void> {
    return database.countEntity('FNCTIPIDE').then(setCount);
  }
  function deleteFNCTIPIDE(itemToDelete: FNCTIPIDE): Promise<void> {
    if (itemToDelete !== undefined) {
      return database
        .deleteItem('FNCTIPIDE', 'ID', itemToDelete.ID)
        .then(getAllFNCTIPIDE);
    }
    // otherwise:
    return Promise.reject(Error('Could not delete an undefined item'));
  }
  async function selectFNCTIPIDE(list: FNCTIPIDE) {
    setFNCTIPIDE(list);
  }
  async function syncFNCTIPIDE() {
    setLoading(true);
    let service = new SyncCatalogService();
    let result = await service.getEntity('FNCTIPIDE');
    result.data.map(async (item: any) => {
      await createFNCTIPIDE({
        ID: item.id,
        CODIGO: item.codigo,
        NOMBRE: item.nombre,
        ESTADO: item.estado,
      });
    });
    setLoading(false);
    countEntity();
  }
  return {
    itemFNCTIPIDE,
    listFNCTIPIDE,
    countFNCTIPIDE,
    loadingFNCTIPIDE,
    createFNCTIPIDE,
    deleteFNCTIPIDE,
    selectFNCTIPIDE,
    syncFNCTIPIDE,
    getAllFNCTIPIDE,
  };
}