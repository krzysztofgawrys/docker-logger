import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Layout, Menu, Icon} from 'antd';
import 'antd/dist/antd.css';
import '../style/index.scss';
import Footer from './footer';
import {getIcon, parseName} from '../utils/parser';

const {Content, Sider} = Layout;
const {SubMenu} = Menu;

export default class index extends Component {
    state = {
        collapsed: false
    };
    onCollapse = (collapsed) => {
        this.setState({collapsed});
    };

    render() {
        const {servers} = this.props;
        return (
            <Layout style={{minHeight: '100vh'}}>
                <Sider
                    collapsible
                    collapsed={this.state.collapsed}
                    onCollapse={this.onCollapse}
                >
                    <div className="logo" />

                    <Menu theme="dark" defaultSelectedKeys={['1']}>
                        <Menu.Item key="home">
                            <Link to="/">
                                <Icon type="home" />
                                <span>Home</span>
                            </Link>
                        </Menu.Item>
                        {servers && servers.map((server, i) => {
                            return (
                                <SubMenu
                                    key={i.toString()}
                                    title={<span><Icon type="database" /><span>{server.name}</span></span>}
                                >
                                    {server.list && server.list.map(item => (
                                        <Menu.Item key={item.id}>
                                            <Link to={`/dockers/${i}/${item.id}`}>
                                                <span>{getIcon(item.state)}{parseName(item.name)}</span>
                                            </Link>
                                        </Menu.Item>
                                    ))}
                                </SubMenu>
                            );
                        })}
                    </Menu>
                </Sider>
                <Layout>
                    <Content style={{margin: '0 16px'}}>

                        <div style={{
                            padding: 24,
                            background: '#fff',
                            minHeight: 360
                        }}
                        >
                            {this.props.children}
                        </div>
                    </Content>
                    <Footer />
                </Layout>
            </Layout>
        );
    }
}
