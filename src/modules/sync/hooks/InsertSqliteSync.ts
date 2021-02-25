import {useState, useEffect} from 'react';
import {useDatabase} from '../../../context/DatabaseContext';
import { LoginForm } from '../../auth/components';

export function InsertSqliteSYNC() {
  const database = useDatabase();
  useEffect(() => {}, []);
    async function insertFnbnucvivFvcconviv() {

      let statement1 = `INSERT INTO "FNCSALREP_FNCCONREP" VALUES (1, 1, 1, 1);`;     
      console.log(55555);
      return database
      .executeQuery('FNCSALREP_FNCCONREP', statement1)
      .then(async (results) => {
        return results;
      })
      .finally(() => {
      });
  }
  return {
    insertFnbnucvivFvcconviv,
  };
}
