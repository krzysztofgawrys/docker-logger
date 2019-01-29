import {connect} from 'react-redux';
import Container from './docker';
import {getStatsForDocker} from '../../actions/dockers';

const mapStateToProps = () => {
    return {};
};

const mapDispatchToProps = (dispatch) => {
    return {getStatsForDocker: URL => dispatch(getStatsForDocker(URL))};
};

export default connect(mapStateToProps, mapDispatchToProps)(Container);
