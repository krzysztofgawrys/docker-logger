import React from 'react';
import { Card, CardHeader } from 'material-ui/Card';
import CloudDone from 'material-ui/svg-icons/file/cloud-done';
import CloudError from 'material-ui/svg-icons/file/cloud-off';
import Badge from 'material-ui/Badge';
import { red500, green500 } from 'material-ui/styles/colors';
import PropTypes from 'prop-types';


const Info = ({ URL, list = [], name }) => {

    const green = (
        <Badge
            badgeContent={list.length}
            primary
        >
            <CloudDone color={green500} />
        </Badge>
    );

    const red = (
        <Badge badgeContent="" >
            <CloudError color={red500} />
        </Badge>
    );


    const icon = list.length ? green : red;

    return (
        <Card>
            <CardHeader
                actAsExpander
                avatar={icon}
                showExpandableButton={false}
                subtitle={URL}
                title={name}
            />

        </Card>
    );
};

Info.propTypes = {
    URL: PropTypes.string,
    list: PropTypes.array,
    name: PropTypes.string
};

Info.defaultProps = {
    URL: '',
    list: [],
    name: ''
};

export default Info;
