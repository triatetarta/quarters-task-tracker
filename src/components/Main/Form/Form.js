import React, { useState, useEffect, useContext } from 'react';
import { v4 as uuidv4 } from 'uuid';
import {
  TextField,
  Typography,
  Grid,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@material-ui/core';
import useStyles from './styles';
import formatDate from '../../../utils/formatDate';
import { TaskTrackerContext } from '../../../context/context';
import {
  personalCategories,
  workCategories,
} from '../../../constants/categories';
import { useSpeechContext } from '@speechly/react-client';
import CustomizedSnackbar from '../../Snackbar/Snackbar';

const initialState = {
  category: '',
  type: 'Personal',
  date: formatDate(new Date()),
};

const Form = () => {
  const classes = useStyles();
  const [formData, setFormData] = useState(initialState);
  const { addTask } = useContext(TaskTrackerContext);
  const { segment } = useSpeechContext();
  const [open, setOpen] = useState(false);

  const createTask = () => {
    if (!formData.date.includes('-')) return;
    const task = { ...formData, id: uuidv4() };
    setOpen(true);
    addTask(task);
    setFormData(initialState);
  };

  useEffect(() => {
    if (segment) {
      if (segment.intent.intent === 'add_personal') {
        setFormData({ ...formData, type: 'Personal' });
      } else if (segment.intent.intent === 'add_work') {
        setFormData({ ...formData, type: 'Work' });
      } else if (segment.isFinal && segment.intent.intent === 'create_task') {
        return createTask();
      } else if (segment.isFinal && segment.intent.intent === 'cancel_task') {
        return setFormData(initialState);
      }

      segment.entities.forEach((entity) => {
        const category = `${entity.value.charAt(0)}${entity.value
          .slice(1)
          .toLowerCase()}`;
        switch (entity.type) {
          case 'category':
            if (personalCategories.map((pC) => pC.type).includes(category)) {
              setFormData({ ...formData, type: 'Personal', category });
            } else if (workCategories.map((wC) => wC.type).includes(category)) {
              setFormData({ ...formData, type: 'Work', category });
            }
            break;
          case 'date':
            setFormData({ ...formData, date: entity.value });
            break;
          default:
            break;
        }
      });

      if (
        segment.isFinal &&
        formData.category &&
        formData.type &&
        formData.date
      ) {
        createTask();
      }
    }
  }, [segment]);

  const selectedCategories =
    formData.type === 'Personal' ? personalCategories : workCategories;

  return (
    <Grid container spacing={2}>
      <CustomizedSnackbar open={open} setOpen={setOpen} />
      <Grid item xs={12}>
        <Typography align='center' variant='subtitle2' gutterBottom>
          {segment && segment.words.map((word) => word.value).join(' ')}
        </Typography>
      </Grid>
      <Grid item xs={6}>
        <FormControl fullWidth>
          <InputLabel>Type</InputLabel>
          <Select
            value={formData.type}
            onChange={(e) => setFormData({ ...formData, type: e.target.value })}
          >
            <MenuItem value='Personal'>Personal</MenuItem>
            <MenuItem value='Work'>Work</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={6}>
        <FormControl fullWidth>
          <InputLabel>Category</InputLabel>
          <Select
            value={formData.category}
            onChange={(e) =>
              setFormData({ ...formData, category: e.target.value })
            }
          >
            {selectedCategories.map((category) => (
              <MenuItem key={category.type} value={category.type}>
                {category.type}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12}>
        <TextField
          type='date'
          label='Date'
          fullWidth
          value={formData.date}
          onChange={(e) =>
            setFormData({ ...formData, date: formatDate(e.target.value) })
          }
        />
      </Grid>
      <Button
        onClick={createTask}
        className={classes.button}
        variant='outlined'
        color='primary'
        fullWidth
      >
        Add Task
      </Button>
    </Grid>
  );
};

export default Form;
