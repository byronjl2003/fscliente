import { types } from '../types/types';

export const startspindelete = () => ({
    type: types.spindelete,
    payload: true
});
export const stopspindelete = () => ({
    type: types.spindelete,
    payload: false
});

export const startspinmod = () => ({
    type: types.spinmod,
    payload: true
});
export const stopspinmod = () => ({
    type: types.spinmod,
    payload: false
});

export const startLoading = () => ({
    type: types.loading
});
export const stopLoading = () => ({
    type: types.noloading
});

export const startLoadingtable = () => ({
    type: types.loadingtable
});
export const stopLoadingtable = () => ({
    type: types.noloadingtable
});

export const changeProgress = (porcentaje) => ({
    type: types.changeprogress,
    payload: {
        porcentaje
    }
});

export const hideProgress = () => ({
    type: types.hideprogress
});


export const showProgress = () => ({
    type: types.showprogress
});
