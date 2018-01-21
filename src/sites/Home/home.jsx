import React from 'react';
import {Alert} from 'antd';


const displayMessage = (message) => {
    let ret = null;
    if (message) {
        ret = (
            <Alert
                message={message}
                type="warning"
            />
        );
    }
    return ret;
};

const Home = (props) => {
    return (
        <div>
            Home
            {displayMessage(props.message)}
        </div>

    );
};

export default Home;
