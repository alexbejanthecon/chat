import {LOGIN, LOGOUT} from '../constants/actionTypes';

const initialState = {
    user: null
};
const loginReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case LOGIN:
            return {
                ...state,
                user: {
                    name: action.payload.name,
                    status: action.payload.status
                }
            }
        case LOGOUT:
            return {
                ...state,
                user: null,
            }

        default:
            return state;
    }
}
export default loginReducer;
