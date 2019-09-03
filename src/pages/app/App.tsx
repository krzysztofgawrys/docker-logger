import React, { PureComponent } from 'react';
import Router from '../../router';
import { IServer } from '../../interfaces/docker';

interface Props {
    getDockersFromDefinedServers(): void,
    servers?: IServer[]
}
class App extends PureComponent<Props> {
    componentDidMount() {
        this.props.getDockersFromDefinedServers();
    }
    
    render() {
        return (
            <Router />
        )
    }
};

export default App;