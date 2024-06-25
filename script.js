//Selectors
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");

//Event Listeners
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);
filterOption.addEventListener("click", filterTodo);

//Functions
function addTodo(event) {
  // Prevent form from submitting
  event.preventDefault();
  // Todo Div
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");

  //Create LI
  const newTodo = document.createElement("li");
  newTodo.innerText = todoInput.value;
  newTodo.classList.add("todo-item");
  todoDiv.appendChild(newTodo);

  //Check Mark Button
  const completeButton = document.createElement("button");
  completeButton.innerHTML = '<i class="fas fa-check"></i>';
  completeButton.classList.add("complete-button");
  todoDiv.appendChild(completeButton);

  //Check trash Button
  const trashButton = document.createElement("button");
  trashButton.innerHTML = '<i class="fas fa-trash"></i>';
  trashButton.classList.add("trash-button");
  todoDiv.appendChild(trashButton);

  //Append to List
  todoList.appendChild(todoDiv);

  //Clearing Todo Input Value
  todoInput.value = "";
}

//Function deleteCheck Todo

function deleteCheck(e) {
  const item = e.target;
  if (item.classList[0] === "trash-button") {
    console.log(item.parentElement);
    const todo = item.parentElement;
    todo.classList.add("fall");
    todo.addEventListener("transitionend", function () {
      todo.remove();
    });
  }

  // checkMark Todo
  if (item.classList[0] === "complete-button") {
    const todo = item.parentElement;
    todo.classList.toggle("completed");
  }
}

//Function filterTodo

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
