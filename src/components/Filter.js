import React from 'react'
import { filterTasks } from '../viewmodel/TaskVM'

const Filter = (props) => {
  const { tasks, filteredTasks, setFilteredTasks, filterValue } = props;

  return (
    <div className="filter-container">
      <select 
        id="filterTasks"
        aria-label="Filter tasks"
        name="filter" 
        onChange={() => filterTasks(tasks, setFilteredTasks)}>
        <option>All</option>
        <option>Completed</option>
        <option>Priority</option>
        <option>Uncomplete</option>
      </select>
       {
            filterValue !== 'all' ?
            <p>{`${filteredTasks.length} ${filterValue} ${filteredTasks.length === 1 ? 'task' : 'tasks'}`}</p> :
            <p>{`${tasks.length} ${tasks.length === 1 ? 'task' : 'tasks'}`}</p>
        }
    </div>
  )
}

export default Filter