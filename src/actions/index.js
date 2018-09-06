import axios from 'axios';

import {
    FETCH_ALL_ITEMS,
    FETCH_ITEM_BY_ID,
    CREATE_ITEM,
    DELETE_ITEM,
    FETCH_SUBITEMS,
    DELETE_SUBITEM
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

export function deleteItem(id){
    
    axios.delete(`${server}/${id}`);

    return {
        type: DELETE_ITEM,
        payload: id
    }
}

/* SUBITEM */

export function fetchSubItems(){
    alert('fetch subitems');
    const response = axios.get(`${server}/subitem`);

    response.then((r)=>{
        alert('ok');
        console.log(r.data);
    })

    return {
        type:FETCH_SUBITEMS,
        payload:response
    }
}

export function fetchSubItem(id){
    const response = axios.get(`${server}/subitem/${id}`);

    return {
        type:FETCH_ITEM_BY_ID,
        payload:response
    }
}

/*export function fetchSubItemByItem(id){
    const response = axios.get(`${server}/${id}`);

    return {
        type:FETCH_ITEM_BY_ID,
        payload:response
    }
}*/

export function deleteSubItem(id){
    
    axios.delete(`${server}/subitem/${id}`);

    return {
        type: DELETE_SUBITEM,
        payload: id
    }
}