import React from 'react';
import Terminal from 'terminal-in-react';
import sendCMD from '../../utils/commands';
import PropTypes from 'prop-types';

const TerminalComponent = ({docker}) => {
    return (
        <div>
            <Terminal
                backgroundColor="#222222"
                barColor="#222222"
                color="white"
                commandPassThrough={(cmd, print) => {
                    sendCMD(cmd, docker).then((res) => {
                        print(res);
                    });
                    // Print(`-PassedThrough:${cmd}: command not found`);
                }}
                hideTopBar
                msg="You can enter a commands"
                prompt="red"
                watchConsoleLogging={false}
            />
        </div>
    );
};

TerminalComponent.propTypes = {docker: PropTypes.object.isRequired};
export default TerminalComponent;
