import { combineReducers } from 'redux';
import ItemReducer from './item.reducer';
import { reducer as formReducer} from 'redux-form';

export default combineReducers({
    items:ItemReducer,
    form:formReducer
});