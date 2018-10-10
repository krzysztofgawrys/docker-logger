import React from 'react';
import Terminal from 'terminal-in-react';
import {sendCMD} from '../../utils/commands';

const TerminalComponent = ({docker}) => {
    return (
        <div>
            <Terminal
                color='green'
                watchConsoleLogging={false}
                backgroundColor='black'
                barColor='black'
                commandPassThrough={(cmd, print) => {
                    sendCMD(cmd, docker).then((res)=>{
                        print(res);
                    });
                    // print(`-PassedThrough:${cmd}: command not found`);
                }}
                msg='You can write anything here. Example - Hello! My name is Foo and I like Bar.'
            />
        </div>
    );
};



export default TerminalComponent;
