import './App.css';
import React, { useState, useEffect } from 'react';
import { Button, FormControl, Input, InputLabel } from '@material-ui/core';
import Task from './Task';
import db from './firebase';
import firebase from 'firebase';
import './Task.css';



function App() {
  // setting up a state in const tasks in a array being called by set[variable name]
  // useState([]); starts out with an empty array
  // import React and useState
  // adds to array without refreshing page. refresh clears the state of the site
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState('');
  
  // when app loads, listen to db and fetch new tasks as they get added/removed
  // useEffect runs once app loads....study this
  useEffect(() => {
  // this code here starts when App.js loads
  // 1:46 video
    db.collection('tasks').orderBy('timestamp', 'desc').onSnapshot(snapshot => {
      setTasks(snapshot.docs.map(doc => ({id: doc.id, tasks: doc.data().tasks})))
    })
  }, []);
  
  // function for the button when you click it
  // ... spread attribute - research this. spreading contents from the array above ex: 
  // shopping, clean room, etc and append the new 'input' at the end of it.
  // ...tasks previously already exists then the input is what you type in you and is pushed at the end of the ...tasks
  const addTask = (event) => {
    event.preventDefault();   // stops the REFRESHING problem when you submit/add tasks

    // adds input into firebase db as you type
    db.collection('tasks').add({
      tasks: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp() // each item pushed in db uses firebase timestamp
    });

    setTasks([...tasks, input]);
    setInput(''); // clears input every time we submit
  }


  // added <form> so that we can press enter to add tasks. also add a type="submit" to the button so it knows
  // disabled={!input} makes it so cannot add an empty task 
  // added formcontrol which puts text 'write a task' inside the input field
  return (
    <div className="App">
      <h1>Chores For The Day</h1>
      
      <form>
        <FormControl>
          <InputLabel>Write a Task</InputLabel>
          <Input value={input} onChange={event => setInput(event.target.value)}/>
        </FormControl>
        <Button disabled={!input} type="submit" onClick={addTask} color="primary" variant="contained">Add Task</Button>
      </form>

      
        <div >
          <ul className='center'>
          {tasks.map(tasks => (  // tasks.map loops thru tasks array. task is each item in array. arrow => parenthesis to return each {task}
            <Task tasks={tasks}/> // calls the Task.js component
          //<li>{tasks}</li> 
        ))}
          </ul>
        </div>
      
    </div>
    
  );
}

export default App;
