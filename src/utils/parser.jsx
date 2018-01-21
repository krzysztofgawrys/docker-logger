import React from 'react';
import {Icon} from 'antd';
import config from '../../config.json';

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
        const URL = {URL: config[index].URL};
        data = {...data, ...URL};
    }
    return data;
};

const getIcon = (state) => {
    const red = {
        color: 'red'
    };
    const green = {
        color: 'green'
    };
    return (state === 'running') ? <Icon type="check-circle" style={green} /> : <Icon type="close-circle" style={red} />;
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
