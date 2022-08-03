const form = document.querySelector(".input-form");
const input = form.querySelector("input");
const TODOS = "todo";
let toDos = [];

function saveToDo() {
  localStorage.setItem(TODOS, JSON.stringify(toDos));
}

function deleteToDo(event) {
  console.log("d");
  const btn = event.target;
  const li = btn.parentNode.parentNode;
  li.remove();
  toDos = toDos.filter((toDo) => toDo.id !== parseInt(li.id));
  saveToDo();
}
function completeToDo(event) {
  const btn = event.target;
  const text = btn.nextSibling;
  text.classList.toggle("complete-todo");
}
function updateToDo(text, id) {
  //front side update
  console.log(text, id);
  toDos.map((li) => {
    if (li.id === id) {
      li.text = text;
    }
  });
  console.log(toDos);
  saveToDo();

  //localStroage update
}

function dbToDo(event) {
  //ToDo text를 더블클릭 했을 시
  const todoText = event.target;
  const todoBox = todoText.parentNode;
  const listToEdit = todoText.parentNode.parentNode;
  const editingInput = todoText.parentNode.nextSibling;
  editingInput.value = todoText.innerText;
  editingInput.classList.toggle("editing");
  todoBox.classList.toggle("todo-each-box-editing");
  editingInput.focus();

  document.addEventListener("click", () => {
    //현재 수정 중인 경우에만 외부 영역 클릭시 다시 돌아오는 기능.
    if (todoBox.className === "todo-each-box-editing") {
      editingInput.classList.toggle("editing");
      todoBox.classList.toggle("todo-each-box-editing");
    }
  });
  editingInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      todoText.innerText = e.target.value;
      updateToDo(e.target.value, parseInt(listToEdit.id));
      editingInput.classList.toggle("editing");
      todoBox.classList.toggle("todo-each-box-editing");
    }
  });
}

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

  const todoEditInput = document.createElement("input");
  todoEditInput.classList.add("editing", "editing-box");
  const todoDeleteBtn = document.createElement("button");
  todoDeleteBtn.innerText = "❌";
  //화면상에 나타낼 부분
  todoEachContent.append(...[todoCompleteBtn, todoEachText, todoDeleteBtn]);

  todoListEach.append(...[todoEachContent, todoEditInput]);
  todoList.appendChild(todoListEach);

  todoDeleteBtn.addEventListener("click", deleteToDo);
  todoCompleteBtn.addEventListener("click", completeToDo);
  todoEachText.ondblclick = dbToDo;

  const newId = toDos.length + 1;
  const newToDo = {
    id: newId,
    text: text,
  };
  toDos.push(newToDo);
  saveToDo();
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
