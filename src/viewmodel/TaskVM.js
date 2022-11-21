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
 * @param {Array} allTasks - List of all tasks.
 * @param {Function} setTasks - Sets the task list.
 * @param {string} field - Indicates which task field to update.
 */
export function updateTask(taskID, allTasks, setTasks, field) {
  const updatedTasks = [...allTasks];

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
 * Creates a new task object.
 * 
 * @param {string} newTask - Task description.
 * @param {Array} allTasks - List of all tasks.
 * @param {Function} setNewTask - Sets task description.
 * @param {Function} setTasks - Sets the task list.
 */
export function addTask(newTask, allTasks, setNewTask, setTasks) {
    if (newTask !== "") {
      const updatedTasks = [...allTasks];
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
 * @param {Array} allTasks - List of tasks.
 * @param {Function} setTasks - Sets the task list.
 */
export function deleteTask(taskID, allTasks, setTasks) {
    const updatedTasks = [...allTasks].filter(task => task.id !== taskID);
    setTasks(updatedTasks);
}
