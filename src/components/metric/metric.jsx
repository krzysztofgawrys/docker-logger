import React from 'react';


import LinearProgress from 'material-ui/LinearProgress';

const Metric = ({metric}) => {
    if (metric.memory) {
        return (
            <div>
                <div className="memory">
                    <LinearProgress max={metric.memory.limit} value={metric.memory.usage} mode="determinate" />
                    <span>Memory usage: {metric.memory.usingText}/{metric.memory.limitText}</span>
                </div>
                <div className="cpu">
                    <LinearProgress max={metric.cpu.system_cpu} value={metric.cpu.total_usage} mode="determinate" />
                    <span>CPU usage: {metric.cpu.percUsage}%</span>
                </div>
                PIDS
                NETWORK
            </div>
        );
    }
    return null;
};
export default Metric;
