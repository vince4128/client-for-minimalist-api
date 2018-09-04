//importer les actions
import {
    FETCH_ALL_ITEMS, FETCH_ITEM_BY_ID
} from '../actions/types';

export default (state = [], action) => {
    switch (action.type){

        case FETCH_ALL_ITEMS:
            return action.payload.data;                        

        case FETCH_ITEM_BY_ID:
            console.log(action.payload.data);
            return [...state, action.payload.data];

        default:
            return state;

    }
}