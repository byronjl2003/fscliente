import { startLoading, stopLoading } from './ui';
import { types } from '../types/types';
import { notification } from 'antd';
import Axios, { axios } from 'axios';
const openNotification = (title, desc) => {
    notification.open({
        message: title,
        description:
            desc,
        onClick: () => {
            console.log('Notification Clicked!');
        },
    });
};
export const loguearse = (user, pass) => {
    const usuario = { email: user, nombre: " ", pass: pass };
    return (dispatch) => {
        dispatch(startLoading());
        /*  let requestOptions = {
             method: 'POST',
             headers: { 'Content-Type': 'application/json' },
             body: JSON.stringify(usuario)
         }; */
        let url = `http://back:5000/api/v1/autenticacion`;
        let config = {
            headers: { 'Content-Type': 'application/json' }

        }
        Axios.post(url, usuario, config).then(
            (res) => {
                console.log(res);
                dispatch(login(user));
                localStorage.setItem("user", JSON.stringify(user))
                dispatch(stopLoading());
            }
        ).catch((err) => {
            console.error(err);
            openNotification("Error en la autenticacion", "Error");
            dispatch(stopLoading());
        });

        /* fetch(url, requestOptions)
            .then(r => r.json())
            .then(resp => {
                console.log(resp);
                dispatch(login(user));
                dispatch(stopLoading());
            })
            .catch((error) => {
                console.error(error);
                openNotification("Error en la autenticacion", "Error");
                dispatch(stopLoading());
            }); */
        /* setTimeout(() => {
            dispatch(login(user));
            dispatch(stopLoading());
        }, 100); */


    };
}
export const login = (user) => ({
    type: types.login,
    payload: {
        user
    }
});
export const logout = (user) => {
    localStorage.removeItem("user")
    return {
        type: types.logout

    }
};



