import { IDockerAfterParse } from "../interfaces/docker";
import Chip from '@material-ui/core/Chip';
import Avatar from '@material-ui/core/Avatar';
import React from 'react';
import { Icon } from '@iconify/react';
import DockerIcon from '@iconify/icons-mdi/docker';
import { getColor } from '../utils/status';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import DoneIcon from '@material-ui/icons/Done';

import { withRouter, RouteComponentProps } from 'react-router-dom';

interface DockerBoxProps extends RouteComponentProps<any> {
    list: IDockerAfterParse[],
    index: number
}


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        chip: {
            margin: theme.spacing(1),
        },
    }),
);


const DockerBox: React.SFC<DockerBoxProps> = (props) => {

    const classes = useStyles();

    const handleClick = (id: string) => {
        const { index } = props;
        props.history.push(`/docker/${index}/${id}`);
    }

    const { list } = props;

    return (
        <div>
            {list &&
                list.map((docker: IDockerAfterParse) => (
                    <Chip
                        key={docker.id}
                        avatar={
                            <Avatar>
                                <Icon icon={DockerIcon} />
                            </Avatar>
                        }
                        label={docker.name}
                        clickable={true}
                        className={classes.chip}
                        color={getColor(docker.state)}
                        deleteIcon={<DoneIcon />}
                        onClick={() => handleClick(docker.id)}
                    />
                ))
            }
        </div>
    )
};

export default withRouter(DockerBox);