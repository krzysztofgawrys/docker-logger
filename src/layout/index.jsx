import React, {Component, Fragment} from 'react';
import withWidth, {SMALL} from 'material-ui/utils/withWidth';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import LeftDrawer from '../components/view/LeftDrawer';
import Header from '../components/view/Header';
import '../style/index.scss';

class Index extends Component {
    state = {
        navDrawerOpen: this.props.width !== SMALL
    };

    handleChangeRequestNavDrawer = () => {
        this.setState({
            navDrawerOpen: !this.state.navDrawerOpen
        });
    };

    render() {
        const paddingLeftDrawerOpen = 276;
        const {servers} = this.props;
        const {navDrawerOpen} = this.state;

        const styles = {
            header: {
                paddingLeft: navDrawerOpen ? paddingLeftDrawerOpen : 0
            },
            container: {
                margin: '80px 20px 20px 15px',
                paddingLeft: navDrawerOpen && this.props.width !== SMALL ? paddingLeftDrawerOpen : 0
            }
        };

        return (
            <MuiThemeProvider>
                <Fragment>
                    <Header
                        styles={styles.header}
                        handleChangeRequestNavDrawer={this.handleChangeRequestNavDrawer}
                        title="Docker Logger"
                    />
                    <LeftDrawer
                        navDrawerOpen={navDrawerOpen}
                        menus={servers}
                        name="Menu"
                    />
                    <div style={styles.container}>
                        {this.props.children}
                    </div>
                </Fragment>
            </MuiThemeProvider>
        );
    }
}

export default withWidth()(Index);
