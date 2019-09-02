import { AnyAction } from 'redux';
import { SET_DOCKERS, ADD_METRIC, REMOVE_METRIC } from '../consts/actions';
import { IServer, IMetric, IMetricForDocker } from '../interfaces/docker';
import metricInitial from '../consts/metricInitial';

interface IInitialState {
    servers: IServer[],
    message: string,
    metric?: IMetricForDocker
};

enum IType {
    cpu = 'cpu',
    memory = 'memory',
    networksData = 'networksData',
    pids = 'pids'
};



const initialState: IInitialState = {
    servers: [],
    message: '',
    metric: undefined
};



const docker = (state = initialState, action: AnyAction) => {
    switch (action.type) {

        case SET_DOCKERS: {
            return {
                ...state,
                servers: [
                    ...state.servers,
                    {
                        name: action.name,
                        URL: action.URL,
                        list: action.dockers
                    }
                ]
            };
        }

        case ADD_METRIC: {

            const { dockerId } = action;
            let metric: IMetric = state.metric && state.metric[dockerId] ? state.metric[dockerId] : metricInitial;
            // @ts-ignore
            Object.keys(action.metric).forEach((key: IType) => {
                metric = { ...metric, [key]: [...metric[key], action.metric[key]] };
            });

            const last = state.metric && state.metric[dockerId] ? state.metric[dockerId] : metricInitial;
           
            return {
                ...state,
                metric: {
                    ...state.metric,
                    [dockerId]: { ...last, ...metric }
                }
            };
        }

        case REMOVE_METRIC: {
            return {
                ...state,
                metric: undefined
            }
        }

        default:
            return state;
    }
};

export default docker;