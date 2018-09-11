import axios from 'axios';
import {
    AUTH_USER,
    AUTH_ERROR
} from './types';

const server = 'http://localhost:3000';

export const signupAction = (formProps, callback) => /*return*/ async dispatch => { // we use redux thunk (control over the dispatch process)
    //dispatch({ type: AUTH_USER });
    //dispatch({ type: AUTH_USER }); // we could dispatch severals action
    /*request.then(() => { // and/or handle asynchronous request
        dispatch({ type: AUTH_USER });
    });*/

    //handle asynchronous request
    try {
    const response = await axios.post(`${server}/signup`, formProps);

    dispatch({ type: AUTH_USER, payload: response.data.token });
    localStorage.setItem('token', response.data.token);
    callback();
    } catch(e) {
        dispatch({ type: AUTH_ERROR, payload: 'Email in use'});
    }
};

/*export function signupAction(formProps, callback){

    alert('signup lancé !');
    
    const request = axios.post(`${server}/signup`, formProps)
        .then(() => callback());

    return{
        type: AUTH_USER,
        payload: request
    }

}*/

export const signinAction = (formProps, callback) => async dispatch => {
    try {
    const response = await axios.post(`${server}/signin`, formProps);

    const parsedToken = parseJwt(response.data.token);

    alert(parsedToken.sub);

    console.log('signin action data !', response.data);

    dispatch({ type: AUTH_USER, payload: {token : response.data.token, _id : parsedToken.sub} });

    localStorage.setItem('token', response.data.token);
    localStorage.setItem('_id', parsedToken.sub);
    callback();
    } catch(e) {
        dispatch({ type: AUTH_ERROR, payload: 'Invalid login'});
    }
};

function parseJwt (token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace('-', '+').replace('_', '/');
    return JSON.parse(window.atob(base64));
};

/*export function signinAction (formProps, callback){

    alert('signin lancé !');

    let test = '';

    const request = axios.post(`${server}/signin`, formProps)
        .then((r) => {
            alert(r.data.token);            
            test = r.data.token;
            callback()
        });

    return{        
        type: AUTH_USER,
        payload: test
    }

};*/

export function signoutAction(){

    alert('signout lancé !', localStorage._id);

    localStorage.removeItem('token');
    localStorage.removeItem('_id');

    return {
        type: AUTH_USER,
        payload: ''
    }
};