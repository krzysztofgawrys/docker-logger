import React from 'react';
import {Route} from 'react-router-dom';
import Home from '../sites/Home';
import Docker from '../sites/Docker';


export const routes = [
    {
        path: '/',
        exact: true,
        component: Home
    },
    {
        path: '/dockers/:index/:id',
        component: Docker
    }
];

export const RouteWithSubRoutes = (route, key) => (
    <Route
        key={key}
        path={route.path}
        exact={route.exact}
        render={props => (
            <route.component {...props} routes={route.routes} />
        )}
    />
);
