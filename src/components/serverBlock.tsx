import React from 'react';
import { IServer } from '../interfaces/docker';

import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import ImageIcon from '@material-ui/icons/Computer';
import { makeStyles, createStyles } from '@material-ui/styles';
import { Theme } from '@material-ui/core';

interface ServersProps {
    server: IServer,
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        span: {
            display: 'block'
        }
    }),
);

const ServerBlock: React.SFC<ServersProps> = ({ server }: ServersProps) => {

    const classes = useStyles();

    return (
        <ListItem>
            <ListItemAvatar>
                <Avatar>
                    <ImageIcon color={server.list.length ? 'inherit' : 'error'} />
                </Avatar>
            </ListItemAvatar>
            <ListItemText primary={server.name} secondary={
                <>
                    <span className={classes.span}>dockers: {server.list.length}</span>
                    <span className={classes.span}>{server.URL}</span>
                </>
            } />
        </ListItem>
    )
};

export default ServerBlock;