import React, { Component } from 'react';

import Router from '../../router/index';
import PropTypes from 'prop-types';

class App extends Component {
    componentDidMount() {
        const { fetchDataFromURL } = this.props;
        fetchDataFromURL();
    }

    render() {
        const { servers } = this.props;
        return (
            <div>
                <Router servers={servers} />
            </div>

        );
    }
}

App.propTypes = {
    fetchDataFromURL: PropTypes.func.isRequired,
    servers: PropTypes.array
};

App.defaultProps = {servers: []};

export default App;
