//importer les actions
import {
    FETCH_ITEMS, FETCH_ITEM, DELETE_ITEM, EDIT_ITEM
} from '../actions/types';

export default (state = {}, action) => {
    switch (action.type){

        case FETCH_ITEMS:

            //in case of the data is an array of object, convert it to object with _id from mongoDb as unnique key
            const data = action.payload.data.reduce((obj, item) => (obj[item._id] = item, obj), {});

            console.log(data);
            return data;                        

        case FETCH_ITEM:
            console.log(action.payload.data);
            return { ...state, [action.payload.data._id]: action.payload.data };

        case EDIT_ITEM:
            console.log('edit item (reducer) !');

        case DELETE_ITEM:

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