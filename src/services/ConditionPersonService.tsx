import {
  FNCELEPERSCHEMA,
  FNCCONPERSCHEMA,
  schemaVersion,
  FNCPERSONSCHEMA,
  FNCPERSON_FNCCONPERSCHEMA,
  DataBaseSchemas,
} from '../providers/DataBaseProvider';
import Realm from 'realm';
import {
  ConditionPersonQuestion,
  ConditionPersonQuestionOption,
} from '../modules/person/manage/state/types';
import {SelectSchema, MultiSelectSchema} from '../core/utils/types';
import {capitalizeFirstLetter} from '../core/utils/utils';
import {FNCPERSON_FNCCONPER} from '../state/person/types';

export default class ConditionPersonService {
  /**
   *
   */
  async getPersons() {
    const result = await Realm.open({
      schema: [FNCPERSONSCHEMA],
      schemaVersion: schemaVersion,
    })
      .then((realm) => {
        let items = realm.objects('FNCPERSON');
        console.log('persona items', items);
        for (let i of items) {
          console.log('persona items for', i);
        }
        return items;
      })
      .catch((error) => {
        return error;
      });
    return result;
  }

  /**
   *
   * @param questionsQuery
   */
  async getQuestionWithOptions(questionsQuery?: any[]) {
    let questionItems: ConditionPersonQuestion[] = [];
    const result = await Realm.open({
      schema: [FNCELEPERSCHEMA],
      schemaVersion: schemaVersion,
    })
      .then((realm) => {
        let servicios;
        if (questionsQuery) {
          const query = questionsQuery
            .map((id) => `CODIGO = "${id}"`)
            .join(' OR ');
          servicios = realm.objects('FNCELEPER').filtered(`${query}`);
        } else {
          servicios = realm.objects('FNCELEPER');
        }
        return servicios;
      })
      .catch((error) => {
        return error;
      });
    for (let i = 0; i < result.length; i++) {
      let questionItem: ConditionPersonQuestion = {
        ID: result[i].ID,
        CODIGO: result[i].CODIGO,
        NOMBRE: result[i].NOMBRE,
        ESTADO: result[i].ESTADO,
        OPTIONS: [],
      };
      let options = await this.getQuestionOptions(result[i].ID);
      for (let question of options) {
        questionItem.OPTIONS.push(question as ConditionPersonQuestionOption);
      }
      questionItems.push(questionItem);
    }
    return questionItems;
  }

  /**
   *
   * @param QuestionID
   */
  async getQuestionOptions(QuestionID: number) {
    const result = await Realm.open({
      schema: [FNCCONPERSCHEMA],
      schemaVersion: schemaVersion,
    })
      .then((realm) => {
        let items = realm
          .objects('FNCCONPER')
          .filtered(`FNCELEPER_ID = ${QuestionID}`);
        return items;
      })
      .catch((error) => {
        return error;
      });
    return result;
  }

  /**
   *
   * @param code
   * @param questions
   */
  getItemsForQuestionSelect(
    code: string,
    questions: ConditionPersonQuestion[],
  ) {
    let item: SelectSchema = {name: '', id: 0, children: []};
    for (let i = 0; i < questions.length; i++) {
      if (questions[i].CODIGO === code) {
        item.id = questions[i].ID;
        item.name = capitalizeFirstLetter(questions[i].NOMBRE);
        for (let option of questions[i].OPTIONS) {
          item.children.push({
            value: option.ID.toString(),
            label: option.NOMBRE,
          });
        }
        item.children.unshift({value: '-1', label: 'Seleccione'});
      }
    }
    return item;
  }

  /**
   *
   * @param code
   * @param questions
   */
  getItemsForQuestionMultiSelect(code: string, questions: ConditionPersonQuestion[]) {
    let item: MultiSelectSchema = { name: '', id: 0, children: [] };
    for (let i = 0; i < questions.length; i++) {
      if (questions[i].CODIGO === code) {
        item.id = questions[i].ID;
        item.name = capitalizeFirstLetter(questions[i].NOMBRE);
        for (let option of questions[i].OPTIONS) {
          item.children.push({ id: option.ID, name: option.NOMBRE });
        }
      }
    }
    return item;
  }

  /**
   *
   * @param code
   * @param questions
   */
  getQuestionlabel(code: string, questions: ConditionPersonQuestion[]) {
    for (let i = 0; i < questions.length; i++) {
      if (questions[i].CODIGO === code) {
        return capitalizeFirstLetter(questions[i].NOMBRE);
      }
    }
  }

  /**
   *
   * @param answeroption
   */
  async saveQuestionOption(answeroption: FNCPERSON_FNCCONPER[]) {
    //TODO consultar si ya existe
    await Realm.open({
      schema: [FNCPERSON_FNCCONPERSCHEMA],
      schemaVersion: schemaVersion,
    })
      .then((realm) => {
        let options = realm
          .objects(DataBaseSchemas.FNCPERSON_FNCCONPERSCHEMA)
          .filtered(
            `FNCPERSON_ID = ${answeroption[0].FNCPERSON_ID} AND FNCELEPER_ID = ${answeroption[0].FNCELEPER_ID}`,
          );
        console.log('registros ya en base de datos', options.length);
        realm.write(() => {
          realm.delete(options);
          for (let i = 0; i < answeroption.length; i++) {
            console.log('option ', answeroption[i]);
            realm.create(DataBaseSchemas.FNCPERSON_FNCCONPERSCHEMA, {
              FNCCONPER_ID: answeroption[i].FNCCONPER_ID,
              FNCPERSON_ID: answeroption[i].FNCPERSON_ID,
              FNCELEPER_ID: answeroption[i].FNCELEPER_ID,
              SYNCSTATE: answeroption[i].SYNCSTATE,
            });
          }
        });
      })
      .catch((error) => {
        console.log(error);
        return error;
      });
  }

  /**
   *
   * @param FNCPERSON_ID
   * @param FNCELEPER_ID
   */
  async getAnswerOneOption(FNCPERSON_ID: any, FNCELEPER_ID: any) {
    const result = await Realm.open({
      schema: [FNCPERSON_FNCCONPERSCHEMA],
      schemaVersion: schemaVersion,
    })
      .then((realm) => {
        console.log(
          `FNCPERSON_ID = ${FNCPERSON_ID} AND FNCELEPER_ID = ${FNCELEPER_ID}`,
        );
        let items = realm
          .objects(DataBaseSchemas.FNCPERSON_FNCCONPERSCHEMA)
          .filtered(
            `FNCPERSON_ID = ${FNCPERSON_ID} AND FNCELEPER_ID = ${FNCELEPER_ID}`,
          );
        console.warn('items getAnswerOneOption ', items.length);
        if (items.length > 0) {
          return items[0].FNCCONPER_ID;
        } else {
          return '';
        }
      })
      .catch((error) => {
        return error;
      });
    return result;
  }

  /**
   *
   * @param FNCPERSON_ID
   * @param FNCELEPER_ID
   */
  async deleteAnswerForQuestion(FNCPERSON_ID: number, FNCELEPER_ID: number) {
    //TODO consultar si ya existe
    await Realm.open({
      schema: [FNCPERSON_FNCCONPERSCHEMA],
      schemaVersion: schemaVersion,
    })
      .then((realm) => {
        let options = realm
          .objects(DataBaseSchemas.FNCPERSON_FNCCONPERSCHEMA)
          .filtered(
            `FNCPERSON_ID = ${FNCPERSON_ID} AND FNCELEPER_ID = ${FNCELEPER_ID}`,
          );
        console.log('borrar ', options.length);
        realm.write(() => {
          realm.delete(options);
        });
      })
      .catch((error) => {
        console.log(error);
        return error;
      });
  }

  /**
   *
   * @param FNCPERSON_ID
   * @param FNCELEPER_ID
   */
  async getAnswerMultiSelect(FNCPERSON_ID: any, FNCELEPER_ID: any) {
    const result = await Realm.open({
      schema: [FNCPERSON_FNCCONPERSCHEMA],
      schemaVersion: schemaVersion,
    })
      .then((realm) => {
        console.log(
          `FNCPERSON_ID = ${FNCPERSON_ID} AND FNCELEPER_ID = ${FNCELEPER_ID}`);
        let items = realm
          .objects(DataBaseSchemas.FNCPERSON_FNCCONPERSCHEMA)
          .filtered(
            `FNCPERSON_ID = ${FNCPERSON_ID} AND FNCELEPER_ID = ${FNCELEPER_ID}`,
          );
        console.warn('items getAnswerMultiSelect ', items.length);
        return items.map((item: any) => {
          return item.FNCCONPER_ID;
        });
      })
      .catch((error) => {
        return error;
      });
    return result;
  }
}