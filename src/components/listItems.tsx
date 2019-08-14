import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InfoIcon from '@material-ui/icons/Info';
import { Link } from 'react-router-dom';

import IconWrapper from '../components/iconWrapper';
import DockerIcon from '@iconify/icons-mdi/docker';

export const mainListItems = (
  <div>
    <Link to={'/'}>
      <ListItem button>
        <ListItemIcon>
          <IconWrapper
            icon={DockerIcon}
          />
        </ListItemIcon>
        <ListItemText primary="Dockers" />
      </ListItem>
    </Link>
    <ListItem button>
      <ListItemIcon>
        <InfoIcon />
      </ListItemIcon>
      <ListItemText primary="Info" />
    </ListItem>
  </div>
);