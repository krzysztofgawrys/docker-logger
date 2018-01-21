import React from 'react';
import {Card} from 'antd';
import {LazyStream, ScrollFollow} from 'react-lazylog';
import {parseName, networkParser} from '../../utils/parser';

const {Meta} = Card;

const logsOutput = (id, URL) => {
    let ret = null;
    if (id) {
        ret = (
            <div className="logsSpace">
                <ScrollFollow startFollowing>
                    {({follow, onScroll}) => (
                        <LazyStream url={URL} follow={follow} onScroll={onScroll} />
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
                <Card>
                    <Meta
                        title={`Docker ${parseName(docker.name)} details`}
                        description={`ID: ${docker.id}`}
                    />
                    <div className="dockerInfo">
                        <p>Status: <strong>{docker.status}</strong> </p>
                        <p>Network (address): <strong>{network ? network.address : ''}</strong></p>
                        <p>Network (gateway): <strong>{network ? network.gateway : ''}</strong></p>
                    </div>
                </Card>
                {logsOutput(docker.id, URL)}
            </div>
        </div>
    );
};

export default DockerComponent;
