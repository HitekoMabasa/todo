const fs = require('fs');

// Path to the tasks.json file
const tasksFile = './tasks.json';
const loadTasks = () => {
    try {
      const data = fs.readFileSync(tasksFile, 'utf-8');
      return JSON.parse(data);
    } catch (error) {
      return [];
    }
  };
  const saveTasks = (tasks) => {
    fs.writeFileSync(tasksFile, JSON.stringify(tasks, null, 2));
  };
  const addTask = (task) => {
    const tasks = loadTasks();
    tasks.push({ task, completed: false });
    saveTasks(tasks);
    console.log(`Added: "${task}"`);
  };
  const removeTask = (task) => {
    const tasks = loadTasks();
    const updatedTasks = tasks.filter((t) => t.task !== task);
  
    if (tasks.length > updatedTasks.length) {
      saveTasks(updatedTasks);
      console.log(`Removed: "${task}"`);
    } else {
      console.log(`Task not found: "${task}"`);
    }
  };
  const markCompleted = (task) => {
    const tasks = loadTasks();
    const taskIndex = tasks.findIndex((t) => t.task === task);
  
    if (taskIndex !== -1) {
      tasks[taskIndex].completed = true;
      saveTasks(tasks);
      console.log(`Marked as completed: "${task}"`);
    } else {
      console.log(`Task not found: "${task}"`);
    }
  };
  const listTasks = () => {
    const tasks = loadTasks();
    console.log('\nTo-Do List:');
    tasks.forEach((t, i) => {
      console.log(`${i + 1}. ${t.task} - ${t.completed ? '✅' : '❌'}`);
    });
    console.log();
  };
  const command = process.argv[2];
  const argument = process.argv.slice(3).join(' ');
  
  switch (command) {
    case 'add':
      addTask(argument);
      break;
    case 'remove':
      removeTask(argument);
      break;
    case 'complete':
      markCompleted(argument);
      break;
    case 'list':
      listTasks();
      break;
    default:
      console.log('Commands: add <task>, remove <task>, complete <task>, list');
  }
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
                