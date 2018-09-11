import axios from 'axios';
import {
    FETCH_IMAGES,
    FETCH_IMAGE,
    CREATE_IMAGE,
    DELETE_IMAGE,
    EDIT_IMAGE  
} from './types';

const server = 'http://localhost:3000';

export function fetchImages(){
    const response = axios.get(`${server}/image`);

    return {
        type:FETCH_IMAGES,
        payload:response
    }
}

export function fetchImage(id){
    const response = axios.get(`${server}/image/${id}`);

    return {
        type:FETCH_IMAGE,
        payload:response
    }
}

export function createImage(values, token, callback){
    const request = axios.post(`${server}/image`,values, {
        headers: {authorization:token}
    })
        .then(() => callback());

    return {
        type: CREATE_IMAGE,
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

export function editImage(id, values, token, callback){
    const request = axios.put(`${server}/image/${id}`,values, {
        headers: {authorization:token}
    })
        .then(() => callback());

    return {
        type: EDIT_IMAGE,
        payload: request
    }
}

export function deleteImage(id, token){
    
    axios.delete(`${server}/image/${id}`, {
        headers: {authorization:token}
    });

    return {
        type: DELETE_IMAGE,
        payload: id
    }
}