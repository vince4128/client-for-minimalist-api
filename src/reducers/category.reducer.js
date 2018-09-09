//importer les actions
import {
    FETCH_CATEGORIES,
    FETCH_CATEGORY,
    DELETE_CATEGORY,
    EDIT_CATEGORY
} from '../actions/types';

export default (state = {}, action) => {
    switch (action.type){

        case FETCH_CATEGORIES:

            //in case of the data is an array of object, convert it to object with _id from mongoDb as unnique key
            const data = action.payload.data.reduce((obj, image) => (obj[image._id] = image, obj), {});

            console.log(data);
            return data;                        

        case FETCH_CATEGORY:
            console.log(action.payload.data);
            return { ...state, [action.payload.data._id]: action.payload.data };

        case EDIT_CATEGORY:
            console.log('edit category (reducer) !');

        case DELETE_CATEGORY:

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