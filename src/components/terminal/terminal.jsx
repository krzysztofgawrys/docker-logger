import React from 'react';
import Terminal from 'terminal-in-react';
import sendCMD from '../../utils/commands';

const TerminalComponent = ({docker}) => {
    return (
        <div>
            <Terminal
                hideTopBar
                color="white"
                prompt="red"
                watchConsoleLogging={false}
                backgroundColor="#222222"
                barColor="#222222"
                commandPassThrough={(cmd, print) => {
                    sendCMD(cmd, docker).then((res) => {
                        print(res);
                    });
                    // print(`-PassedThrough:${cmd}: command not found`);
                }}
                msg="You can enter a commands"
            />
        </div>
    );
};


export default TerminalComponent;
