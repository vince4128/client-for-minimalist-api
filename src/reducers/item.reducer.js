//importer les actions
import {
    FETCH_ALL_ITEMS, FETCH_ITEM_BY_ID, DELETE_ITEM
} from '../actions/types';

export default (state = {}, action) => {
    switch (action.type){

        case FETCH_ALL_ITEMS:

            //in case of the data is an array of object, convert it to object with _id from mongoDb as unnique key
            const data = action.payload.data.reduce((obj, item) => (obj[item._id] = item, obj), {});

            console.log(data);
            return data;                        

        case FETCH_ITEM_BY_ID:
            console.log(action.payload.data);
            return { ...state, [action.payload.data._id]: action.payload.data };

        case DELETE_ITEM:

            //TODO return state without the deleted item
            console.log('action.payload ', action.payload)

            console.log(

                Object.keys(state).filter((item)=>{
                    return item._id !== action.payload
                })
            )
            return state;

        default:
            return state;

    }
}