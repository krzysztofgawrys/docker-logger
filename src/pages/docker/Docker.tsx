import React, { useEffect, useRef } from 'react';
import { RouteComponentProps } from "react-router-dom";
import { IDockerAfterParse, IMetric } from '../../interfaces/docker';
import DockerLogs from '../../components/dockerLogs';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { Typography } from '@material-ui/core';
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

    const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setValue(newValue);
    }

    useEffect(() => {
        return () => {
            props.clearMetric();
        }
    }, []);

    const { docker } = props;
    const METRIC_ID = 2;
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
                        <Terminal docker={docker} />
                    </TabPanel>
                    <TabPanel value={value} index={2}>
                        {props.metric &&
                            <Metrics docker={docker} getStatsForDocker={props.getStatsForDocker} isActive={value === METRIC_ID} metric={props.metric} />
                        }
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
                        <Tab icon={<IconWrapper icon={MetricIcon} />} label="Metrics" />

                    </Tabs>

                </>
            }
        </div>
    )
};

export default Docker;