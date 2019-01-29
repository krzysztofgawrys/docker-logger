import React, { Component, Fragment } from 'react';
import withWidth, { SMALL } from 'material-ui/utils/withWidth';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import LeftDrawer from '../components/view/LeftDrawer';
import Header from '../components/view/Header';
import PropTypes from 'prop-types';
import '../style/index.scss';

class Index extends Component {
    // eslint-disable-next-line react/destructuring-assignment
    state = { navDrawerOpen: this.props.width !== SMALL };

    onhandleChangeRequestNavDrawer = () => {
        const { navDrawerOpen } = this.state;
        this.setState({ navDrawerOpen: !navDrawerOpen });
    };

    render() {
        const paddingLeftDrawerOpen = 276;
        const { servers, width, children } = this.props;
        const { navDrawerOpen } = this.state;

        const styles = {
            header: { paddingLeft: navDrawerOpen ? paddingLeftDrawerOpen : 0 },
            container: {
                margin: '80px 20px 20px 15px',
                paddingLeft: navDrawerOpen && width !== SMALL ? paddingLeftDrawerOpen : 0
            }
        };

        return (
            <MuiThemeProvider>
                <Fragment>
                    <Header
                        handleChangeRequestNavDrawer={this.onhandleChangeRequestNavDrawer}
                        styles={styles.header}
                        title="Docker Logger"
                    />
                    <LeftDrawer
                        menus={servers}
                        name="Menu"
                        navDrawerOpen={navDrawerOpen}
                    />
                    <div style={styles.container}>
                        {children}
                    </div>
                </Fragment>
            </MuiThemeProvider>
        );
    }
}

Index.propTypes = {
    children: PropTypes.node.isRequired,
    servers: PropTypes.array.isRequired,
    width: PropTypes.number.isRequired
};

export default withWidth()(Index);
