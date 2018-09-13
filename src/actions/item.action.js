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

export const createItem = (values, token, callback) => async dispatch => {
    /*const request = axios.post(`${server}`,values, {
        headers: {authorization: token}
    })
        .then(() => callback());

    return {
        type: CREATE_ITEM,
        payload: request
    }*/
    try {
        const response = await axios.post(`${server}`,values, {
            headers: {authorization: token}
        })
        const newlyCreatedObjId = response.data._id;
        callback(newlyCreatedObjId);
        } catch(e) {
            //dispatch({ type: AUTH_ERROR, payload: 'Invalid login'});
            alert("something went wrong :( !!! " + e);
        }
}

export function editItem(id, values, token, callback){
    const request = axios.put(`${server}/${id}`,values, {
        headers: {authorization: token}
    })
        .then(() => callback());

    return {
        type: EDIT_ITEM,
        payload: request
    }
}

export function deleteItem(id, token){
    
    axios.delete(`${server}/${id}`, {
        headers: {authorization: token}
    });

    return {
        type: DELETE_ITEM,
        payload: id
    }
}