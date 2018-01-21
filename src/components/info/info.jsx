import React from 'react';
import {Card, Icon} from 'antd';

const {Meta} = Card;

const Info = (props) => {
    return (
        <Card
            hoverable
            style={{width: 240}}
            cover={<Icon className="fontDash" type="cloud" />}
        >
            <Meta
                title={props.name}
                description={`Dockers: ${props.list.length}`}
            />
        </Card>
    );
};
export default Info;
