import { makeStyles, Theme } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
    ({
        paper: {
            padding: theme.spacing(2),
            display: 'flex',
            overflow: 'auto',
            flexDirection: 'column',
        },
        fixedHeight: {
            height: 'auto',
        },
    }));

export default useStyles;