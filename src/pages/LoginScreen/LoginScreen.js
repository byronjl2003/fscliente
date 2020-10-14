import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, notification } from 'antd';
import './styles.css';


import { loguearse } from '../../actions/auth';
import { useForm } from '../../hooks/useForm';

export const LoginScreen = () => {


    const [formValues, handleInputChange] = useForm({
        user: 'byronjl2003@gmail.com',
        password: '11001100'
    });
    const { user, password } = formValues;
    const dispatch = useDispatch();
    const isloading = useSelector(state => state.ui.loading);
    const login = (e) => {
        e.preventDefault();
        //openNotification();
        dispatch(loguearse(user, password));

    }

    return (
        <div className="container">
            <div className="formwrap">
                <a className="icon">My-Drive</a>
                <div className="formcontent">
                    <form className="form" onSubmit={login}>
                        <h1 className="formh1">Ingresa</h1>
                        <label className="formlabel" htmlFor="for">Usuario</label>
                        <input
                            className="forminput"
                            name="user"
                            value={user}
                            onChange={handleInputChange}
                        >

                        </input>
                        <label className="formlabel" htmlFor="for">Contrasenia</label>
                        <input
                            className="forminput"
                            name="password"
                            type="password"
                            value={password}

                            onChange={handleInputChange}
                        >

                        </input>
                        <Button
                            type="primary"
                            className="formbutton"
                            loading={isloading}
                            onClick={login}
                        >Ingresar</Button>
                        <span className="formtext"> Recuperar Contrasenia</span>
                    </form>
                </div>
            </div>
        </div>
    )
}
