import axios from 'axios';
import {parser, metricParser} from '../utils/parser';
import config from '../../config.json';

const SET_DOCKERS = 'SET_DOCKERS';
const SET_DOCKERS_ERROR = 'SET_DOCKERS_ERROR';
const NO_DOCKERS = 'NO_DOCKERS';
const ADD_METRIC = 'ADD_METRIC';

const addMetric = (metric) => {
    return {
        type: ADD_METRIC,
        metric
    };
};

const addDockers = (name, URL, dockers) => {
    return {
        type: SET_DOCKERS,
        name,
        URL,
        dockers
    };
};

const addNoDockers = (message) => {
    return {
        type: NO_DOCKERS,
        message
    };
};

const addError = (name, URL, error) => {
    return {
        type: SET_DOCKERS_ERROR,
        name,
        URL,
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
                return fetchDataFromURL(`${server.URL}/containers/json`).
                    then((data) => {
                        const dockers = parser(data.data);
                        if (dockers.length > 0) {
                            dispatch(addDockers(server.NAME, server.URL, dockers));
                        } else {
                            dispatch(addError(server.NAME, server.URL, `Docker not detected for ${server.NAME} [${server.URL}]`));
                        }
                    }).
                    catch(() => {
                        dispatch(addError(server.NAME, server.URL, `Docker not detected for ${server.NAME} [${server.URL}]`));
                    });
            });
        } else {
            dispatch(addNoDockers('Dockers not detected'));
        }
        return true;
    };
};

const getStatsForDocker = (URL) => {
    return (dispatch) => {
        fetchDataFromURL(URL).
            then((resp) => {
                dispatch(addMetric(metricParser(resp.data)));
            });
    };
};

export {
    SET_DOCKERS,
    SET_DOCKERS_ERROR,
    NO_DOCKERS,
    ADD_METRIC,
    addDockers,
    fetchDataFromURL,
    addFetchedData,
    addError,
    addNoDockers,
    getStatsForDocker
};
