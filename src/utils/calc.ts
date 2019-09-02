import { IMetricCPU } from '../interfaces/docker';

export const bytesToSize = (bytes: number) => {
    const sizes = [
        'Bytes',
        'KB',
        'MB',
        'GB',
        'TB'
    ];
    if (bytes === 0) {
        return '0 Byte';
    }
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return `${Math.round(bytes / (1024 ** i))} ${sizes[i]}`;
};


export const bytesToMB = (bytes: number) => {
    const i = 2;
    return Math.round(bytes / (1024 ** i));
};

export const calculateCPUPercent = (precpuStats: IMetricCPU, cpuStats: IMetricCPU) => {
    let cpuPercent = 0.0;
    const cpuDelta = cpuStats.cpu_usage.total_usage - precpuStats.cpu_usage.total_usage;
    const systemDelta = cpuStats.system_cpu_usage - precpuStats.system_cpu_usage;

    if (systemDelta > 0.0 && cpuDelta > 0.0) {
        cpuPercent = (cpuDelta / systemDelta) * (cpuStats.cpu_usage.percpu_usage).length * 100.0;
    }
    const ret = {
        cpuPercent,
        max: systemDelta,
        value: cpuDelta * (cpuStats.cpu_usage.percpu_usage).length
    };
    return ret;
};
