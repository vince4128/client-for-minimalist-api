import axios from 'axios';
import {
    FETCH_ITEMS,
    FETCH_ITEM,
    CREATE_ITEM,
    DELETE_ITEM,
    EDIT_ITEM
} from './types';

const server = 'http://localhost:3000';

export function fetchAllItems(){
    const response = axios.get(server);

    return {
        type:FETCH_ITEMS,
        payload:response
    }
}

export function fetchItem(id){
    const response = axios.get(`${server}/${id}`);

    return {
        type:FETCH_ITEM,
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

export function editItem(id, values, callback){
    const request = axios.put(`${server}/${id}`,values)
        .then(() => callback());

    return {
        type: EDIT_ITEM,
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