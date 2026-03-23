// Theme toggle
document.getElementById('themeToggle').addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
});

// Load tasks from localStorage
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTasks();
}

// Add task
document.getElementById('addTaskBtn').addEventListener('click', () => {
    const name = document.getElementById('taskInput').value.trim();
    const due = document.getElementById('dueDate').value;
    const priority = document.getElementById('priority').value;
    const category = document.getElementById('category').value.trim();
    if (!name) return;

    tasks.push({ name, due, priority, category, completed: false });
    saveTasks();
    document.getElementById('taskInput').value = '';
});

// Render tasks
function renderTasks() {
    const list = document.getElementById('taskList');
    list.innerHTML = '';
    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.className = task.priority.toLowerCase();
        if(task.completed) li.classList.add('completed');

        li.innerHTML = `
            <span>
                <strong>${task.name}</strong> | ${task.category} | ${task.due} | ${task.priority}
            </span>
            <span>
                <button onclick="toggleComplete(${index})">✔</button>
                <button onclick="deleteTask(${index})">🗑</button>
            </span>
        `;

        list.appendChild(li);
    });
}

// Delete task
function deleteTask(index) {
    tasks.splice(index, 1);
    saveTasks();
}

// Toggle complete
function toggleComplete(index) {
    tasks[index].completed = !tasks[index].completed;
    saveTasks();
}

// Search tasks
document.getElementById('searchTask').addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase();
    document.querySelectorAll('#taskList li').forEach(li => {
        li.style.display = li.innerText.toLowerCase().includes(query) ? 'flex' : 'none';
    });
});

// Filter priority
document.getElementById('filterPriority').addEventListener('change', (e) => {
    const value = e.target.value;
    document.querySelectorAll('#taskList li').forEach(li => {
        li.style.display = (value === 'All' || li.classList.contains(value.toLowerCase())) ? 'flex' : 'none';
    });
});

// Initial render
renderTasks();