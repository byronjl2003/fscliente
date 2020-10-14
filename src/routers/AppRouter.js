import React, { useEffect } from 'react';
import { useCookies } from 'react-cookie';
import {
    BrowserRouter as Router,
    Switch,
    Redirect
} from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';


import { AuthRouter } from './AuthRouter';
import { PrivateRoute } from './PrivateRoute';


import { PublicRoute } from './PublicRoute';


import { MainScreen } from '../pages/MainScreen/MainScreen';
import { login, logout } from '../actions/auth'
export const AppRouter = () => {

    //const dispatch = useDispatch();
    const usedispatch = useDispatch();
    const loadlocal = () => {
        let userstr = localStorage.getItem("user");
        if (userstr != null) {
            var user = JSON.parse(userstr);
            usedispatch(login(user));
        }
        else {
            usedispatch(logout(""));
        }
    }
    const [cookies, setCookie, removeCookie] = useCookies(['FSCOOKIE']);
    const isLoggedIn = useSelector(state => state.auth.logueado);

    useEffect(() => {
        //setChecking(false);
        console.log("COOKIE::  ", cookies.name);
        loadlocal();
        return () => {
            console.log("limpiando..");
        }
    }, [cookies]);


    return (
        <Router>
            <div>
                <Switch>
                    <PublicRoute
                        path="/auth"
                        component={AuthRouter}
                        isAuthenticated={isLoggedIn}

                    />

                    <PrivateRoute
                        exact
                        isAuthenticated={isLoggedIn}
                        path="/"
                        component={MainScreen}

                    />

                    <Redirect to="/auth/login" />


                </Switch>
            </div>
        </Router>
    )
}
