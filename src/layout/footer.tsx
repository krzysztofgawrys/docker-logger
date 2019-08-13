import React from 'react';
import { Typography, Link } from '@material-ui/core';

const Footer = () => {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://github.com/dmarczydlo/docker-logger">
                Docker logger v2
        </Link>{' '}
            {new Date().getFullYear()}
            {'. Built with '}
            <Link color="inherit" href="https://material-ui.com/">
                Material-UI.
        </Link>
        </Typography>
    );
}

export default Footer;