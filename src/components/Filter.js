import React from 'react'
import { filterTasks } from '../viewmodel/TaskVM'

const Filter = (props) => {
  const { tasks, setFilteredTasks } = props;

  return (
    <select 
        aria-label="Filter tasks"
        name="filter" 
        onChange={(e) => filterTasks(e.target.value, tasks, setFilteredTasks)}>
        <option>All</option>
        <option>Completed</option>
        <option>Priority</option>
        <option>Uncomplete</option>
    </select>
  )
}

export default Filter