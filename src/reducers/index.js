import { combineReducers } from 'redux';
import ItemReducer from './item.reducer';
import subitemReducer from './subitem.reducer';
import { reducer as formReducer} from 'redux-form';

export default combineReducers({
    items:ItemReducer,
    subitems:subitemReducer,
    form:formReducer
});