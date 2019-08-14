import React from 'react';
import { RouteComponentProps } from "react-router-dom";
import { IDockerAfterParse } from '../../interfaces/docker';
import DockerLogs from '../../components/dockerLogs';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { Typography, makeStyles, Box } from '@material-ui/core';
import IconWrapper from '../../components/iconWrapper';
import DockerIcon from '@iconify/icons-mdi/docker';
import TerminalIcon from '@iconify/icons-mdi/terminal';
import TabPanel from '../../components/tabPabel';


interface DockerProps extends RouteComponentProps<any> {
    docker?: IDockerAfterParse | undefined
}

const Docker: React.SFC<DockerProps> = (props: DockerProps) => {

    const [value, setValue] = React.useState(0);

    function handleChange(event: React.ChangeEvent<{}>, newValue: number) {
        setValue(newValue);
    }

    const { docker } = props;
    return (
        <div>
            {docker &&
                <>
                    <Typography variant="h3" component="h2" gutterBottom>
                        {docker.name}
                    </Typography>
                    <TabPanel value={value} index={0}>
                        <DockerLogs docker={docker} />
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        Item Two
                    </TabPanel>
                    <TabPanel value={value} index={2}>
                        Item Three
                    </TabPanel>

                    <Tabs
                        value={value}
                        onChange={handleChange}
                        variant="fullWidth"
                        indicatorColor="primary"
                        textColor="primary"
                        aria-label="icon label tabs example"
                    >
                        <Tab icon={<IconWrapper icon={DockerIcon} />} label="Logs" />
                        <Tab icon={<IconWrapper icon={TerminalIcon} />} label="Terminal" />
                    </Tabs>

                </>
            }
        </div>
    )
};

export default Docker;