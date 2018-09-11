import axios from 'axios';
import {
    FETCH_USERS,
    FETCH_USER,
    CREATE_USER,
    DELETE_USER,
    EDIT_USER  
} from './types';

const server = 'http://localhost:3000';

export function fetchUsers(){
    const response = axios.get(`${server}/user`);

    return {
        type:FETCH_USERS,
        payload:response
    }
}

export function fetchUser(id){
    const response = axios.get(`${server}/user/${id}`);

    return {
        type:FETCH_USER,
        payload:response
    }
}

export function createUser(values, token, callback){
    const request = axios.post(`${server}/user`,values, {
        headers: {authorization:token}
    })
        .then(() => callback());

    return {
        type: CREATE_USER,
        payload: request
    }
}

/*export function fetchImageByItem(id){
    const response = axios.get(`${server}/${id}`);

    return {
        type:FETCH_IMAGE,
        payload:response
    }
}*/

export function editUser(id, values, token, callback){
    const request = axios.put(`${server}/user/${id}`,values, {
        headers: {authorization:token}
    })
        .then(() => callback());

    return {
        type: EDIT_USER,
        payload: request
    }
}

export function deleteUser(id, token){
    
    axios.delete(`${server}/user/${id}`, {
        headers: {authorization:token}
    });

    return {
        type: DELETE_USER,
        payload: id
    }
}