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

const metricParser = (metrics) => {
    const {
        memory_stats, pids_stats, precpu_stats, networks
    } = metrics;
    const memory = {
        percUsage: parseFloat((memory_stats.usage / memory_stats.limit * 100).toFixed(2)),
        limit: memory_stats.limit,
        usage: memory_stats.usage,
        limitText: bytesToSize(memory_stats.limit),
        usingText: bytesToSize(memory_stats.usage)
    };
    const pids = pids_stats.current;

    const cpu = {
        percUsage: parseFloat((precpu_stats.cpu_usage.total_usage / precpu_stats.system_cpu_usage * 100).toFixed(2)),
        cpus: precpu_stats.online_cpus,
        total_usage: precpu_stats.cpu_usage.total_usage,
        system_cpu: precpu_stats.system_cpu_usage
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

    // console.log(metric);

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
