// Little List — Interactive To-Do App
// All tasks live in one array and are saved to localStorage.

const STORAGE_KEY = "little-list-tasks";
let tasks = loadTasks();
let currentFilter = "all";

const form = document.getElementById("form");
const input = document.getElementById("text");
const list = document.getElementById("list");
const count = document.getElementById("count");
const emptyState = document.getElementById("empty-state");
const clearCompletedButton = document.getElementById("clear-completed");
const filterButtons = document.querySelectorAll("[data-filter]");

// Read saved tasks safely. If storage is missing or invalid, start with an empty list.
function loadTasks() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (!Array.isArray(saved)) return [];
    return saved.filter(task =>
      task &&
      Number.isFinite(task.id) &&
      typeof task.text === "string" &&
      typeof task.done === "boolean"
    );
  } catch (error) {
    return [];
  }
}

// Convert the task array to JSON text and store it in this browser.
function saveTasks() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  } catch (error) {
    console.warn("Tasks could not be saved in this browser.", error);
  }
}

// Return tasks matching the selected filter.
function getVisibleTasks() {
  if (currentFilter === "active") return tasks.filter(task => !task.done);
  if (currentFilter === "done") return tasks.filter(task => task.done);
  return tasks;
}

// Rebuild the visible list from the tasks array.
function renderTasks() {
  list.replaceChildren();

  getVisibleTasks().forEach(task => {
    const item = document.createElement("li");
    item.className = `task-item${task.done ? " done" : ""}`;
    item.dataset.id = String(task.id);

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.className = "task-check";
    checkbox.checked = task.done;
    checkbox.dataset.action = "toggle";
    checkbox.setAttribute("aria-label", `Mark ${task.text} ${task.done ? "active" : "done"}`);

    const label = document.createElement("span");
    label.className = "task-text";
    // textContent safely displays user input without interpreting it as HTML.
    label.textContent = task.text;

    const deleteButton = document.createElement("button");
    deleteButton.type = "button";
    deleteButton.className = "delete-button";
    deleteButton.textContent = "Delete";
    deleteButton.dataset.action = "delete";
    deleteButton.setAttribute("aria-label", `Delete ${task.text}`);

    item.append(checkbox, label, deleteButton);
    list.append(item);
  });

  const remaining = tasks.filter(task => !task.done).length;
  count.textContent = `${remaining} ${remaining === 1 ? "task" : "tasks"} left`;
  emptyState.hidden = getVisibleTasks().length !== 0;

  filterButtons.forEach(button => {
    const selected = button.dataset.filter === currentFilter;
    button.classList.toggle("active", selected);
    button.setAttribute("aria-pressed", String(selected));
  });
}

// Add a task when the form is submitted (click or Enter key).
form.addEventListener("submit", event => {
  event.preventDefault();
  const text = input.value.trim();
  if (!text) {
    input.focus();
    return;
  }

  tasks.push({ id: Date.now() + Math.floor(Math.random() * 1000), text, done: false });
  input.value = "";
  saveTasks();
  renderTasks();
  input.focus();
});

// One list listener handles both completing and deleting tasks.
list.addEventListener("click", event => {
  const actionElement = event.target.closest("[data-action]");
  if (!actionElement) return;

  const item = actionElement.closest("li");
  if (!item) return;

  const id = Number(item.dataset.id);
  const action = actionElement.dataset.action;

  if (action === "delete") {
    tasks = tasks.filter(task => task.id !== id);
  } else if (action === "toggle") {
    tasks = tasks.map(task =>
      task.id === id ? { ...task, done: !task.done } : task
    );
  }

  saveTasks();
  renderTasks();
});

// The filter buttons only change which tasks are displayed.
filterButtons.forEach(button => {
  button.addEventListener("click", () => {
    currentFilter = button.dataset.filter;
    renderTasks();
  });
});

// Remove every completed task.
clearCompletedButton.addEventListener("click", () => {
  tasks = tasks.filter(task => !task.done);
  saveTasks();
  renderTasks();
});

// Show previously saved tasks when the page opens.
renderTasks();
