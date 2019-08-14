import { connect } from 'react-redux';
import Container from './Docker';
import { withRouter } from 'react-router-dom';
import { Dispatch } from 'redux';
import { IServer, IDockerAfterParse } from '../../interfaces/docker';
import { getDockerFromList } from '../../utils/parser';

interface IState {
    docker: {
        servers: IServer[]
    }
}

const mapStateToProps = (state: IState, ownProps: any) => {
    const { dockerId, serverId } = ownProps.match.params;
    console.log(state);
    const docker: IDockerAfterParse | undefined = getDockerFromList(state.docker.servers, dockerId, serverId);
    return {
        docker
    };
};

const mapDispatchToProps = (dispatch: Dispatch, ownProps: any) => {
    return {};
};


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Container));