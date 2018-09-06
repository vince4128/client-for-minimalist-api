//importer les actions
import {
    FETCH_SUBITEMS,
    FETCH_SUBITEM_BY_ID,
    DELETE_SUBITEM
} from '../actions/types';

export default (state = {}, action) => {
    switch (action.type){

        case FETCH_SUBITEMS:

            alert('fetch subitems');

            //in case of the data is an array of object, convert it to object with _id from mongoDb as unnique key
            const data = action.payload.data.reduce((obj, item) => (obj[item._id] = item, obj), {});

            console.log(data);
            return data;                        

        case FETCH_SUBITEM_BY_ID:
            console.log(action.payload.data);
            return { ...state, [action.payload.data._id]: action.payload.data };

        case DELETE_SUBITEM:

            //return state without the deleted item

            //es6 vanilla equivalent of lodash _omit
            const newState = Object.keys(state)
                .filter((key) => [`${action.payload}`, '._id'].indexOf(key)<0)
                .reduce((newObj, key)=> Object.assign(newObj, {[key]: state[key]}),{})

            return newState;

        default:
            return state;

    }
}