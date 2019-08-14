import { AnyAction } from 'redux';
import { SET_DOCKERS } from '../consts/actions';
import { IServer } from '../interfaces/docker';

interface IInitialState {
    servers: IServer[],
    message: string
};

const initialState: IInitialState = {
    servers: [],
    message: ''
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

        default:
            return state;
    }
};

export default docker;