import {useState, useEffect} from 'react';
import {useDatabase} from '../context/DatabaseContext';
import {SyncCatalogService} from '../services';
import {FUCTIPTER_FUCRESGUA} from '../types';

export function useFUCTIPTER_FUCRESGUA() {
  const [listFUCTIPTER_FUCRESGUA, setItem] = useState<FUCTIPTER_FUCRESGUA[]>(
    [],
  );
  const [itemFUCTIPTER_FUCRESGUA, setFUCTIPTER_FUCRESGUA] = useState<
    FUCTIPTER_FUCRESGUA
  >();
  const [countFUCTIPTER_FUCRESGUA, setCount] = useState<number>(0);
  const [loadingFUCTIPTER_FUCRESGUA, setLoading] = useState<boolean>(false);
  const database = useDatabase();
  useEffect(() => {
    countEntity();
    // createFUCTIPTER_FUCRESGUA({
    //   ID: 1,
    //   FUCRESGUA_ID: 1925,
    //   FUCTIPTER_ID: 2,
    // });
    // createFUCTIPTER_FUCRESGUA({
    //   ID: 2,
    //   FUCRESGUA_ID: 1926,
    //   FUCTIPTER_ID: 2,
    // });
    // createFUCTIPTER_FUCRESGUA({
    //   ID: 3,
    //   FUCRESGUA_ID: 1927,
    //   FUCTIPTER_ID: 2,
    // });
  }, []);
  function getAllFUCTIPTER_FUCRESGUA() {
    return database.getAllFromEntity('FUCTIPTER_FUCRESGUA').then(setItem);
  }
  async function createFUCTIPTER_FUCRESGUA(
    newItem: FUCTIPTER_FUCRESGUA,
  ): Promise<void> {
    let statement = `INSERT INTO {0} 
    (ID, FUCRESGUA_ID, FUCTIPTER_ID) 
    VALUES (?, ?, ?);`;
    let params = [newItem.ID, newItem.FUCRESGUA_ID, newItem.FUCTIPTER_ID];
    return await database.executeQuery(
      'FUCTIPTER_FUCRESGUA',
      statement,
      params,
    );
  }
  async function countEntity(): Promise<void> {
    return database.countEntity('FUCTIPTER_FUCRESGUA').then(setCount);
  }
  async function bulkFUCTIPTER_FUCRESGUA(
    newItems: Array<FUCTIPTER_FUCRESGUA>,
  ): Promise<void> {
    let statementValues = '(?, ?, ?),'.repeat(newItems.length);
    statementValues = statementValues.substr(0, statementValues.length - 1);
    let statement = `INSERT INTO {0} 
    (ID, FUCRESGUA_ID, FUCTIPTER_ID)
    VALUES ${statementValues}; `;
    let params: any[] = [];
    newItems.forEach((newItem) => {
      params.push(newItem.ID);
      params.push(newItem.FUCRESGUA_ID);
      params.push(newItem.FUCTIPTER_ID);
    });
    return await database.executeQuery(
      'FUCTIPTER_FUCRESGUA',
      statement,
      params,
    );
  }

  async function syncFUCTIPTER_FUCRESGUA() {
    setLoading(true);
    await database.clearEntity('FUCTIPTER_FUCRESGUA');
    let service = new SyncCatalogService();
    let result = await service.getEntity('FuctipterFucresgua');
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    let items: Array<FUCTIPTER_FUCRESGUA> = [];
    for (let i = 0; i < result.data.length; i++) {
      const item = result.data[i];
      items.push({
        ID: item.fuctipterFucresguaPK.id,
        FUCRESGUA_ID: item.fuctipterFucresguaPK.fucresguaId,
        FUCTIPTER_ID: item.fuctipterFucresguaPK.fuctipterId,
      });
      if (items.length > 100) {
        await bulkFUCTIPTER_FUCRESGUA(items);
        items = [];
      }
    }
    if (items.length > 0) {
      await bulkFUCTIPTER_FUCRESGUA(items);
    }
    setLoading(false);
    countEntity();
  }
  return {
    itemFUCTIPTER_FUCRESGUA,
    listFUCTIPTER_FUCRESGUA,
    countFUCTIPTER_FUCRESGUA,
    loadingFUCTIPTER_FUCRESGUA,
    createFUCTIPTER_FUCRESGUA,
    syncFUCTIPTER_FUCRESGUA,
    getAllFUCTIPTER_FUCRESGUA,
  };
}
