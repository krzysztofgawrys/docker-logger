import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {RouteWithSubRoutes, routes} from './config';
import NotFound from '../sites/notFound';
import Layout from '../layout';
import PropTypes from 'prop-types';

const RouterElements = ({servers}) => {
    return (
        <Router>
            <Layout servers={servers}>
                <Switch>
                    {routes.map((route, key) => (
                        <RouteWithSubRoutes
                            {...route}
                            // eslint-disable-next-line react/no-array-index-key
                            key={key}
                        />
                    ))}

                    <Route component={NotFound} />
                </Switch>
            </Layout>
        </Router>
    );
};

RouterElements.propTypes = {servers: PropTypes.array.isRequired};

export default RouterElements;
