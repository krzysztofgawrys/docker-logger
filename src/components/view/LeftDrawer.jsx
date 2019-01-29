import React from 'react';
import PropTypes from 'prop-types';
import Drawer from 'material-ui/Drawer';
import {Link} from 'react-router-dom';
import {spacing, typography} from 'material-ui/styles';
import {blue600} from 'material-ui/styles/colors';
import Device from 'material-ui/svg-icons/action/important-devices';
import DashboardIcon from 'material-ui/svg-icons/action/dashboard';
import {List, ListItem} from 'material-ui/List';
import {getIcon, parseName} from '../../utils/parser';


const sumMenu = (elements, i) => {
    const data = [];
    if (elements.list) {
        elements.list.map((item) => {
            return data.push(
                <ListItem
                    containerElement={<Link to={`/dockers/${i}/${item.id}`} />}
                    key={item.id}
                    leftIcon={getIcon(item.state)}
                    primaryText={parseName(item.name)}
                />
            );
        });
    }

    return data;
};

const LeftDrawer = ({menus, navDrawerOpen, name}) => {

    const styles = {
        logo: {
            cursor: 'pointer',
            fontSize: 22,
            color: typography.textFullWhite,
            lineHeight: `${spacing.desktopKeylineIncrement}px`,
            fontWeight: typography.fontWeightLight,
            backgroundColor: blue600,
            paddingLeft: 40,
            height: 56
        }

    };

    return (
        <Drawer
            docked
            open={navDrawerOpen}
        >
            <div style={styles.logo}>
                {name}
            </div>
            <div>
                <List>
                    <ListItem
                        containerElement={<Link to="/" />}
                        key="0"
                        leftIcon={<DashboardIcon />}
                        primaryText="Dashboard"
                    />
                    {menus.map((menu, index) => (
                        <ListItem
                            initiallyOpen
                            key={menu.name}
                            leftIcon={<Device />}
                            nestedItems={sumMenu(menu, index)}
                            primaryText={menu.name}
                            primaryTogglesNestedList
                        />
                    ))}
                </List>
            </div>
        </Drawer>
    );
};

LeftDrawer.propTypes = {
    menus: PropTypes.array.isRequired,
    name: PropTypes.string.isRequired,
    navDrawerOpen: PropTypes.bool.isRequired
};

export default LeftDrawer;
