import React, {Fragment} from 'react';
import {Alert, Row, Col} from 'antd';
import Info from '../../components/info';


const displayMessageOrInfo = (message, servers) => {
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
                        <div className="messagesBlock" key={i}>
                            <Alert
                                key={i}
                                message={element.error}
                                type="warning"
                                showIcon
                            />
                        </div>
                    ) : (
                        <Row gutter={16}>

                            {servers.map((infoElement, index) => {
                                return infoElement.name ? (
                                    <Col span={8} key={index}>
                                        <Info {...infoElement} />
                                    </Col>
                                ) : null;
                            })}
                        </Row>
                    );
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
            {displayMessageOrInfo(message, servers)}

        </div>

    );
};

export default Home;
