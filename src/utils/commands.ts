import axios from 'axios/index';
import { IDockerAfterParse } from '../interfaces/docker';

const sendCMD = async (command: string, docker: IDockerAfterParse) => {
    const URL_EXEC = `${docker.URL}/containers/${docker.id}/exec`;
    const data =
    {
        AttachStdin: false,
        AttachStdout: true,
        AttachStderr: true,
        Tty: false,
        Cmd: command,
        Env: [
            'FOO=bar',
            'BAZ=quux'
        ]
    };
    const res = await axios.post(URL_EXEC, data);
    const { Id } = res.data;
    if (Id) {
        const URL_START = `${docker.URL}/exec/${Id}/start`;
        const output = await axios.post(URL_START, {
            Detach: false,
            Tty: false
        });
        return output.data.replace(//g, ''); // eslint-disable-line no-control-regex
    }
    return null;
};

export default sendCMD;