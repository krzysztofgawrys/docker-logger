import { AnyAction } from 'redux';

const initialState = {
    servers: [],
    message: null
};

const docker = (state = initialState, action: AnyAction) => {
    switch (action.type) {
        default:
            return state;
    }
};

export default docker;