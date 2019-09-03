export interface IPorts {
    PrivatePort: number,
    PublicPort?: number,
    Type: string
}

interface INetwork {
    Networks: {
        docker_default: {
            Aliases?: string,
            DriverOpts?: string,
            EndpointID: string,
            Gateway: string,
            MacAddress: string,
            NetworkID: string
        }
    }
}

export interface IDocker {
    Id: string,
    Names: string[],
    Command: string,
    Created: number,
    Image: string,
    ImageID: string,
    NetworkSettings: INetwork,
    Ports: IPorts[],
    State: string,
    Status: string
}

export interface IDockerAfterParse {
    id: string,
    name: string,
    state: string,
    status: string,
    ports: IPorts[],
    network: object,
    URL?: string
}

export interface IServer {
    name: string,
    URL: string,
    list: IDockerAfterParse[]
}

interface IMetricMemory {
    limit: number,
    max_usage: number,
    usage: number
}

export interface IMetricCPU {
    online_cpus: number,
    system_cpu_usage: number,
    cpu_usage: ICPUUsage
}

export interface ICPUUsage {
    total_usage: number,
    usage_in_kernelmode: number
    usage_in_usermode: number
    percpu_usage: number[]
}

interface IMetricNetwork {
    rx_bytes: number,
    rx_dropped: number,
    rx_errors: number,
    rx_packets: number,
    tx_bytes: number,
    tx_dropped: number,
    tx_errors: number,
    tx_packets: number
}

export interface IMetricFromDocker {
    blkio_stats: object,
    cpu_stats: IMetricCPU,
    memory_stats: IMetricMemory,
    networks: {
        [networkInterface: string]: IMetricNetwork
    },
    pids_stats: {
        current: number
    },
    precpu_stats: IMetricCPU,

}


export interface ICPUMetric {
    cpus: number,
    percUsage: number,
    system_cpu: number,
    total_usage: number
}

export interface IMemoryMetric {
    limit: number,
    limitText: string,
    percUsage: number,
    usage: number,
    usingText: string
}

export interface INetworkMetric {
    received: number,
    sent: number
}

export interface IMetric {
    cpu: ICPUMetric[],
    memory: IMemoryMetric[],
    networksData: INetworkMetric[],
    pids: number[]

}


export interface IMetricForDocker {
    [dockerId: string]: IMetric
}
