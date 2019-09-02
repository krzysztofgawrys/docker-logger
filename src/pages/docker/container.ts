import { connect } from 'react-redux';
import Container from './Docker';
import { withRouter } from 'react-router-dom';
import { IServer, IDockerAfterParse, IMetric, IMetricForDocker } from '../../interfaces/docker';
import { getDockerFromList } from '../../utils/parser';
import { getStatsForDocker, clearMetric, } from '../../actions/servers';
import metricInitial from '../../consts/metricInitial';

interface IState {
    docker: {
        servers: IServer[]
        metric: IMetricForDocker
    }
}

// tslint:disable-next-line:no-any
const mapStateToProps = (state: IState, ownProps: any) => {
    const { dockerId, serverId } = ownProps.match.params;
    const docker: IDockerAfterParse | undefined = getDockerFromList(state.docker.servers, dockerId, serverId);
    const metric: IMetric = (dockerId && state.docker.metric && state.docker.metric[dockerId]) ? state.docker.metric[dockerId] : metricInitial;
    return {
        docker,
        metric
    };
};

// tslint:disable-next-line:no-any
const mapDispatchToProps = (dispatch: any) => {
    return {
        getStatsForDocker: (URL: string, dockerId: string) => dispatch(getStatsForDocker(URL, dockerId)),
        clearMetric: () => dispatch(clearMetric())
    };
};


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Container));