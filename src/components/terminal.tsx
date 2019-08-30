import React from 'react';
import ReactTerminal from 'terminal-in-react';
import sendCMD from '../utils/commands'
import { IDockerAfterParse } from '../interfaces/docker';
import { createStyles, makeStyles, Theme } from '@material-ui/core';


interface TerminalProps {
    docker: IDockerAfterParse
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        terminal: {
            width: '100%',
            height: '25vh'
        },
    }),
);


const Terminal: React.SFC<TerminalProps> = (props: TerminalProps) => {


    const { docker } = props;
    const classes = useStyles();

    return (
        <div className={classes.terminal}>
            <ReactTerminal
                backgroundColor="#222222"
                barColor="#222222"
                color="white"
                commandPassThrough={(cmd, print) => {
                    sendCMD(cmd, docker).then((res: string) => {
                        //@ts-ignore
                        print(res);
                    });
                }}
                hideTopBar
                msg="You can enter a commands"
                prompt="white"
                startState={'maximised'}
                watchConsoleLogging={false}
            />
        </div>
    )
};

export default Terminal;