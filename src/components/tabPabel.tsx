import React from 'react';
import { Typography, Box, createStyles, makeStyles, Theme } from "@material-ui/core";

interface TabPanelProps {
    children?: React.ReactNode;
    index: any;
    value: any;
}


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        box: {
            width: '100%',
            height: '67.5vh'
        },
    }),
);

const TabPanel: React.SFC<TabPanelProps> = (props) => {

    const { children, value, index, ...other } = props;
    const classes = useStyles();

    return (
        <Typography
            className={classes.box}
            component="div"
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            <Box p={3}>{children}</Box>
        </Typography>
    );
}

export default TabPanel;