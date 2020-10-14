import { types } from '../types/types';

const initialState = {
    loading: false,
    loadingtable: false,
    porcentaje: 0,
    spinningmod: false,
    spinningdelete: false,
    progress: false
};
export const uiReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.spindelete:
            return {
                ...state,
                spinningdelete: action.payload
            }
        case types.spinmod:
            return {
                ...state,
                spinningmod: action.payload
            }
        case types.showprogress:
            return {
                ...state,
                progress: true
            }
        case types.hideprogress:
            return {
                ...state,
                progress: false
            }
        case types.changeprogress:
            return {
                ...state,
                porcentaje: action.payload.porcentaje

            }
        case types.loading:
            return {
                ...state,
                loading: true
            };
        case types.noloading:
            return {
                ...state,
                loading: false
            };
        case types.loadingtable:
            return {
                ...state,
                loadingtable: true
            }
        case types.noloadingtable:
            return {
                ...state,
                loadingtable: false
            }
        default:
            return state;
    }
}