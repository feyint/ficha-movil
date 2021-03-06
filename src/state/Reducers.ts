import {combineReducers} from 'redux';
import {SessionReducers} from '../modules/auth/state';
import {HousingReducers} from './house';
import {LocationReducers} from '../modules/location/state';
import {PersonReducers} from './person';
import {ConditionPersonReducers} from './ConditionPerson';
import {SexAndRepHealthPersonReducers} from './SexAndRepHealthPerson';
export default combineReducers({
  session: SessionReducers,
  location: LocationReducers,
  housing: HousingReducers,
  person: PersonReducers,
  conditionperson: ConditionPersonReducers,
  sarhealthperson: SexAndRepHealthPersonReducers,
});
