import { connect } from 'react-redux';
import Container from './Home';
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

const mapDispatchToProps = () => {
  return {
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(Container);