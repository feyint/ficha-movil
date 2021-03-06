import {QuestionFamilyCodes} from './HousingTypes';
import {MultiSelectSchema, PickerType} from './types';

export function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

export function propNameQuestion(value: any): any {
  let prop: any = QuestionFamilyCodes;
  let propNameValue = '';
  for (var i in prop) {
    if (typeof prop[i] === 'object') {
      let propNameV = propNameQuestion(value);
      if (propNameV) {
        return propNameValue;
      }
    } else {
      if (prop[i] == value) {
        propNameValue = i;
        return propNameValue;
      }
    }
  }
  return undefined;
}

export function cloneResult(item: any, single = false) {
  if (item.length > 0 && !single) {
    let resultItems = [];
    for (let i of item) {
      let clone: any = {};
      for (const key in i) {
        clone[key] = i[key];
      }
      resultItems.push(clone);
    }
    return resultItems;
  } else if (single && item) {
    let clone: any = {};
    for (const key in item) {
      clone[key] = item[key];
    }
    return clone;
  }
  return !single ? [] : null;
}
export function getSelectSchema(items: any[], defaultValue = true) {
  let item: PickerType[] = [];
  for (let option of items) {
    item.push({
      value: option.ID.toString(),
      label: option.NOMBRE || option.CODIGO,
      item: option,
    });
  }
  if (defaultValue) {
    item.unshift({value: '-1', label: 'Seleccione', item: null});
  }
  return item;
}
export function getMSelectSchema(code: string, items: any[]) {
  let item: MultiSelectSchema = {name: '', id: 0, children: []};
  item.id = 1;
  for (let i = 0; i < items.length; i++) {
    item.children.push({
      id: items[i].ID,
      name: items[i].NOMBRE,
      item: items[i],
    });
  }
  return item;
}

export function chunkArrayInGroups(arr: any[], size: number = 100) {
  var myArray = [];
  for (var i = 0; i < arr.length; i += size) {
    myArray.push(arr.slice(i, i + size));
  }
  return myArray;
}
