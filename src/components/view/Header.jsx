import React from 'react';
import PropTypes from 'prop-types';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import Menu from 'material-ui/svg-icons/navigation/menu';
import {white, blue600} from 'material-ui/styles/colors';

class Header extends React.Component {
    render() {
        const {styles, handleChangeRequestNavDrawer, title} = this.props;

        const style = {
            appBar: {
                position: 'fixed',
                top: 0,
                overflow: 'hidden',
                maxHeight: 57,
                backgroundColor: blue600
            },
            menuButton: {marginLeft: 40}
        };

        return (
            <div>
                <AppBar
                    iconElementLeft={
                        <IconButton
                            onClick={handleChangeRequestNavDrawer}
                            // eslint-disable-next-line react/forbid-component-props
                            style={style.menuButton}
                        >
                            <Menu color={white} />
                        </IconButton>
                    }
                    // eslint-disable-next-line react/forbid-component-props
                    style={{
                        ...styles,
                        ...style.appBar
                    }}
                    title={title}
                />
            </div>
        );
    }
}

Header.propTypes = {
    handleChangeRequestNavDrawer: PropTypes.func.isRequired,
    styles: PropTypes.object.isRequired,
    title: PropTypes.string.isRequired
};

export default Header;
