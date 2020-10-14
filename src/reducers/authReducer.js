import { types } from '../types/types';
const initialstate = {
    logueado: false,
    user: "",

}

export const authReducer = (state = initialstate, action) => {

    switch (action.type) {
        case types.login:
            return {
                ...state,
                logueado: true,
                user: action.payload.user
            };
        case types.logout:
            return {
                ...state,
                logueado: false,
                user: ""

            };
        default:
            return state;

    }
}
