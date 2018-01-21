import {SET_DOCKERS, SET_DOCKERS_ERROR, NO_DOCKERS} from '../actions/dockers';

const initialState = {
    servers: [],
    message: null
};

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

        case NO_DOCKERS: {
            return {
                ...state,
                message: action.message
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
