import { makeStyles, Theme } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
    ({
        wrapper: {
            margin : theme.spacing(2),
            display: 'flex',
            overflow: 'auto',
            flexDirection: 'column',
            boxShadow: '0 3px 5px 2px rgba(0, 0, 0, .3)'
        },
        fixedHeight: {
            height: 'auto',
            padding : theme.spacing(2),
        },
    }));

export default useStyles;