import {connect} from 'react-redux';
import Home from './home';

const mapStateToProps = (state) => {
    const {dockers} = state;
    return dockers;
};

const mapDispatchToProps = () => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
