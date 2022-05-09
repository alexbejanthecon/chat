import {LOGIN, LOGOUT} from '../constants/actionTypes';

export function onLogin(user: any) {
    return {
        type: LOGIN,
        payload: user
    }
}

export function onLogout() {
    return {
        type: LOGOUT,
    }
}
