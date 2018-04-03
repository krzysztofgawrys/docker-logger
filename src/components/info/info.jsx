import React from 'react';
import {Card, CardHeader} from 'material-ui/Card';
import CloudDone from 'material-ui/svg-icons/file/cloud-done';
import CloudError from 'material-ui/svg-icons/file/cloud-off';
import Badge from 'material-ui/Badge';
import {red500, green500} from 'material-ui/styles/colors';


const Info = (props) => {
    const icon = props.list ? (<Badge badgeContent={props.list.length} primary><CloudDone color={green500} /></Badge>) :
        (<Badge badgeContent="" ><CloudError color={red500} /></Badge>);
    return (
        <Card>
            <CardHeader
                avatar={
                    icon
                }
                title={props.name}
                subtitle={props.URL}
                actAsExpander
                showExpandableButton={false}
            />

        </Card>
    );
};
export default Info;
