import React, {Fragment} from 'react';
import {Alert, Row, Col} from 'antd';
import Info from '../../components/info';


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
const displayInfo = (servers) => {
    let ret = null;
    if (servers) {
        ret = (
            <Row gutter={16}>

                {servers.map((element, i) => {
                    return element.name ? (
                        <Col span={8} key={i}>
                            <Info {...element} />
                        </Col>
                    ) : null;
                })}
            </Row>
        );
    }
    return ret;
};

const Home = (props) => {
    const {message, servers} = props;
    return (
        <div>
            {displayMessage(message, servers)}
            {displayInfo(servers)}

        </div>

    );
};

export default Home;
