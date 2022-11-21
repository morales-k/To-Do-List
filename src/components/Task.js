import React, {useState} from 'react'
import PriorityIcon from './PriorityIcon';
import { deleteTask, updateTask } from '../viewmodel/TaskVM';

function Task(props) {
  const { allTasks, setTasks, task, completed } = props;
  const [checked, setChecked] = useState(completed);

    return (
      <li className="task">
        <PriorityIcon
          task={task}
          allTasks={allTasks}
          setTasks={setTasks} />
        <div className={checked ? 'checked-task complete-container' : 'task-checkbox complete-container'}>
          <input type="checkbox" id="completeCheckbox" name="markComplete" aria-label="Mark complete" onClick={() => {
            updateTask(task.id, allTasks, setTasks, 'completed');
            setChecked(!checked);
          }} />
        </div>
        <p className={checked ? 'complete' : ''}>{task.title}</p>
        <div className="delete-container">
          <input 
              type="checkbox" 
              id="deleteCheckbox" 
              name="delete" 
              aria-label="delete" 
              onClick={() => deleteTask(task.id, allTasks, setTasks)} />
            <svg id="trashIcon" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="trash" className="svg-inline--fa fa-trash fa-w-14" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
              <path fill="currentColor" d="M432 32H312l-9.4-18.7A24 24 0 0 0 281.1 0H166.8a23.72 23.72 0 0 0-21.4 13.3L136 32H16A16 16 0 0 0 0 48v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16zM53.2 467a48 48 0 0 0 47.9 45h245.8a48 48 0 0 0 47.9-45L416 128H32z">
              </path>
            </svg>
        </div>
      </li>
    );
}

export default Task;