import React, {Component} from 'react';
import {Card, CardActions, CardHeader, CardTitle, CardText} from 'material-ui/Card';
import {LazyLog, ScrollFollow} from 'react-lazylog';
import FlatButton from 'material-ui/FlatButton';
import {Row, Col} from 'react-grid-system';
import {List, ListItem} from 'material-ui/List';
import CloudDone from 'material-ui/svg-icons/file/cloud-done';
import {green500} from 'material-ui/styles/colors';
import NetworkIcon from 'material-ui/svg-icons/notification/network-check';
import MemoryIcon from 'material-ui/svg-icons/hardware/memory';
import PidsIcon from 'material-ui/svg-icons/editor/insert-chart';
import {Tabs, Tab} from 'material-ui/Tabs';

import {parseName, networkParser, bytesToSize} from '../../utils/parser';
import Metric from '../metric';
import Terminal from '../terminal';

const logsOutput = (id, URL) => {
    let ret = null;
    if (id) {
        ret = (
            <Card>
                <CardTitle title="Logs from container" />
                <div className="logsSpace">
                    <ScrollFollow render={({follow, onScroll}) => (
                        <LazyLog selectableLines stream url={URL} follow={follow} onScroll={onScroll} />
                    )}
                    />
                </div>
            </Card>
        );
    }
    return ret;
};

const showMetric = (metric) => {
    let ret = null;
    if (metric && metric.memory) {
        ret = (
            <List>
                <ListItem leftIcon={<MemoryIcon />}>
                    <Metric
                        max={metric.memory.limit}
                        value={metric.memory.usage}
                        label={`Memory usage: ${metric.memory.usingText}/${metric.memory.limitText}`}
                    />
                </ListItem>
                <ListItem leftIcon={<MemoryIcon />}>
                    <Metric
                        max={metric.cpu.system_cpu}
                        value={metric.cpu.total_usage}
                        label={`CPU usage: ${metric.cpu.percUsage}%`}
                    />
                </ListItem>
                <ListItem leftIcon={<NetworkIcon />}>
                    <span>Network: {bytesToSize(metric.networksData.sent)}/{bytesToSize(metric.networksData.received)}</span>
                </ListItem>
                <ListItem leftIcon={<PidsIcon />}>
                    <span>PIDS: {metric.pids}</span>
                </ListItem>

            </List>
        );
    }
    return ret;
};

class DockerComponent extends Component {
    state = {
        tab: 'console'
    };

    static getDerivedStateFromProps(nextProps) {
        if (nextProps.docker.URL && nextProps.getStatsForDocker) {
            const URL = `${nextProps.docker.URL}/containers/${nextProps.docker.id}/stats?stream=false`;
            nextProps.getStatsForDocker(URL);
        }
        return null;
    }

    handleChange = (value) => {
        this.setState({
            tab: value
        });
    };

    render() {
        const {docker, metric} = this.props;
        const network = docker.network ? networkParser(docker.network) : null;
        const URL = `${docker.URL}/containers/${docker.id}/logs?stderr=1&stdout=1&timestamps=1&follow=1&tail=1000`;

        return (
            <div>

                <div className="dockerDetails">
                    <Card>
                        <CardHeader
                            actAsExpander
                            showExpandableButton
                            title={`${parseName(docker.name)} details`}
                            subtitle={`ID: ${docker.id}`}
                            avatar={<CloudDone color={green500} />}
                        />
                        <CardText expandable>
                            <Row>
                                <Col sm={6} xs={12}>
                                    <List>
                                        <ListItem
                                            leftIcon={<CloudDone />}
                                            primaryText="Status"
                                            secondaryText={docker.status}
                                        />
                                        <ListItem
                                            leftIcon={<NetworkIcon />}
                                            primaryText="Network"
                                            secondaryText={network ? network.address : ''}
                                        />
                                        <ListItem
                                            leftIcon={<NetworkIcon />}
                                            primaryText="Gateway"
                                            secondaryText={network ? network.gateway : ''}
                                        />
                                    </List>
                                </Col>
                                <Col sm={6} xs={12}>
                                    {showMetric(metric)}
                                </Col>
                            </Row>
                        </CardText>
                        <CardActions>
                            <FlatButton label="restart" primary />
                            <FlatButton label="stop" secondary />
                        </CardActions>
                    </Card>
                    <Tabs
                        value={this.state.tab}
                        onChange={this.handleChange}
                    >
                        <Tab label="Console" value="console" buttonStyle={{background: '#1e88e5'}}>
                            <div className="logs">
                                {logsOutput(docker.id, URL)}
                            </div>
                        </Tab>
                        <Tab label="Terminal" value="terminal" buttonStyle={{background: '#1e88e5'}}>
                            <Terminal docker={docker} />
                        </Tab>
                    </Tabs>
                </div>
            </div>
        );
    }
}

export default DockerComponent;
