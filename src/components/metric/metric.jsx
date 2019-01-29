import React from 'react';
import PropTypes from 'prop-types';

import LinearProgress from 'material-ui/LinearProgress';

const style = { marginBottom: '9px' };

const Metric = ({ max, value, label }) => {
    return (
        <div>
            <LinearProgress
                max={max}
                mode="determinate"
                // eslint-disable-next-line react/forbid-component-props
                style={style}
                value={value}
            />
            <span>
                {label}
            </span>

        </div>
    );
};

Metric.propTypes = {
    label: PropTypes.string,
    max: PropTypes.number,
    value: PropTypes.number
};

Metric.defaultProps = {
    label: '',
    max: 0,
    value: 0
};

export default Metric;
