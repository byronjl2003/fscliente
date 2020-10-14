import { types } from '../types/types';

const initalState = {
    files: [],
    actualfile: null
}

export const fileReducer = (state = initalState, action) => {
    switch (action.type) {
        case types.modfile:
            {
                let newf = state.files.map((item) => {
                    if (item.id == action.payload.id) {
                        return action.payload
                    }
                    else {
                        return item;
                    }

                })
                return {
                    ...state,
                    files: newf
                }
            }
        case types.deletefile:
            {
                let newf = state.files.filter((item) => {
                    return item.id != action.payload
                })
                return {
                    ...state,
                    files: newf
                }
            }

        case types.createfile:
            return {
                ...state,
                files: [...state.files, action.payload]
            };
        case types.getfiles:
            return {
                ...state,
                files: action.payload

            };
        default:
            return state;

    }
}