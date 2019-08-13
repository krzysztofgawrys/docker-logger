import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from '../pages/home';
import Layout from '../layout';


const AppRouter = () => {
    return (
        <Router>
            <Layout>
                <Switch>
                    <Route path="/" exact component={Home} />
                    <Route component={NoMatchPage} />
                </Switch>
            </Layout>
        </Router>
    );
}

const NoMatchPage = () => {
    return (
        <h3>404 - Not found</h3>
    );
};

export default AppRouter;