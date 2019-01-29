import React from 'react';
import DockerComponent from '../../components/docker';
import { getDockerFromList } from '../../utils/parser';
import PropTypes from 'prop-types';

const Docker = ({ servers, match, metric }) => {
    const { id, index } = match.params;
    const docker = getDockerFromList(servers, id, index);
    return (
        <div>
            <DockerComponent
                docker={docker}
                metric={metric}
            />
        </div>

    );
};

Docker.propTypes = {
    match: PropTypes.object.isRequired,
    metric: PropTypes.object,
    servers: PropTypes.array.isRequired
};

Docker.defaultProps = {metric: {}};

export default Docker;
