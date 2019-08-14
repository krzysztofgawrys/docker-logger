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