// Load tasks from localStorage when page loads
window.onload = () => {
    loadTasks();
  };
  
  function addTask() {
    const taskInput = document.getElementById("task-input");
    const taskText = taskInput.value.trim();
  
    if (taskText === "") return;
  
    const task = {
      text: taskText,
      completed: false,
    };
  
    let tasks = getTasks();
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
  
    taskInput.value = "";
    loadTasks();
  }
  
  function loadTasks() {
    const taskList = document.getElementById("task-list");
    taskList.innerHTML = "";
  
    const tasks = getTasks();
  
    tasks.forEach((task, index) => {
      const li = document.createElement("li");
      li.textContent = task.text;
      if (task.completed) li.classList.add("completed");
  
      // Toggle complete on click
      li.onclick = () => toggleTask(index);
  
      // Delete Button
      const delBtn = document.createElement("button");
      delBtn.textContent = "❌";
      delBtn.onclick = (e) => {
        e.stopPropagation();
        deleteTask(index);
      };
  
      // Edit Button
      const editBtn = document.createElement("button");
      editBtn.textContent = "✏️";
      editBtn.onclick = (e) => {
        e.stopPropagation();
        editTask(index);
      };
  
      // Button container
      const btnContainer = document.createElement("span");
      btnContainer.style.marginLeft = "auto";
      btnContainer.appendChild(editBtn);
      btnContainer.appendChild(delBtn);
  
      li.appendChild(btnContainer);
      taskList.appendChild(li);
    });
  }
  
  
  function toggleTask(index) {
    let tasks = getTasks();
    tasks[index].completed = !tasks[index].completed;
    localStorage.setItem("tasks", JSON.stringify(tasks));
    loadTasks();
  }
  
  function deleteTask(index) {
    let tasks = getTasks();
    tasks.splice(index, 1);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    loadTasks();
  }
  
  function getTasks() {
    return JSON.parse(localStorage.getItem("tasks")) || [];
  }
  

  function editTask(index) {
    let tasks = getTasks();
    const newText = prompt("Edit your task:", tasks[index].text);
  
    if (newText && newText.trim() !== "") {
      tasks[index].text = newText.trim();
      localStorage.setItem("tasks", JSON.stringify(tasks));
      loadTasks();
    }
  }
  