import React from 'react';
import DockerComponent from '../../components/docker';
import {getDockerFromList} from '../../utils/parser';

const Docker = ({servers, match, metric}) => {
    const {id, index} = match.params;
    const docker = getDockerFromList(servers, id, index);
    return (
        <div>
            <DockerComponent docker={docker} metric={metric} />
        </div>

    );
};

export default Docker;
