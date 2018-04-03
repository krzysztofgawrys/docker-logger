import React from 'react';


import LinearProgress from 'material-ui/LinearProgress';

const style = {
    marginBottom: '9px'
};

const Metric = ({max, value, label}) => {
    return (
        <div>
            <LinearProgress max={max} value={value} mode="determinate" style={style} />
            <span>{label}</span>

        </div>
    );
};
export default Metric;
