import axios from 'axios';

import {
    FETCH_ALL_ITEMS,
    FETCH_ITEM_BY_ID
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

    alert('fetch item lance');

    return {
        type:FETCH_ITEM_BY_ID,
        payload:response
    }
}