import axios from 'axios';

import {
    FETCH_ALL_ITEMS,
    FETCH_ITEM_BY_ID,
    CREATE_ITEM,
    DELETE_ITEM
} from './types';

const server = 'http://localhost:3000';

export function fetchAllItems(){
    const response = axios.get(server);

    return {
        type:FETCH_ALL_ITEMS,
        payload:response
    }
}

export function fetchItem(id){
    const response = axios.get(`${server}/${id}`);

    return {
        type:FETCH_ITEM_BY_ID,
        payload:response
    }
}

export function createItem(values, callback){
    const request = axios.post(`${server}`,values)
        .then(() => callback());

    return {
        type: CREATE_ITEM,
        payload: request
    }
}

export function deleteItem(id){
    
    axios.delete(`${server}/${id}`);

    return {
        type: DELETE_ITEM,
        payload: id
    }
}