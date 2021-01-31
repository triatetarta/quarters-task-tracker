import React, { useContext } from 'react';
import {
  List as MUIList,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  ListItemSecondaryAction,
  IconButton,
  Slide,
} from '@material-ui/core';
import { TaskTrackerContext } from '../../../context/context';
import { Delete, Home, Work } from '@material-ui/icons';
import useStyles from './styles';

const List = () => {
  const classes = useStyles();
  const { deleteTask, tasks } = useContext(TaskTrackerContext);

  return (
    <MUIList dense={false} className={classes.list}>
      {tasks.map((task) => (
        <Slide direction='down' in mountOnEnter unmountOnExit key={task.id}>
          <ListItem>
            <ListItemAvatar>
              {task.type === 'Personal' ? (
                <Avatar className={classes.avatarPersonal}>
                  <Home />
                </Avatar>
              ) : (
                <Avatar className={classes.avatarBusiness}>
                  <Work />
                </Avatar>
              )}

              {/* <Avatar
                className={
                  task.type === 'Personal'
                    ? classes.avatarPersonal
                    : classes.avatarBusiness
                }
              >
                <Home />
              </Avatar> */}
            </ListItemAvatar>
            <ListItemText primary={task.category} secondary={`${task.date}`} />
            <ListItemSecondaryAction>
              <IconButton
                edge='end'
                aria-label='delete'
                onClick={() => deleteTask(task.id)}
              >
                <Delete />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        </Slide>
      ))}
    </MUIList>
  );
};

export default List;
