import React from 'react';
import { RouteComponentProps } from "react-router-dom";
import { IDockerAfterParse } from '../../interfaces/docker';

import { LazyLog, ScrollFollow } from 'react-lazylog';
import { makeStyles, createStyles, Theme } from '@material-ui/core';

interface DockerProps extends RouteComponentProps<any> {
    docker?: IDockerAfterParse | undefined
}


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        dockerBox: {
            width: '100%',
            height: '80vh'
        },
    }),
);

const Docker: React.SFC<DockerProps> = (props) => {
    const classes = useStyles();
    const URL = props.docker ? `${props.docker.URL}/containers/${props.docker.id}/logs?stderr=1&stdout=1&timestamps=1` : '';
    console.log(URL);
    return (
        <div>
            <div className={classes.dockerBox}>
                <ScrollFollow
                    startFollowing
                    render={({ onScroll, follow, startFollowing, stopFollowing }) => (
                        //@ts-ignore
                        <LazyLog extraLines={1} enableSearch url={URL} stream onScroll={onScroll} follow={follow} />
                    )}
                />
            </div>
        </div>
    )
};

export default Docker;