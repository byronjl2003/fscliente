import { startspindelete, startspinmod, stopspindelete, stopspinmod, startLoadingtable, stopLoadingtable, changeProgress, hideProgress, showProgress } from './ui';
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

export const addFile = (file, user) => ({
    type: types.createfile,
    payload: file

});


export const deleteFile = (id) => {
    return (dispatch) => {

        dispatch(startspindelete());
        let url = `http://back:5000/api/v1/files/${id}`;
        Axios.delete(url)
            .then((resp) => {
                console.log(resp);
                dispatch(stopspindelete());
                dispatch(deletef(id));
            })
            .catch((err) => {
                console.log(err);
                dispatch(stopspindelete());

            })

    }
}

export const modFile = (id, newnombre, username) => {
    return (dispatch) => {
        dispatch(startspinmod());
        let url = `http://back:5000/api/v1/files/${username}`;
        let newf = { id: id, name: newnombre, path: "." }
        Axios.put(url, newf).then(
            (res) => {
                console.log(res);
                dispatch(modf(res.data));
                dispatch(stopspinmod());
            }
        ).catch(err => { console.log(err); dispatch(stopspinmod()); })

    }
}
export const uploadfile = (formData, user) => {
    return (dispatch) => {
        dispatch(changeProgress(0, 0));
        dispatch(showProgress());
        let url = `http://back:5000/api/v1/files/${user}`;
        let config = {
            onUploadProgress: function (progressEvent) {
                let percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
                console.log(percentCompleted)
                dispatch(changeProgress(percentCompleted));
            }
        }
        Axios.post(url, formData, config).then(
            (res) => {
                console.log(res);
                dispatch(pushfile(res.data));
                dispatch(hideProgress());
            }
        ).catch(err => console.log(err))



    }
}
export const getfiles = (userid) => {
    return (dispatch) => {
        //dispatch(startLoadingtable());
        let requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }

        };
        let url = `http://back:5000/api/v1/files/all/${userid}`;
        fetch(url, requestOptions)
            .then(r => r.json())
            .then(resp => {
                console.log(resp);
                dispatch(refreshfiles(resp));
                dispatch(stopLoadingtable());
            })
            .catch((error) => {
                console.error(error);
                openNotification("Error en la autenticacion", "Error");
                dispatch(stopLoadingtable());
            });

    }
}

export const refreshfiles = (files) => ({
    type: types.getfiles,
    payload: files

});
export const pushfile = (file) => ({
    type: types.createfile,
    payload: file
})

export const deletef = (idf) => ({
    type: types.deletefile,
    payload: idf
})
export const modf = (f) => ({
    type: types.modfile,
    payload: f
})
