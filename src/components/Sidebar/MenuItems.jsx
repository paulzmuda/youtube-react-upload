
import React from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

const useStyles = makeStyles((theme) => 
  createStyles({
    listItem: {
        height: 47
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
  }),
);

export default function MenuItems(props) {
    const classes = useStyles();
    return (
        <List>
            {
              props.items.map((item, i) => {
                const current = item.current();
                let listItem = classes.listItem;
                let listItemIcon = classes.listItemIcon;
                let primaryText = classes.primaryText;
                if(current) {
                  listItem = `${listItem} ${classes.activeBackground}`;
                  listItemIcon = `${listItemIcon} ${classes.activeItem}`;
                  primaryText = `${primaryText} ${classes.activeItem}`;
                }
                return (
                  <ListItem button className={listItem} onClick={e => props.goTo(item.route)} key={1+i}>
                    <ListItemIcon className={`${listItemIcon}`}>{item.icon}</ListItemIcon>
                    <ListItemText primary={item.name} primaryTypographyProps={{variant: 'body2'}} classes={{primary: primaryText}} /> {/* https://material-ui.com/api/list-item/ */}
                  </ListItem>
                )
              })
            }
        </List>
    );
}