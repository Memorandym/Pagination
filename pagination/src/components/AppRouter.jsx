import React, {useContext} from 'react';
import {Route, Routes, Navigate} from "react-router-dom";
import {publicRoutes,privateRoutes} from "../router/index";
import {AuthContext} from "../context";
import Loader from "./UI/Loader/Loader";


const AppRouter = () => {
    const {isAuth, isLoading} = useContext(AuthContext);

    if(isLoading){
        return <Loader/>
    }

    return (
        <React.StrictMode>
            {isAuth
                ?
                <Routes>
                    {privateRoutes.map(route =>
                        <Route
                            element={route.element}
                            path={route.path}
                            key={route.path}
                        />
                    )}
                    <Route path="*" element={<Navigate to="/posts" />}/>
                </Routes>
                :
                <Routes>
                    {publicRoutes.map(route =>
                        <Route
                            element={route.element}
                            path={route.path}
                            key={route.path}
                        />
                    )}
                    <Route path="*" element={<Navigate to="/login" />}/>
                </Routes>
            }
        </React.StrictMode>
    );
};

export default AppRouter;