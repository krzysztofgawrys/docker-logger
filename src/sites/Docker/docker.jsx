import React from 'react';
import DockerComponent from '../../components/docker';
import {getDockerFromList} from '../../utils/parser';

const Docker = ({servers, match}) => {
    const {id, index} = match.params;
    const docker = getDockerFromList(servers, id, index);
    return (
        <div>
            <h1>Available servers</h1>
            <DockerComponent {...docker} />
        </div>

    );
};

export default Docker;
