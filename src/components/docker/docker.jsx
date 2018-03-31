import React from 'react';
import {Card, CardActions, CardHeader, CardTitle, CardText} from 'material-ui/Card';
import {LazyStream, ScrollFollow} from 'react-lazylog/lib/LazyLog.es5';
import FlatButton from 'material-ui/FlatButton';
import {Row, Col} from 'react-grid-system';
import {List, ListItem} from 'material-ui/List';
import CloudDone from 'material-ui/svg-icons/file/cloud-done';
import {green500} from 'material-ui/styles/colors';
import NetworkIcon from 'material-ui/svg-icons/notification/network-check';
import {parseName, networkParser} from '../../utils/parser';


const logsOutput = (id, URL) => {
    let ret = null;
    if (id) {
        ret = (
            <Card>
                <CardTitle title="Logs from container"/>
                <div className="logsSpace">
                    <ScrollFollow startFollowing>
                        {({follow, onScroll}) => (
                            <LazyStream url={URL} follow={follow} onScroll={onScroll}/>
                        )}
                    </ScrollFollow>
                </div>
            </Card>
        );
    }
    return ret;
};

const DockerComponent = (docker) => {
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
                        avatar={<CloudDone color={green500}/>}
                    />
                    <CardText expandable>
                        <Row>
                            <Col sm={6} xs={12}>
                                <List>
                                    <ListItem
                                        leftIcon={<CloudDone/>}
                                        primaryText="Status"
                                        secondaryText={docker.status}
                                    />
                                    <ListItem
                                        leftIcon={<NetworkIcon/>}
                                        primaryText="Network"
                                        secondaryText={network ? network.address : ''}
                                    />
                                    <ListItem
                                        leftIcon={<NetworkIcon/>}
                                        primaryText="Gateway"
                                        secondaryText={network ? network.gateway : ''}
                                    />
                                </List>
                            </Col>
                            <Col sm={6} xs={12}>
                                Data about docker
                            </Col>
                        </Row>
                    </CardText>
                    <CardActions>
                        <FlatButton label="restart" primary/>
                        <FlatButton label="stop" secondary/>
                    </CardActions>
                </Card>
                <div className="logs">
                    {logsOutput(docker.id, URL)}
                </div>
            </div>
        </div>
    );
};

export default DockerComponent;
