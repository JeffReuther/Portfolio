// Maybe instead of creating the elements at event runtime, I can create a
// class prototype that creates a new object and inserts the elements

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
  //const text = document.createTextNode(`${isCompleted(todo)} ${todoText} `);
  todo.completed = false;
  todo.setAttribute("class", "todo-item");

  const text = document.createElement("div");
  text.setAttribute("id", "text");
  text.appendChild(document.createTextNode(`${isCompleted(todo)} ${todoText} `));

  const toggleButton = document.createElement("input");
  toggleButton.setAttribute("type", "checkbox");
  toggleButton.addEventListener("click", () => toggleTodo(todo, todoText));

  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";
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

function toggleTodo(todo, todoText) {
  todo.completed = !todo.completed;
  //todo.firstChild.textContent = `${isCompleted(todo)} ${todoText} `;
  todo.getElementById("text").textConent = `${isCompleted(todo)} ${todoText} `;
}

function isCompleted(todo) {
  if (todo.completed === false) {
    return "(   )";
  } else {
    return "( X )";
  }
}

addButton.addEventListener("click", () => addTodo() );
newTodoInput.addEventListener("keyup",(e) => {
  if (document.activeElement === newTodoInput && e.key === "Enter" && newTodoInput.value !== "") {
    addTodo();
  }
});
