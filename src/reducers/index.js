import { combineReducers } from 'redux';
import ItemReducer from './item.reducer';
import subitemReducer from './subitem.reducer';
import ImageReducer from './image.reducer';
import CategoryReducer from './category.reducer';
import AuthReducer from './auth.reducer';
import { reducer as formReducer} from 'redux-form';

export default combineReducers({
    auth:AuthReducer,
    items:ItemReducer,
    subitems:subitemReducer,
    images:ImageReducer,
    categories:CategoryReducer,
    form:formReducer
});