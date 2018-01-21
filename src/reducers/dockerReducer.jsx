import {SET_DOCKERS, SET_DOCKERS_ERROR} from '../actions/dockers';

const initialState = {servers: []};

const dockerReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_DOCKERS: {
            return {
                ...state,
                servers: [...state.servers, {
                    name: action.name,
                    list: action.dockers
                }]
            };
        }

        case SET_DOCKERS_ERROR: {
            return {
                ...state,
                servers: [...state.servers, {
                    error: action.error
                }]
            };
        }

        default:
            return state;
    }
};

export default dockerReducer;
