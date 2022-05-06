import {LOGIN, LOGOUT} from '../constants';

const initialState = {
    user: null
};
const loginReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case LOGIN:
            console.log("user in reducer",action.payload);
            return {
                ...state,
                user: {
                    email: action.payload.email,
                    password: action.payload.password
                }
            }
        case LOGOUT:
            return {
                ...state,
                user: null,
            }

        default:
            console.log("default case");
            return state;
    }
}
export default loginReducer;
