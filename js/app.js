const form = document.querySelector(".input-form");
const input = form.querySelector("input");
const TODOS = "todo";
let toDos = [];

function deleteToDo() {}

function editToDo() {}
function handleSubmit(e) {
  e.preventDefault();
  const newId = toDos.length + 1;
  const newToDo = {
    id: newId,
    text: input.value,
  };

  toDos.push(newToDo);
  localStorage.setItem(TODOS, JSON.stringify(toDos));
  input.value = "";
  paintingToDos();
}
function paintingToDos() {
  const todoBox = document.querySelector(".todo-list");
  const todoList = todoBox.querySelector("ul");

  const todoListEach = document.createElement("li");
  const todoEachContent = document.createElement("div");
  const todoCompleteBtn = document.createElement("button");
  const todoEachText = document.createElement("h3");
  const todoEditBtn = document.createElement("button");
  const todoDeleteBtn = document.createElement("button");

  todoEachContent.appendChild(todoCompleteBtn);
  todoEachContent.appendChild(todoEachText);
  todoEachContent.appendChild(todoEditBtn);
  todoEachContent.appendChild(todoDeleteBtn);
  todoListEach.appendChild(todoEachContent);

  todoList.appendChild(todoListEach);
}
function init() {
  toDos = localStorage.getItem(TODOS);
  form.addEventListener("submit", handleSubmit);
  if (toDos === null) {
    // 아직 todo가 없는 상태.
    toDos = [];
  } else {
    paintingToDos();
  }
}

init();
