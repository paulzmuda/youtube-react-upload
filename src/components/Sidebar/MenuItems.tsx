import React from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { MenuItem } from '.';


const useStyles = makeStyles((theme) => (
  createStyles({
    listItem: {
      height: 47,
    },
    listItemIcon: {
      paddingLeft: 0,
      [theme.breakpoints.up('sm')]: {
        paddingLeft: 8,
      },
    },
    primaryText: {
      color: '#626363',
      fontSize: 14,
    },
    activeItem: {
      color: '#D90E19 !important',
    },
    activeBackground: {
      backgroundColor: 'rgba(0, 0, 0, 0.08)',
      borderLeft: '4px solid #D90E19',
      paddingLeft: 12,
    },
  })
));

interface Props {
  items: MenuItem[]
  goTo: Function
  currentPath: string
}

const MenuItems = ({
  items,
  goTo,
  currentPath,
}: Props) => {
  const classes = useStyles();
  return (
    <List>
      {
        items.map((item) => {
          const current = item.current(item.route, currentPath);
          let { listItem, listItemIcon, primaryText } = classes;

          if (current) {
            listItem = `${listItem} ${classes.activeBackground}`;
            listItemIcon = `${listItemIcon} ${classes.activeItem}`;
            primaryText = `${primaryText} ${classes.activeItem}`;
          }

          return (
            <React.Fragment key={item.route.toString()}>
              <ListItem
                button
                className={listItem}
                onClick={() => goTo(item.route)}
              >
                <ListItemIcon className={`${listItemIcon}`}>
                  <item.icon />
                </ListItemIcon>
                <ListItemText
                  primary={item.name}
                  primaryTypographyProps={{ variant: 'body2' }}
                  classes={{ primary: primaryText }}
                />
              </ListItem>
            </React.Fragment>
          );
        })
      }
    </List>
  );
};

MenuItems.displayName = 'components/Sidebar/MenuItems';

export default MenuItems;
