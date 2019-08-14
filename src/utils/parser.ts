import { IDocker, IDockerAfterParse, IServer } from '../interfaces/docker';

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