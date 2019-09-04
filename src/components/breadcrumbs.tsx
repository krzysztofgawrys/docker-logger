import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import { Paper, Theme, makeStyles, createStyles } from '@material-ui/core';

import HomeIcon from '@material-ui/icons/Home';
import grayColor from '@material-ui/core/colors/grey';
import IconWrapper from '../components/iconWrapper';
import DockerIcon from '@iconify/icons-mdi/docker';


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            padding: theme.spacing(1, 2),
        },
        link: {
            display: 'flex',
            color: grayColor[700],
            textDecoration: 'none'
        },
        icon: {
            marginRight: theme.spacing(0.5),
            width: 20,
            height: 20,
        },
    }),
);
const BreadcrumbsComponent = (props: any) => {
    const { match: { params: { dockerId } } } = props;
    const classes = useStyles();

    return (
        <Paper elevation={0} className={classes.root}>
            <Breadcrumbs aria-label="breadcrumb" separator="›">
                <Link to={'/'} className={classes.link}>
                    <HomeIcon className={classes.icon} />
                    Home
                </Link>
                {dockerId && <Link
                    to={'/'}
                    className={classes.link}
                >
                    <IconWrapper
                         className={classes.icon}
                        icon={DockerIcon}
                    />
                    {dockerId}
                </Link>
                }
            </Breadcrumbs>
        </Paper>
    )
}

export default withRouter(BreadcrumbsComponent);