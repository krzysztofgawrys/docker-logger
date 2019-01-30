import React, { Component } from 'react';
import {
    Card, CardActions, CardHeader, CardTitle, CardText
} from 'material-ui/Card';
import { LazyLog, ScrollFollow } from 'react-lazylog';
import FlatButton from 'material-ui/FlatButton';
import { Row, Col } from 'react-grid-system';
import { List, ListItem } from 'material-ui/List';
import CloudDone from 'material-ui/svg-icons/file/cloud-done';
import { green500 } from 'material-ui/styles/colors';
import NetworkIcon from 'material-ui/svg-icons/notification/network-check';
import MemoryIcon from 'material-ui/svg-icons/hardware/memory';
import PidsIcon from 'material-ui/svg-icons/editor/insert-chart';
import { Tabs, Tab } from 'material-ui/Tabs';
import { parseName, networkParser, bytesToSize } from '../../utils/parser';
import Metric from '../metric';
import Terminal from '../terminal';
import PropTypes from 'prop-types';

const logsOutput = (id, URL, onClick) => {
    let ret = null;
    if (id) {
        ret = (
            <Card>
                <CardTitle title="Logs from container" />
                <div className="logsSpace">
                    <FlatButton
                        label="Download logs"
                        onClick={() => onClick(URL)}
                        secondary
                    />
                    <ScrollFollow render={({ follow, onScroll }) => (
                        <LazyLog
                            follow={follow}
                            onScroll={onScroll}
                            selectableLines
                            stream
                            url={`${URL}&follow=1&tail=1000`}
                        />
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
                        label={`Memory usage: ${metric.memory.usingText}/${metric.memory.limitText}`}
                        max={metric.memory.limit}
                        value={metric.memory.usage}
                    />
                </ListItem>
                <ListItem leftIcon={<MemoryIcon />}>
                    <Metric
                        label={`CPU usage: ${metric.cpu.percUsage}%`}
                        max={metric.cpu.system_cpu}
                        value={metric.cpu.total_usage}
                    />
                </ListItem>
                <ListItem leftIcon={<NetworkIcon />}>
                    <span>
                        {`Network: ${bytesToSize(metric.networksData.sent)}/${bytesToSize(metric.networksData.received)}`}
                    </span>
                </ListItem>
                <ListItem leftIcon={<PidsIcon />}>
                    <span>
                        {`PIDS: ${metric.pids}`}
                    </span>
                </ListItem>

            </List>
        );
    }
    return ret;
};

class DockerComponent extends Component {
    state = { tab: 'console' };

    static getDerivedStateFromProps(nextProps) {
        if (nextProps.docker.URL && nextProps.getStatsForDocker) {
            const URL = `${nextProps.docker.URL}/containers/${nextProps.docker.id}/stats?stream=false`;
            nextProps.getStatsForDocker(URL);
        }
        return null;
    }

    handleChange = (value) => {
        this.setState({ tab: value });
    };

    onClickDownloads = (URL) => {
        window.open(URL, '_blank');
    }

    render() {
        const { docker, metric } = this.props;
        const network = docker.network ? networkParser(docker.network) : null;
        const URL = `${docker.URL}/containers/${docker.id}/logs?stderr=1&stdout=1&timestamps=1`;

        const { tab } = this.state;
        return (
            <div>

                <div className="dockerDetails">
                    <Card>
                        <CardHeader
                            actAsExpander
                            avatar={<CloudDone color={green500} />}
                            showExpandableButton
                            subtitle={`ID: ${docker.id}`}
                            title={`${parseName(docker.name)} details`}
                        />
                        <CardText expandable>
                            <Row>
                                <Col
                                    sm={6}
                                    xs={12}
                                >
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
                                <Col
                                    sm={6}
                                    xs={12}
                                >
                                    {showMetric(metric)}
                                </Col>
                            </Row>
                        </CardText>
                        <CardActions>
                            <FlatButton
                                label="restart"
                                primary
                            />
                            <FlatButton
                                label="stop"
                                secondary
                            />
                        </CardActions>
                    </Card>
                    <Tabs
                        onChange={this.handleChange}
                        value={tab}
                    >
                        <Tab
                            buttonStyle={{ background: '#1e88e5' }}
                            label="Console"
                            value="console"
                        >
                            <div className="logs">
                                {logsOutput(docker.id, URL, this.onClickDownloads)}
                            </div>
                        </Tab>
                        <Tab
                            buttonStyle={{ background: '#1e88e5' }}
                            label="Terminal"
                            value="terminal"
                        >
                            <Terminal docker={docker} />
                        </Tab>
                    </Tabs>
                </div>
            </div>
        );
    }
}


DockerComponent.propTypes = {
    docker: PropTypes.object.isRequired,
    metric: PropTypes.object
};

DockerComponent.defaultProps = { metric: {} };

export default DockerComponent;
