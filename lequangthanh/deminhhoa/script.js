let tasks = [];
let selectedPriority = 'Medium';

fetch('/data.json')
  .then(res => res.json())
  .then(data => tasks = data);

function setPriority(priority) {
  selectedPriority = priority;
  
}

function addTask() {
  const taskInput = document.getElementById('task');
  const errorMessage = document.getElementById('error-message');

  const newTask = taskInput.value.trim();

  if (newTask === '') {
    errorMessage.textContent = 'Vui lòng nhập nội dung công việc.';
    return;
  }
  if (newTask.length > 100) {
    errorMessage.textContent = 'Nội dung công việc không được quá 100 ký tự.';
    return;
  }

  tasks.push({ 
    id: tasks.length + 1, 
    task: newTask, 
    priority: selectedPriority 
  });

  
  taskInput.value = '';
  errorMessage.textContent = '';
}

function closeForm() {
  
}
