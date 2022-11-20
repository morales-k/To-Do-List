import React, { useEffect, useState } from 'react';
import { getTask, updateTask, addTask, deleteTask } from '../viewmodel/TaskVM';
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

    return (
      <>
      <div className="info">
        <h1>To-Do List</h1>
        <p>Made using React and the <a href="https://jsonplaceholder.typicode.com/">JSONPlaceholder API.</a> Navigate using your keyboard by moving forward with Tab, and selecting with Space. Use Shift + Tab to move back.</p>
      </div>
      <div className="list-wrapper">
        <div className="flex-row">
          <input 
		  		id="taskInput" 
				type="text" 
				name="task" 
				placeholder="Start typing..." 
				autoFocus={true} 
				onKeyUp={(e) => getTask(e, setNewTask)} />
          <button className="add-btn" onClick={() => addTask(newTask, allTasks, setNewTask, setTasks)}>&#43;</button>
        </div>
        <ul className="task-list">
          {
            allTasks && allTasks.map(task => {
              return (
              <Task 
			  		key={'task' + task.id} 
					allTasks={allTasks}
					setTasks={setTasks}
					task={task} 
					deleteTask={deleteTask} 
					updateTask={updateTask} />
              );
            })
          }
        </ul>
      </div>
      </>
    );
}

export default List;