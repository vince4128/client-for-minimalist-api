import axios from 'axios';
import {
    FETCH_CATEGORIES,
    FETCH_CATEGORY,
    CREATE_CATEGORY,
    DELETE_CATEGORY,
    EDIT_CATEGORY  
} from './types';

const server = 'http://localhost:3000';

export function fetchCategories(){
    const response = axios.get(`${server}/category`);

    return {
        type:FETCH_CATEGORIES,
        payload:response
    }
}

export function fetchCategory(id){
    const response = axios.get(`${server}/category/${id}`);

    return {
        type:FETCH_CATEGORY,
        payload:response
    }
}

export function createCategory(values, callback){
    const request = axios.post(`${server}/category`,values)
        .then(() => callback());

    return {
        type: CREATE_CATEGORY,
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

export function editCategory(id, values, callback){
    const request = axios.put(`${server}/category/${id}`,values)
        .then(() => callback());

    return {
        type: EDIT_CATEGORY,
        payload: request
    }
}

export function deleteCategory(id){
    
    axios.delete(`${server}/category/${id}`);

    return {
        type: DELETE_CATEGORY,
        payload: id
    }
}