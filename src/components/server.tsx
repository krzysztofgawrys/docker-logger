import { IServer } from "../interfaces/docker";
import React from 'react';
import DockerBox from './dockerBox';

interface ServersProps {
    server: IServer,
    index: number
}


const Server: React.SFC<ServersProps> = ({server, index}) => {
    return (
        <div>
            {server.name}
            <DockerBox list={server.list} index={index} />
        </div>
    )
};

export default Server;