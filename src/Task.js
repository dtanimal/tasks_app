import { React, useState } from 'react';
import { ListItem, List, ListItemText, Modal, makeStyles, Button } from '@material-ui/core';
import './Task.css';
import db from './firebase';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import EditIcon from '@material-ui/icons/Edit';

const useStyles = makeStyles((theme) => ({
    paper: {
      position: 'absolute',
      width: 320,
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
 
    },
  }));
  
// break up code into components with props
// button added for deleting from db
function Task(props) {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [input, setInput] = useState('');
    
    const updateTask = () => {
        // update the task with new input text.
        db.collection('tasks').doc(props.tasks.id).set({
            tasks: input
        }, {merge: true}); // accessing db, merge to update
        setOpen(false);
    }

    return (
        <>
        <List>
            <ListItem>
                <ListItemText primary={props.tasks.tasks}/>
            </ListItem>
            <EditIcon onClick={e => setOpen(true)}>Edit</EditIcon>
            <DeleteForeverIcon onClick={event => db.collection('tasks').doc(props.tasks.id).delete()}/>
        </List>

        <Modal
        open={open}
        onClose={e => setOpen(false)}
    >
        <form>
            <div className={classes.paper}>
                <h1>Update Chore Below</h1>
                <input placeholder={props.tasks.tasks} value={input} onChange={event => setInput(event.target.value)}/>
                <Button type='submit' onClick={updateTask}>Update</Button>
            </div>
        </form>
        </Modal>
        </>
        
    )
    
}


export default Task;
