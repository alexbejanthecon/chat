import {LOGIN, LOGOUT} from '../constants';
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
