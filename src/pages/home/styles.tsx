import { makeStyles, Theme } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
    ({
        fixedHeight: {
            height: 'auto',
            padding : theme.spacing(2),
        },
        list: {
            width: '100%',
            backgroundColor: theme.palette.background.paper,
          },
    }));

export default useStyles;