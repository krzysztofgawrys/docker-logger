import React from 'react';
import { IDockerAfterParse } from '../interfaces/docker';
import { makeStyles, createStyles, Theme, Button } from '@material-ui/core';
import { ScrollFollow, LazyLog } from 'react-lazylog';
import DownloadIcon from '@material-ui/icons/CloudDownload';

interface DockerProps {
    docker: IDockerAfterParse
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        dockerBox: {
            width: '100%',
            height: '61vh'
        },
        rightIcon: {
            marginLeft: theme.spacing(1),
        },
    }),
);



const DockerLogs: React.SFC<DockerProps> = (props) => {

    const classes = useStyles();
    const URL = props.docker ? `${props.docker.URL}/containers/${props.docker.id}/logs?stderr=1&stdout=1&timestamps=1&follow=1` : '';

    const onClick = (URL: string) => {
        window.open(URL, '_blank');
    }

    return (
        <>
            <div>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => onClick(URL)}
                >
                    Save logs
                    <DownloadIcon className={classes.rightIcon} />
                </Button>
            </div>
            <div className={classes.dockerBox}>
                <ScrollFollow
                    startFollowing
                    render={({ onScroll, follow, startFollowing, stopFollowing }) => (
                        //@ts-ignore
                        <LazyLog extraLines={1} enableSearch url={URL} stream onScroll={onScroll} follow={follow} />
                    )}
                />
            </div>
        </>
    );
};


export default DockerLogs;