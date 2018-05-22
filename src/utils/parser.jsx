import React from 'react';
import StatusIcon from 'material-ui/svg-icons/action/check-circle';
import {red500, green500} from 'material-ui/styles/colors';

const parser = (data) => {
    const ret = [];
    if (data) {
        return data.reduce((memo, item) => {
            memo.push({
                id: item.Id,
                name: item.Names.join(),
                state: item.State,
                status: item.Status,
                ports: item.Ports,
                network: item.NetworkSettings.Networks
            });
            return memo;
        }, []);
    }
    return ret;
};

const parseName = (name) => {
    return name ? name.replace('/', '')
        .replace(/_/g, ' ') : '';
};

const getDockerFromList = (servers = [], id, index = 0) => {
    let data = servers[index] ? servers[index].list.find(element => (element.id === id)) : {};
    if (servers[index]) {
        const URL = {URL: servers[index].URL};
        data = {...data, ...URL};
    }
    return data;
};

const getIcon = (state) => {
    return <StatusIcon color={(state === 'running') ? green500 : red500} />;
};

const networkParser = (network) => {
    return Object.keys(network)
        .map((element) => {
            return {
                address: network[element].IPAddress,
                gateway: network[element].Gateway
            };
        })[0] || [];
};

const bytesToSize = (bytes) => {
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    if (bytes === 0) return '0 Byte';
    const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)), 10);
    return `${Math.round(bytes / (1024 ** i), 2)} ${sizes[i]}`;
};

const calculateCPUPercent = (precpuStats, cpuStats) => {
    let cpuPercent = 0.0;
    const cpuDelta = parseFloat(cpuStats.cpu_usage.total_usage) - parseFloat(precpuStats.cpu_usage.total_usage);
    const systemDelta = parseFloat(cpuStats.system_cpu_usage) - parseFloat(precpuStats.system_cpu_usage);

    if (systemDelta > 0.0 && cpuDelta > 0.0) {
        cpuPercent = (cpuDelta / systemDelta) * (cpuStats.cpu_usage.percpu_usage).length * 100.0;
    }
    const ret = {
        max: systemDelta,
        value: cpuDelta * (cpuStats.cpu_usage.percpu_usage).length,
        cpuPercent
    };
    return ret;
};

const metricParser = (metrics) => {
    const {
        memory_stats, pids_stats, precpu_stats, cpu_stats, networks // eslint-disable-line camelcase
    } = metrics;
    const memory = {
        percUsage: parseFloat((memory_stats.usage / memory_stats.limit * 100).toFixed(2)),
        limit: memory_stats.limit,
        usage: memory_stats.usage,
        limitText: bytesToSize(memory_stats.limit),
        usingText: bytesToSize(memory_stats.usage)
    };
    const pids = pids_stats.current;

    const cpuValues = calculateCPUPercent(precpu_stats, cpu_stats);
    const cpu = {
        percUsage: parseFloat((cpuValues.cpuPercent).toFixed(2)),
        cpus: cpu_stats.online_cpus,
        total_usage: cpuValues.value,
        system_cpu: cpuValues.max
    };
    let received = 0;
    let sent = 0;
    if (networks) {
        Object.keys(networks)
            .map((inteface) => {
                received += networks[inteface].rx_bytes;
                sent += networks[inteface].tx_bytes;
                return true;
            });
    }
    const networksData = {
        received,
        sent
    };


    const metric = {
        memory,
        pids,
        cpu,
        networksData
    };
    return metric;
};

export {
    parser,
    parseName,
    getDockerFromList,
    getIcon,
    networkParser,
    bytesToSize,
    metricParser
};
