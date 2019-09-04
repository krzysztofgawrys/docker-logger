import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from '../pages/home';
import Docker from '../pages/docker';

import Breadcrumbs from '../components/breadcrumbs';
import Layout from '../layout';


const LayoutRoute = ({ component: Component, ...rest }: any) => (
    <Route {...rest} render={routeProps => (
      <Layout>
        <Component {...routeProps}/>
      </Layout>
    )}/>
  )

const AppRouter = () => {
    return (
        <Router>
            <Switch>
                <LayoutRoute path="/docker/:serverId/:dockerId" component={Docker}/>
                <LayoutRoute path="/" exact={true}  component={Home}/>
                <Route component={NoMatchPage} />
            </Switch>
        </Router>
    );
}

const NoMatchPage = () => {
    return (
        <h3>404 - Not found</h3>
    );
};

export default AppRouter;