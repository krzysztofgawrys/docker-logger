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
            return data.push(<ListItem
                key={item.id}
                containerElement={<Link to={`/dockers/${i}/${item.id}`} />}
                primaryText={parseName(item.name)}
                leftIcon={getIcon(item.state)}
            />);
        });
    }

    return data;
};

const LeftDrawer = (props) => {
    const {navDrawerOpen, name} = props;

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
                        key="0"
                        primaryText="Dashboard"
                        leftIcon={<DashboardIcon />}
                        containerElement={<Link to="/" />}
                    />
                    {props.menus.map((menu, index) =>
                        (<ListItem
                            initiallyOpen
                            primaryTogglesNestedList
                            key={index}
                            primaryText={menu.name}
                            leftIcon={<Device />}
                            nestedItems={sumMenu(menu, index)}
                        />))}
                </List>
            </div>
        </Drawer>
    );
};

LeftDrawer.propTypes = {
    navDrawerOpen: PropTypes.bool.isRequired,
    menus: PropTypes.array.isRequired,
    name: PropTypes.string.isRequired
};

export default LeftDrawer;
