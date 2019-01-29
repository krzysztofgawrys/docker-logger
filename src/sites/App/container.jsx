import {connect} from 'react-redux';
import App from './app';
import {addFetchedData} from '../../actions/dockers';

const mapStateToProps = (state) => {
    const {dockers} = state;
    return dockers;
};

const mapDispatchToProps = (dispatch) => {
    return {fetchDataFromURL: () => dispatch(addFetchedData())};
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
