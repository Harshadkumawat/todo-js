const form = document.getElementById("todo-form");
const titleInput = document.getElementById("title");
const descriptionInput = document.getElementById("description");
const todoList = document.getElementById("todo-list");

let todos = [];
let isEdit = false;
let editId = null;

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const title = titleInput.value.trim();
  const description = descriptionInput.value.trim();

  if (!title || !description) {
    alert("Please fill in both fields.");
    return;
  }

  if (isEdit) {
    todos = todos.map(todo =>
      todo.id === editId ? { ...todo, title, description } : todo
    );
    isEdit = false;
    editId = null;
  } else {
    const newTodo = {
      id: Date.now(),
      title,
      description,
    };
    todos.push(newTodo);
  }

  titleInput.value = "";
  descriptionInput.value = "";
  renderTodos();
});

function renderTodos() {
  todoList.innerHTML = "";

  todos.forEach(({ id, title, description }) => {
    const todoEl = document.createElement("div");
    todoEl.className = "todo";

    todoEl.innerHTML = `
      <h4>${title}</h4>
      <p>${description}</p>
      <div class="actions">
        <button class="edit-btn">Edit</button>
        <button class="delete-btn">Delete</button>
      </div>
    `;

    const editBtn = todoEl.querySelector(".edit-btn");
    const deleteBtn = todoEl.querySelector(".delete-btn");

    editBtn.addEventListener("click", () => {
      isEdit = true;
      editId = id;
      titleInput.value = title;
      descriptionInput.value = description;
    });

    deleteBtn.addEventListener("click", () => {
      todos = todos.filter(todo => todo.id !== id);
      renderTodos();
    });

    todoList.appendChild(todoEl);
  });
}
