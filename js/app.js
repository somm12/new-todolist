const form = document.querySelector(".input-form");
const input = form.querySelector("input");
const TODOS = "todo";
let toDos = [];

function deleteToDo(event) {
  console.log("d");
  const btn = event.target;
  const li = btn.parentNode.parentNode;
  li.remove();
  toDos = toDos.filter((toDo) => toDo.id !== parseInt(li.id));
  localStorage.setItem(TODOS, JSON.stringify(toDos));

  // const element = document.querySelector();
}
function completeToDo(event) {
  const btn = event.target;
  const text = btn.nextSibling;
  text.classList.toggle("complete-todo");
}
function editToDo(event) {}

function paintingToDos(text) {
  const todoBox = document.querySelector(".todo-list");
  const todoList = todoBox.querySelector("ul");

  const todoListEach = document.createElement("li");
  todoListEach.id = toDos.length + 1;
  const todoEachContent = document.createElement("div");
  //화면상에 나타낼 부분
  const todoCompleteBtn = document.createElement("button");
  todoCompleteBtn.innerText = "✅";
  const todoEachText = document.createElement("h3");
  todoEachText.classList.add("todo-text");
  todoEachText.innerText = text;
  const todoEditBtn = document.createElement("button");
  todoEditBtn.innerText = "✏️";
  const todoDeleteBtn = document.createElement("button");
  todoDeleteBtn.innerText = "❌";
  //화면상에 나타낼 부분
  todoEachContent.append(
    ...[todoCompleteBtn, todoEachText, todoEditBtn, todoDeleteBtn]
  );

  todoListEach.appendChild(todoEachContent);
  todoList.appendChild(todoListEach);

  todoDeleteBtn.addEventListener("click", deleteToDo);
  todoCompleteBtn.addEventListener("click", completeToDo);

  const newId = toDos.length + 1;
  const newToDo = {
    id: newId,
    text: text,
  };
  toDos.push(newToDo);
  localStorage.setItem(TODOS, JSON.stringify(toDos));
}

function handleSubmit(e) {
  e.preventDefault();
  paintingToDos(input.value);
  input.value = "";
}

function init() {
  const loadedToDos = localStorage.getItem(TODOS);
  form.addEventListener("submit", handleSubmit);
  if (loadedToDos !== null) {
    const parsedToDos = JSON.parse(loadedToDos);
    parsedToDos.map((li) => paintingToDos(li.text));
  }
}

init();
