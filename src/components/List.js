import React, { useEffect, useState } from 'react';
import { getTask, addTask, filterTasks, randomNum } from '../viewmodel/TaskVM';
import Task from './Task';
import Filter from './Filter';

function List() {
  const [newTask, setNewTask] = useState('');
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  let filter = document.getElementById("filterTasks");

  useEffect(() => {
    if (tasks.length === 0) {
      fetch('https://jsonplaceholder.typicode.com/todos/')
      .then(response => response.json())
      .then(json => {
        let initTasks = json.slice(0, 7);
        initTasks.forEach(task => {
            let num = randomNum();
            task.priority = num % 2 === 0 ? true : false;
        })
        setTasks(initTasks);
      });
    }
  }, []);

  useEffect(() => {
    if (!!tasks?.length) {
        filterTasks(tasks, setFilteredTasks);
    }
  }, [tasks]);

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
          <button className="add-btn" onClick={() => addTask(newTask, tasks, setNewTask, setTasks)}>&#43;</button>
        </div>
		<Filter
            tasks={tasks}
            filteredTasks={filteredTasks}
            setFilteredTasks={setFilteredTasks}
            filterValue={filter ? filter.value.toLowerCase() : 'all'} />
        <ul className="task-list">
          {
            filter && filter.value !== 'All' ? 
            !!filteredTasks?.length && filteredTasks.map(task => {
                    return (
                    <Task 
                        key={'task' + task.id} 
                        tasks={tasks}
                        setTasks={setTasks}
                        task={task} />
                    );
                }) :
            tasks && tasks.map(task => {
              return (
              <Task 
                  key={'task' + task.id} 
                  tasks={tasks}
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