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

export {
    parser,
    parseName,
    getDockerFromList,
    getIcon,
    networkParser
};
