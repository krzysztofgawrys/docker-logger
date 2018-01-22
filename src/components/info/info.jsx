import React from 'react';
import {Card, Icon} from 'antd';

const {Meta} = Card;

const Info = (props) => {
    const extra = props.error ? 'error' : '';
    return (
        <Card
            hoverable
            style={{width: 240}}
            cover={<Icon className={`fontDash ${extra}`} type="cloud" />}
            className="infoSpace"
        >
            <Meta
                title={props.name}
                description={props.list ? `Dockers: ${props.list.length}` : ''}
            />
            <p>{props.URL}</p>
        </Card>
    );
};
export default Info;
