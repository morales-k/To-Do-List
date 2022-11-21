import React from 'react'
import { updateTask } from '../viewmodel/TaskVM';

const PriorityIcon = (props) => {
  const { task, allTasks, setTasks } = props;

  return (
    <span 
        id="priorityIcon"
        className={task.priority ? 'priority' : ''}
        onClick={() => updateTask(task.id, allTasks, setTasks, 'priority')}
        >
            !
    </span>
  )
}

export default PriorityIcon