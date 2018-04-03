import React, {Fragment} from 'react';
import {Row, Col} from 'react-grid-system';
import Info from '../../components/info';

const displayMessageOrInfo = (message, servers) => {
    let ret = null;
    const errors = [];
    if (servers) {
        ret = (
            <Fragment>
                <Row xs={16}>
                    {servers.map((element, i) => {
                        element.error ? ( // eslint-disable-line no-unused-expressions
                            errors.push(element.error)
                        ) : null;
                        return (
                            <Fragment key={i}>
                                {element.name ? (
                                    <Col lg={3} xs={12}>
                                        <Info {...element} />
                                    </Col>
                                ) : <span />
                                }
                            </Fragment>
                        );
                    })}
                </Row>
            </Fragment>
        );
    }
    return ret;
};

const Home = (props) => {
    const {message, servers} = props;
    return (
        <div>
            <div className="homeBlock">
                <h1>Dockers logger</h1>
                <p>Open source application to display information about dockers status. Multi servers are
                    available.
                </p>
                <p>To add own servers you have to edit <b>config.json</b> file and insert own data.
                </p>
            </div>
            <div className="homeBlock">
                <h1>Available servers</h1>
                {displayMessageOrInfo(message, servers)}
            </div>
        </div>
    );
};

export default Home;
