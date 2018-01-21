import {connect} from 'react-redux';
import Docker from './docker';

const mapStateToProps = (state) => {
    const {dockers} = state;
    return dockers;
};

const mapDispatchToProps = () => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Docker);
