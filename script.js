//SELECTORS
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");

//EVENT LISTENERS
document.addEventListener("DOMContentLoaded", getTodos);
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);
filterOption.addEventListener("click", filterTodo);

//Functions
function addTodo(event) {
  // PREVENT FORM FROM SUBMITTING
  event.preventDefault();

  // CREATING TODODIV/DIV ELEMENT
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");

  //CREATING LI ELEMENT
  const newTodo = document.createElement("li");
  newTodo.innerText = todoInput.value;
  newTodo.classList.add("todo-item");
  todoDiv.appendChild(newTodo);

  // SAVING TODOS TO LOCALSTORAGE
  saveLocalTodos(todoInput.value);

  //CREATING CHECK MARK BUTTON ELEMENT
  const completeButton = document.createElement("button");
  completeButton.innerHTML = '<i class="fas fa-check"></i>';
  completeButton.classList.add("complete-button");
  todoDiv.appendChild(completeButton);

  //CREATING CHECK TRASH BUTTON ELEMENT
  const trashButton = document.createElement("button");
  trashButton.innerHTML = '<i class="fas fa-trash"></i>';
  trashButton.classList.add("trash-button");
  todoDiv.appendChild(trashButton);

  //APPEND TO LIST
  todoList.appendChild(todoDiv);

  //CLEARING TODO INPUT VALUE
  todoInput.value = "";
}

//FUNCTION DELETECHECK TODO
function deleteCheck(e) {
  const item = e.target;
  if (item.classList[0] === "trash-button") {
    console.log(item.parentElement);
    const todo = item.parentElement;

    todo.classList.add("fall");
    removeLocalTodos(todo);
    todo.addEventListener("transitionend", function () {
      todo.remove();
    });
  }

  // CHECKMARK TODO
  if (item.classList[0] === "complete-button") {
    const todo = item.parentElement;
    todo.classList.toggle("completed");
  }
}

//FUNCTION FILTERTODO(FILTERS COMPLETED AND UNCOMPLETED TODOS)
function filterTodo(e) {
  const todos = todoList.childNodes;
  todos.forEach(function (td) {
    switch (e.target.value) {
      case "all":
        td.style.display = "flex";
        break;
      case "completed":
        if (td.classList.contains("completed")) {
          td.style.display = "flex";
        } else {
          td.style.display = "none";
        }
        break;
      case "uncompleted":
        if (!td.classList.contains("completed")) {
          td.style.display = "flex";
        } else {
          td.style.display = "none";
        }

        break;
    }
  });
}

//FUNCTION SAVELOCALTODOS TO SAVE TODOS IN LOCALSTORAGE
function saveLocalTodos(todo) {
  // CHECK ---> DO I ALREADY HAVE THINGS IN THERE?
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}

//CREATING FUNCTION GETTODOS TO GET TODOS FROM LOCALSTORAGE

function getTodos() {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.forEach(function (todo) {
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    //CREATING LI ELEMENT
    const newTodo = document.createElement("li");
    newTodo.innerText = todo;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);

    //CREATING CHECK MARK BUTTON ELEMENT
    const completeButton = document.createElement("button");
    completeButton.innerHTML = '<i class="fas fa-check"></i>';
    completeButton.classList.add("complete-button");
    todoDiv.appendChild(completeButton);

    //CREATING CHECK TRASH BUTTON ELEMENT
    const trashButton = document.createElement("button");
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add("trash-button");
    todoDiv.appendChild(trashButton);

    //APPEND TO LIST
    todoList.appendChild(todoDiv);
  });
}

//FUNCTION REMOVELOCALTODOS
function removeLocalTodos(todo) {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  const todoIndex = todo.children[0].innerText;
  todos.splice(todos.indexOf(todoIndex), 1);
  localStorage.setItem("todos", JSON.stringify(todos));
}
