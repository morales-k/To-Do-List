import React, { useEffect, useState } from 'react';
import { getTask, addTask, randomNum } from '../viewmodel/TaskVM';
import Task from './Task';
import Filter from './Filter';

function List() {
  const [newTask, setNewTask] = useState('');
  const [allTasks, setTasks] = useState([]);

  useEffect(() => {
    if (allTasks.length === 0) {
      fetch('https://jsonplaceholder.typicode.com/todos/')
      .then(response => response.json())
      .then(json => {
        let tasks = json.slice(0, 7);
        tasks.forEach(task => {
            let num = randomNum();
            task.priority = num % 2 === 0 ? true : false;
        })
        setTasks(tasks);
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
		<Filter />
        <ul className="task-list">
          {
            allTasks && allTasks.map(task => {
              return (
              <Task 
                  key={'task' + task.id} 
                  allTasks={allTasks}
                  setTasks={setTasks}
                  task={task} />
              );
            })
          }
        </ul>
      </div>
      </>
    );
}

export default List;