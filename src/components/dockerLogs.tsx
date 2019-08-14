import React from 'react';
import { IDockerAfterParse } from '../interfaces/docker';
import { makeStyles, createStyles, Theme } from '@material-ui/core';
import { ScrollFollow, LazyLog } from 'react-lazylog';

interface DockerProps {
    docker: IDockerAfterParse
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        dockerBox: {
            width: '100%',
            height: '65vh'
        },
    }),
);


const DockerLogs: React.SFC<DockerProps> = (props) => {

    const classes = useStyles();
    const URL = props.docker ? `${props.docker.URL}/containers/${props.docker.id}/logs?stderr=1&stdout=1&timestamps=1` : '';

    return (
        <div className={classes.dockerBox}>
            <ScrollFollow
                startFollowing
                render={({ onScroll, follow, startFollowing, stopFollowing }) => (
                    //@ts-ignore
                    <LazyLog extraLines={1} enableSearch url={URL} stream onScroll={onScroll} follow={follow} />
                )}
            />
        </div>
    );
};


export default DockerLogs;