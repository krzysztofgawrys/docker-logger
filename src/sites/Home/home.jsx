import React, {Fragment} from 'react';
import {Alert} from 'antd';


const displayMessage = (message, servers) => {
    let ret = null;
    if (message) {
        ret = (
            <Alert
                message={message}
                type="warning"
                showIcon
            />
        );
    }
    if (servers) {
        ret = (
            <Fragment>
                {servers.map((element, i) => {
                    return element.error ? (
                        <div className="messagesBlock">
                            <Alert
                                key={i}
                                message={element.error}
                                type="warning"
                                showIcon
                            />
                        </div>
                    ) : null;
                })}
            </Fragment>
        );
    }
    return ret;
};

const Home = (props) => {
    const {message, servers} = props;
    return (
        <div>
            {displayMessage(message, servers)}
        </div>

    );
};

export default Home;
