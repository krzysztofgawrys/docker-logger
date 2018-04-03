import React, {Component} from 'react';
import {Card, CardActions, CardHeader, CardTitle, CardText} from 'material-ui/Card';
import {LazyStream, ScrollFollow} from 'react-lazylog/lib/LazyLog.es5';
import FlatButton from 'material-ui/FlatButton';
import {Row, Col} from 'react-grid-system';
import {List, ListItem} from 'material-ui/List';
import CloudDone from 'material-ui/svg-icons/file/cloud-done';
import {green500} from 'material-ui/styles/colors';
import NetworkIcon from 'material-ui/svg-icons/notification/network-check';
import MemoryIcon from 'material-ui/svg-icons/hardware/memory';
import PidsIcon from 'material-ui/svg-icons/editor/insert-chart';

import {parseName, networkParser, bytesToSize} from '../../utils/parser';
import Metric from '../metric';

const logsOutput = (id, URL) => {
    let ret = null;
    if (id) {
        ret = (
            <Card>
                <CardTitle title="Logs from container" />
                <div className="logsSpace">
                    <ScrollFollow startFollowing>
                        {({follow, onScroll}) => (
                            <LazyStream url={URL} follow={follow} onScroll={onScroll} />
                        )}
                    </ScrollFollow>
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
                <ListItem leftIcon={<MemoryIcon />} >
                    <Metric max={metric.memory.limit} value={metric.memory.usage} label={`Memory usage: ${metric.memory.usingText}/${metric.memory.limitText}`} />
                </ListItem>
                <ListItem leftIcon={<MemoryIcon />}>
                    <Metric max={metric.cpu.system_cpu} value={metric.cpu.total_usage} label={`CPU usage: ${metric.cpu.percUsage}%`} />
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
    componentWillReceiveProps(nextProps) {
        if (nextProps.docker.URL) {
            const URL = `${nextProps.docker.URL}/containers/${nextProps.docker.id}/stats?stream=false`;
            this.props.getStatsForDocker(URL);
        }
    }

    render() {
        const {docker, metric} = this.props;
        const network = docker.network ? networkParser(docker.network) : null;
        const URL = `${docker.URL}/containers/${docker.id}/logs?stderr=1&stdout=1&timestamps=1&follow=1&tail=100`;

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
                    <div className="logs">
                        {logsOutput(docker.id, URL)}
                    </div>
                </div>
            </div>
        );
    }
}

export default DockerComponent;
