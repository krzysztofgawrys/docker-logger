import React, {Component} from 'react';

import Router from '../../router/index';

class App extends Component {
    componentDidMount() {
        this.props.fetchDataFromURL();
    }

    render() {
        const {servers} = this.props;
        return (
            <div>
                <Router servers={servers} />
            </div>

        );
    }
}

export default App;
