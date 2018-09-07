import axios from 'axios';

import {
    FETCH_ALL_ITEMS,
    FETCH_ITEM_BY_ID,
    CREATE_ITEM,
    DELETE_ITEM,
    FETCH_SUBITEMS,
    FETCH_SUBITEM,
    CREATE_SUBITEM,
    DELETE_SUBITEM,
    EDIT_ITEM
} from './types';

const server = 'http://localhost:3000';

/* ITEM */

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

/* SUBITEM */

export function fetchSubItems(){
    const response = axios.get(`${server}/subitem`);

    return {
        type:FETCH_SUBITEMS,
        payload:response
    }
}

export function fetchSubItem(id){
    const response = axios.get(`${server}/subitem/${id}`);

    return {
        type:FETCH_SUBITEM,
        payload:response
    }
}

export function createSubitem(values, callback){
    const request = axios.post(`${server}/subitem`,values)
        .then(() => callback());

    return {
        type: CREATE_SUBITEM,
        payload: request
    }
}

/*export function fetchSubItemByItem(id){
    const response = axios.get(`${server}/${id}`);

    return {
        type:FETCH_ITEM_BY_ID,
        payload:response
    }
}*/

export function editSubitem(id, values, callback){
    const request = axios.put(`${server}/subitem/${id}`,values)
        .then(() => callback());

    return {
        type: EDIT_ITEM,
        payload: request
    }
}

export function deleteSubItem(id){
    
    axios.delete(`${server}/subitem/${id}`);

    return {
        type: DELETE_SUBITEM,
        payload: id
    }
}