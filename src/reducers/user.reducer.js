//importer les actions
import {
    FETCH_USERS, FETCH_USER, /*DELETE_USER, EDIT_USER*/
} from '../actions/types';

export default (state = {}, action) => {
    switch (action.type){

        case FETCH_USERS:

            //in case of the data is an array of object, convert it to object with _id from mongoDb as unnique key
            const data = action.payload.data.reduce((obj, user) => (obj[user._id] = user, obj), {});

            console.log(data);
            return data;                        

        case FETCH_USER:
            console.log(action.payload.data);
            return { ...state, [action.payload.data._id]: action.payload.data };

        /*case EDIT_USER:
            console.log('edit image (reducer) !');*/

        /*case DELETE_USER:

            //return state without the deleted item

            //es6 vanilla equivalent of lodash _omit
            const newState = Object.keys(state)
                .filter((key) => [`${action.payload}`, '._id'].indexOf(key)<0)
                .reduce((newObj, key)=> Object.assign(newObj, {[key]: state[key]}),{})

            return newState;*/

        default:
            return state;

    }
}