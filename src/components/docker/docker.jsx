import React from 'react';
import {Row, Col} from 'antd';
import {LazyStream, ScrollFollow} from 'react-lazylog';
import {parseName, getIcon, networkParser} from '../../utils/parser';

const logsOutput = (id, URL) => {
    let ret = null;
    if (id) {
        ret = (
            <div className='logsSpace'>
                <ScrollFollow startFollowing={true}>
                    {({follow, onScroll}) => (
                        <LazyStream url={URL} follow={follow} onScroll={onScroll}/>
                    )}
                </ScrollFollow>
            </div>
        );
    }
    return ret;
};

const DockerComponent = (docker) => {
    const network = docker.network ? networkParser(docker.network) : null;
    const URL = `${docker.URL}/containers/${docker.id}/logs?stderr=1&stdout=1&timestamps=1&follow=1`;
    return (
        <div>
            <div className="dockerDetails">
                <Row>
                    <Col span={8}>
                        <div className="element">Name: <strong>{parseName(docker.name)}</strong></div>
                    </Col>
                    <Col span={16}>
                        <div className="element">Id: <strong>{docker.id}</strong></div>
                    </Col>
                </Row>
                <Row>
                    <Col span={8}>
                        <div className="element">Status: <strong>{docker.status}</strong></div>
                    </Col>
                    <Col span={8}>
                        <div className="element">Network (address): <strong>{network ? network.address : ''}</strong>
                        </div>
                    </Col>
                    <Col span={8}>
                        <div className="element">Network (gateway): <strong>{network ? network.gateway : ''}</strong>
                        </div>
                    </Col>
                </Row>

                {logsOutput(docker.id, URL)}
            </div>
        </div>
    );
};

export default DockerComponent;
