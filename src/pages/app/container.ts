import { connect } from 'react-redux';
import Container from './App';
import { getDockersFromDefinedServers } from '../../actions/servers';
import { IServer } from '../../interfaces/docker';

interface IState {
  docker: {
    servers: IServer[]
  }
}


const mapStateToProps = (state: IState) => {
  return {
    servers: state.docker.servers
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    getDockersFromDefinedServers: () => dispatch(getDockersFromDefinedServers()),
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(Container);