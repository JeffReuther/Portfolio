/*
Add button:
initialized in the event listener code instead of separate function
uses trim method to remove whitespace
only adds text to array because index is remembered for delete
  doesn't account for completed button though

Delete button:
uses removeChild
the index is passed into the event function when the button is created
so the benefit of initializing this in the render function is passing relevant params
  for both adding and deleting

*/

const todoList = document.getElementById("todo-list");
const newTodoInput = document.getElementById("newTodo");
const addButton = document.getElementById("addTodo");

function render(todoText) {
  const todo = document.createElement("li");
  todo.setAttribute("class", "todo-item");
  todo.completed = false;

  // In case I ever need to update the text via toggle.
  const text = document.createElement("span");
  text.setAttribute("class", "todo-text");
  text.appendChild(document.createTextNode(todoText));

  const toggleButton = document.createElement("input");
  toggleButton.setAttribute("type", "checkbox");
  toggleButton.setAttribute("class", "todo-toggle-button");
  toggleButton.addEventListener("click", () => toggleTodo(todo));

  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";
  deleteButton.setAttribute("class", "todo-delete-button");
  deleteButton.addEventListener("click", (event) => deleteTodo(todo, event));

  todoList.appendChild(todo);
  todo.appendChild(toggleButton);
  todo.appendChild(text);
  todo.appendChild(deleteButton);
}

function addTodo() {
  const newTodoText = newTodoInput.value.trim();
  if (newTodoText) {
    newTodoInput.value = "";
    render(newTodoText);
  }
}

function deleteTodo(todo) {
  todoList.removeChild(todo);
}

function toggleTodo(todo) {
  todo.completed = !todo.completed;
  if (todo.completed === false) {
    todo.getElementsByClassName("todo-text")[0].style.textDecoration = "solid";
  } else {
    todo.getElementsByClassName("todo-text")[0].style.textDecoration = "line-through";
  }
}

addButton.addEventListener("click", () => addTodo() );
newTodoInput.addEventListener("keyup",(e) => {
  if (document.activeElement === newTodoInput && e.key === "Enter" && newTodoInput.value !== "") {
    addTodo();
  }
});
