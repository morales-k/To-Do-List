import React, {useEffect, useState} from 'react'
import Task from './Task';

function List() {
  const [newTask, setNewTask] = useState('');
  const [allTasks, setTasks] = useState([]);

  useEffect(() => {
    if (allTasks.length === 0) {
      fetch('https://jsonplaceholder.typicode.com/todos/')
      .then(response => response.json())
      .then(json => {
        setTasks(json.slice(0, 10));
      });
    }
  }, []);

  function getTask(e) {
    const value = e.currentTarget.value.trim(); // Trim whitespace.
    
    if (value !== "") {
      setNewTask(value);
    }
  }

  // Mark task as complete when checked.
  function updateTask(e, taskID) {
    const updatedTasks = allTasks;

    updatedTasks.map(task => {
      if (task.id === taskID) {
        task.completed = true;
      }
    });

    setTasks(updatedTasks);
  }

  // Create & add a task object using newTask.
  function addTask() {
    if (newTask !== "") {
      const updatedTasks = allTasks;
      const taskObj = {
        id: Math.floor((Math.random() * 1000) + 1),
        title: newTask,
        completed: false,
        userId: 1
      }
    
      updatedTasks.push(taskObj);
      setTasks(updatedTasks);
    }
    
    // Clear newTask & input.
    setNewTask('');
    document.querySelector('#taskInput').value = '';
  }

  // Remove any task matching taskID.
  function deleteTask(taskID) {
    const updatedTasks = [];
    allTasks.map(task => {
      if (task.id !== taskID) {
        updatedTasks.push(task);
      }
    });
    setTasks(updatedTasks);
  }

    return (
      <>
      <div className="info">
        <h1>To-Do List</h1>
        <p>Made using React and the <a href="https://jsonplaceholder.typicode.com/">JSONPlaceholder API.</a> Navigate using your keyboard by moving forward with Tab, and selecting with Space. Use Shift + Tab to move back.</p>
      </div>
      <div className="list-wrapper">
        <div className="flex-row">
          <input id="taskInput" type="text" name="task" placeholder="Start typing..." autoFocus={true} onKeyUp={(e) => getTask(e)} />
          <button className="add-btn" onClick={() => addTask()}>&#43;</button>
        </div>
        <ul className="task-list">
          {
            allTasks && allTasks.map(task => {
              return (
              <Task key={'task' + task.id} task={task} deleteTask={deleteTask} updateTask={updateTask} />
              );
            })
          }
        </ul>
      </div>
      </>
    );
}

export default List;