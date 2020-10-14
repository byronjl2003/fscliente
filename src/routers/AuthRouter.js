import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';


import { LoginScreen } from '../pages/LoginScreen/LoginScreen';
import { PublicRoute } from '../routers/PublicRoute';
import { useDispatch, useSelector } from 'react-redux';
export const AuthRouter = () => {


    const isLoggedIn = useSelector(state => state.auth.logueado);
    return (
        <div className="auth__main">
            <div className="auth__box-container">
                <Switch>

                    <PublicRoute
                        exact
                        path="/auth/login"
                        component={LoginScreen}
                        isAuthenticated={isLoggedIn}
                    />


                    <Redirect to="/auth/login" />


                </Switch>
            </div>

        </div>
    )
}
