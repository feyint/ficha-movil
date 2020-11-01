import {HousingService, UtilsService} from '../../../services';
import {PickerType} from '../../../core/utils/types';

export const ActionType = {
  CATALOGS_HOUSE: 'CATALOGS_HOUSE',
  SET_CATALOGS: 'SET_CATALOGS',
  SET_DEPTS: 'SET_DEPTS',
};
export const getEntitySelect = (
  entity: string,
  schema: any,
  _columnFilter = null,
  _value = null,
  _columnFilter2 = null,
  _value2 = null,
) => {
  return async (_dispatch: any) => {
    let item: PickerType[] = [];
    let utils: UtilsService = new UtilsService();
    let items = await utils.getFilterEntity(
      entity,
      schema,
      _columnFilter,
      _value,
      _columnFilter2,
      _value2,
    );
    for (let option of items) {
      item.push({
        value: option.ID.toString(),
        label: option.NOMBRE,
        item: option,
      });
    }
    item.unshift({value: '-1', label: 'Seleccione', item: null});
    return item;
  };
};
export const getLasHouseCode = (code) => {
  return async (_dispatch: any) => {
    let houseServie: HousingService = new HousingService();
    let codeIncrement = await houseServie.getLasHouseCode(code);
    return codeIncrement;
  };
};
