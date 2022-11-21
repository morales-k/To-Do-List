export const randomNum = () => Math.floor((Math.random() * 1000) + 1);

/**
 * Gets the most recent task.
 * 
 * @param {object} e - Event object.
 * @param {function} setNewTask - Setter for the task.
 */
export function getTask(e, setNewTask) {
    const value = e.currentTarget.value.trim();
    
    if (value !== "") {
      setNewTask(value);
    }
}

/**
 * Updates a task based on a passed field.
 * 
 * @param {number} taskID - Task identifier.
 * @param {Array} tasks - List of all tasks.
 * @param {Function} setTasks - Sets the task list.
 * @param {string} field - Indicates which task field to update.
 */
export function updateTask(taskID, tasks, setTasks, field) {
  const updatedTasks = [...tasks];

    updatedTasks.map(task => {
      if (task.id === taskID) {
        if (field === 'completed') {
          task.completed = !task.completed;
        } else if (field === 'priority') {
          task.priority = !task.priority;
        }
      }
    });

    setTasks(updatedTasks);
}

/**
 * Filters tasks by the selected value.
 * 
 * @param {string} value - Task value to sort by.
 * @param {array} tasks - List of all tasks.
 * @param {Function} setFilteredTasks - Sets the filtered tasks list.
 */
export function filterTasks(value, tasks, setFilteredTasks) {
  let updatedTasks = [];

  switch(value) {
    case 'Completed':
      updatedTasks = [...tasks].filter(task => task.completed);
      break;
    case 'Priority':
      updatedTasks = [...tasks].filter(task => task.priority);
      break;
    case 'Uncomplete':
      updatedTasks = [...tasks].filter(task => task.completed === false);
      break;
    case 'All':
    default:
      updatedTasks = [];
      break;
  }
  setFilteredTasks(updatedTasks);
}

/**
 * Creates a new task object.
 * 
 * @param {string} newTask - Task description.
 * @param {Array} tasks - List of all tasks.
 * @param {Function} setNewTask - Sets task description.
 * @param {Function} setTasks - Sets the task list.
 */
export function addTask(newTask, tasks, setNewTask, setTasks) {
    if (newTask !== "") {
      const updatedTasks = [...tasks];
      const taskObj = {
        id: randomNum(),
        title: newTask,
        completed: false,
        userId: 1,
        priority: false,
      }
    
      updatedTasks.push(taskObj);
      setTasks(updatedTasks);
    }
    
    // Clear newTask & input.
    setNewTask('');
    document.querySelector('#taskInput').value = '';
}

/**
 * Removes any task matching taskID.
 * 
 * @param {number} taskID - Task identifier.
 * @param {Array} tasks - List of tasks.
 * @param {Function} setTasks - Sets the task list.
 */
export function deleteTask(taskID, tasks, setTasks) {
    const updatedTasks = [...tasks].filter(task => task.id !== taskID);
    setTasks(updatedTasks);
}
