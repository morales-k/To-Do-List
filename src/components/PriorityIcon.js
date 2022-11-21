import React from 'react'
import { updateTask } from '../viewmodel/TaskVM';

const PriorityIcon = (props) => {
  const { task, tasks, setTasks } = props;

  return (
    <span 
        id="priorityIcon"
        className={task.priority ? 'priority' : ''}
        onClick={() => updateTask(task.id, tasks, setTasks, 'priority')}
        >
            !
    </span>
  )
}

export default PriorityIcon