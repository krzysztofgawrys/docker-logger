import axios from 'axios';
import { LIST_OF_CONTAINERS } from '../consts/urls';
import config from '../config.json';
import { Dispatch } from 'redux';
import { parser, metricParser } from '../utils/parser';
import { IDockerAfterParse } from '../interfaces/docker';
import { SET_DOCKERS, SET_DOCKERS_ERROR, NO_DOCKERS, ADD_METRIC, REMOVE_METRIC } from '../consts/actions';


const fetchDataFromURL = async (URL: string) => {
    return axios.get(URL);
};

const addDockers = (name: string, URL: string, dockers: IDockerAfterParse[]) => {
    return {
        name,
        URL,
        dockers,
        type: SET_DOCKERS
    };
};

const addError = (name: string, URL: string, error: string) => {
    return {
        name,
        URL,
        error,
        type: SET_DOCKERS_ERROR
    };
};

const addNoDockers = (message: string) => {
    return {
        message,
        type: NO_DOCKERS
    };
};

const addMetric = (metric: object, dockerId: string) => {
    return {
        metric,
        dockerId,
        type: ADD_METRIC
    };
};

export const clearMetric = () => {
    return {
        type: REMOVE_METRIC
    };
};


export const getDockersFromDefinedServers = () => {
    return (dispatch: Dispatch, getState: Function) => {
        const state = getState();
        if (config && !(state.docker && state.docker.servers.length)) {
            config.forEach(server => {
                return fetchDataFromURL(`${server.URL}${LIST_OF_CONTAINERS}`)
                    .then((data) => {
                        const dockers = parser(data.data, server.URL);
                        if (dockers.length > 0) {
                            dispatch(addDockers(server.NAME, server.URL, dockers));
                        } else {
                            dispatch(addError(server.NAME, server.URL, `Docker not detected for ${server.NAME} [${server.URL}]`));
                        }
                    }).catch((error) => {
                        dispatch(addError(server.NAME, server.URL, `Docker not detected for ${server.NAME} [${server.URL}]`));
                    });
            });
        } else {
            dispatch(addNoDockers('Dockers not detected'));
        }
        return true;
    };
};


export const getStatsForDocker = (URL: string, dockerId: string) => {
    return (dispatch: Dispatch) => {
        fetchDataFromURL(URL)
            .then((resp) => {
                dispatch(addMetric(metricParser(resp.data), dockerId));
            })
        return true;
    };
};
