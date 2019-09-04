import React from 'react';
import { RouteComponentProps } from "react-router-dom";
import { IDockerAfterParse, IMetric } from '../../interfaces/docker';
import DockerLogs from '../../components/dockerLogs';
import { Typography, BottomNavigation, BottomNavigationAction, AppBar } from '@material-ui/core';
import IconWrapper from '../../components/iconWrapper';
import DockerIcon from '@iconify/icons-mdi/docker';
import MetricIcon from '@iconify/icons-mdi/chart-line';

import TerminalIcon from '@iconify/icons-mdi/terminal';
import TabPanel from '../../components/tabPabel';
import Terminal from '../../components/terminal';
import Metrics from '../../components/metrics';

interface DockerProps extends RouteComponentProps<any> {
    docker?: IDockerAfterParse | undefined,
    getStatsForDocker(URL: string, dockerId: string): void,
    clearMetric(): void,
    metric: IMetric
}

const Docker: React.SFC<DockerProps> = (props: DockerProps) => {

    const [value, setValue] = React.useState(0);
    const { docker } = props;
    const METRIC_ID = 2;
    return (
        <div>
            {docker &&
                <>
                    <Typography variant="h4" component="h2" gutterBottom={true}>
                        {docker.name}
                    </Typography>
                    <TabPanel value={value} index={0}>
                        <DockerLogs docker={docker} />
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        <Terminal docker={docker} />
                    </TabPanel>
                    <TabPanel value={value} index={2}>
                        {props.metric &&
                            <Metrics docker={docker} getStatsForDocker={props.getStatsForDocker} isActive={value === METRIC_ID} metric={props.metric} />
                        }
                    </TabPanel>
                    <AppBar position="fixed" color="primary" style={{top: "auto", bottom: 0}}>
                    <BottomNavigation
                       
                        value={value}
                        onChange={(event, newValue) => {
                            setValue(newValue);
                        }}
                        showLabels
                    >
                        <BottomNavigationAction label="Logs" icon={<IconWrapper icon={DockerIcon} />} />
                        <BottomNavigationAction label="Terminal" icon={<IconWrapper icon={TerminalIcon} />} />
                        <BottomNavigationAction label="Metrics" icon={<IconWrapper icon={MetricIcon} />} />
                    </BottomNavigation>
                    </AppBar>

                </>
            }
        </div>
    )
};

export default Docker;