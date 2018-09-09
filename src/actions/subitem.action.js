import axios from 'axios';
import {
    FETCH_SUBITEMS,
    FETCH_SUBITEM,
    CREATE_SUBITEM,
    DELETE_SUBITEM,
    EDIT_SUBITEM  
} from './types';

const server = 'http://localhost:3000';

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
        type:FETCH_ITEM,
        payload:response
    }
}*/

export function editSubitem(id, values, callback){
    const request = axios.put(`${server}/subitem/${id}`,values)
        .then(() => callback());

    return {
        type: EDIT_SUBITEM,
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