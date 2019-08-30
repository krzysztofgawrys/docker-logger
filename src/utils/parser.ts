import { IDocker, IDockerAfterParse, IServer, IMetricFromDocker } from '../interfaces/docker';
import { calculateCPUPercent, bytesToSize } from './calc';

export const parser = (data: IDocker[], URL: string) => {
    const ret: IDockerAfterParse[] = [];
    if (data) {
        return data.reduce((memo: IDockerAfterParse[], item: IDocker) => {
            memo.push({
                id: item.Id,
                name: (item.Names.join()).substring(1),
                state: item.State,
                status: item.Status,
                ports: item.Ports,
                network: item.NetworkSettings.Networks,
                URL
            });
            return memo;
        }, []);
    }
    return ret;
};

export const getDockerFromList = (servers: IServer[] = [], dockerId: string, index = 0): IDockerAfterParse | undefined =>
    (servers[index] && servers[index].list)
        ? servers[index].list.find((element: IDockerAfterParse) => (element.id === dockerId))
        : undefined;

export const metricParser = (metrics: IMetricFromDocker) => {
    const {
        memory_stats, pids_stats, precpu_stats, cpu_stats, networks
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
        Object.keys(networks).
            map((inteface) => {
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