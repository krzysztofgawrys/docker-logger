import React, { useEffect, useRef } from 'react';
import { IDockerAfterParse, IMetric } from '../interfaces/docker';

import {
    AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';

import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import Grid from '@material-ui/core/Grid';
import { createStyles, makeStyles, Theme, Typography } from '@material-ui/core';



interface MetricProps {
    docker: IDockerAfterParse,
    isActive: boolean,
    getStatsForDocker(URL: string, dockerId: string): void,
    metric: IMetric
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        circleChart: {
            maxHeight: 200,
        },
        header: {
            textAlign: 'center'
        }
    }),
);

const useInterval = (callback: any, delay: number) => {
    const savedCallback = useRef();

    useEffect(() => {
        savedCallback.current = callback;
    });

    useEffect(() => {
        function tick() {
            //@ts-ignore
            savedCallback.current();
        }

        const id = setInterval(tick, delay);
        return () => clearInterval(id);
    }, [delay]);
}

const Metric: React.SFC<MetricProps> = (props: MetricProps) => {

    const renderColorfulLegendText = (value: number, entry: any) => {
        const { color } = entry;

        return <span style={{ color }}>{value} data (MB)</span>;
    }

    useInterval(() => {
        if (props.isActive && props.docker && props.docker.URL) {
            const URL = `${props.docker.URL}/containers/${props.docker.id}/stats?stream=false`;
            props.getStatsForDocker(URL, props.docker.id);
        }
    }, 2000);

    const classes = useStyles();


    return (
        <Grid container spacing={3}>
            <Grid item lg={4} md={4} xs={12}>
                <Typography className={classes.header} variant="h4" gutterBottom>
                    Network
                </Typography>
                <AreaChart
                    width={500}
                    height={200}
                    data={props.metric.networksData}
                    margin={{
                        top: 10, right: 30, left: 0, bottom: 0,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis />
                    <YAxis type="number" domain={[0, 'dataMax + 10']} />
                    <Tooltip />
                    <Legend formatter={renderColorfulLegendText} verticalAlign="top" height={36} />
                    <Area type="monotone" dataKey="received" stroke="#8884d8" fill="#8884d8" />
                    <Area type="monotone" dataKey="sent" stroke="#82ca9d" fill="#82ca9d" />
                </AreaChart>
            </Grid>
            <Grid item lg={4} md={4} xs={12}>
                <Typography className={classes.header} variant="h4" gutterBottom>
                    Processor
                </Typography>
                <CircularProgressbar
                    className={classes.circleChart}
                    value={props.metric.cpu[props.metric.cpu.length - 1].percUsage}
                    text={`${props.metric.cpu[props.metric.cpu.length - 1].percUsage} %`}
                    styles={buildStyles({
                        strokeLinecap: 'butt',
                    })}
                />
            </Grid>

            <Grid item lg={4} md={4} xs={12}>
                <Typography className={classes.header} variant="h4" gutterBottom>
                    Memory
                </Typography>
                <CircularProgressbar
                    className={classes.circleChart}
                    value={props.metric.memory[props.metric.memory.length - 1].percUsage}
                    text={`${props.metric.memory[props.metric.memory.length - 1].percUsage} %`}
                    styles={buildStyles({
                        strokeLinecap: 'butt',
                    })}
                />
            </Grid>
        </Grid>
    )
}

export default Metric;