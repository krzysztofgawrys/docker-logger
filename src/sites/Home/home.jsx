import React, {Fragment} from 'react';
import {Alert, Row, Col} from 'antd';
import Info from '../../components/info';

const showErrors = (errors) => {
    return (
        <div>
            {errors.map((error, id) => {
                return (
                    <div className="messagesBlock" key={id}>
                        <Alert
                            key={id}
                            message={error}
                            type="warning"
                            showIcon
                        />
                    </div>
                );
            })}
        </div>
    );
};

const displayMessageOrInfo = (message, servers) => {
    let ret = null;
    const errors = [];
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
                <Row gutter={16}>
                    {servers.map((element, i) => {
                        element.error ? ( // eslint-disable-line no-unused-expressions
                            errors.push(element.error)
                        ) : null;
                        return (
                            <Fragment key={i}>
                                {element.name ? (
                                    <Col span={8}>
                                        <Info {...element} />
                                    </Col>
                                ) : <span />
                                }
                            </Fragment>
                        );
                    })}
                </Row>
                {showErrors(errors)}
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
