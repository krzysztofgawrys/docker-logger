import axios from 'axios';
import {parser} from '../utils/parser';
import config from '../../config.json';

const SET_DOCKERS = 'SET_DOCKERS';
const SET_DOCKERS_ERROR = 'SET_DOCKERS_ERROR';
const NO_DOCKERS = 'NO_DOCKERS';

const addDockers = (name, dockers) => {
    return {
        type: SET_DOCKERS,
        name,
        dockers
    };
};

const addNoDockers = (message) => {
    return {
        type: NO_DOCKERS,
        message
    };
};

const addError = (name, error) => {
    return {
        type: SET_DOCKERS_ERROR,
        name,
        error
    };
};

const fetchDataFromURL = async (URL) => {
    const data = await axios.get(URL);
    return data;
};

const addFetchedData = () => {
    return (dispatch) => {
        if (config) {
            config.map((server) => {
                return fetchDataFromURL(`${server.URL}/containers/json`)
                    .then((data) => {
                        const dockers = parser(data.data);
                        if (dockers.length > 0) {
                            dispatch(addDockers(server.NAME, dockers));
                        } else {
                            dispatch(addError(server.NAME, `Docker not detected for ${server.NAME} [${server.URL}]`));
                        }
                    })
                    .catch(() => {
                        dispatch(addError(server.NAME, `Docker not detected for ${server.NAME} [${server.URL}]`));
                    });
            });
        } else {
            dispatch(addNoDockers('Dockers not detected'));
        }
        return true;
    };
};

export {
    SET_DOCKERS,
    SET_DOCKERS_ERROR,
    NO_DOCKERS,
    addDockers,
    fetchDataFromURL,
    addFetchedData,
    addError,
    addNoDockers
};
