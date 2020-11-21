// 개발용

"use strict";
//global
const TODOS = "todos";
// Selector
const Form = document.querySelector(".new-add-form");
const Ul = document.querySelector(".list");
// Function
const loadStorage = () => {
  const li = document.querySelector("li");
  let ls = localStorage.getItem(TODOS);
  let storageArr = JSON.parse(ls);
  // 로컬 스토리지에는 있는데 투두 아이템이 생성되지 않은 경우 비워주기
  if (li === null) {
    if (ls !== null) {
      storageArr.map((storageStr) => {
        deleteLocalTodos(storageStr);
      });
    }
  }
  //
  if (ls !== null) {
    storageArr.map((storageString) => {
      addToDo(storageString);
    });
  }
};
const addToDo = (text) => {
  let ul = document.querySelector("ul");
  let li = document.createElement("li");
  let div = document.createElement("div");
  let spanText = document.createElement("span");
  let deleteBtn = document.createElement("i");
  let checkBtn = document.createElement("i");
  spanText.classList.add("todo-text");
  deleteBtn.classList.add("deleteButton");
  deleteBtn.classList.add("fas");
  deleteBtn.classList.add("fa-trash-alt");
  checkBtn.classList.add("checkButton");
  checkBtn.classList.add("fas");
  checkBtn.classList.add("fa-check");
  li.classList.add("todo-items");
  spanText.innerText = text;
  saveLocalTodos(text);
  div.appendChild(checkBtn);
  div.append(deleteBtn);
  li.append(spanText);
  li.append(div);
  ul.appendChild(li);
};
const deleteToDo = (e) => {
  var _a, _b, _c;
  const item = (_a = e.target.parentNode) === null || _a === void 0 ? void 0 : _a.parentNode;
  item.remove();
  const spanItem =
    (_c = (_b = e.target.parentNode) === null || _b === void 0 ? void 0 : _b.parentNode) === null ||
    _c === void 0
      ? void 0
      : _c.firstChild;
  deleteLocalTodos(spanItem);
};
const checkToDo = (e) => {
  var _a;
  const item = (_a = e.target.parentNode) === null || _a === void 0 ? void 0 : _a.parentNode;
  item.classList.toggle("checked");
};
const localStorageIsEmpty = (todos = TODOS) => {
  if (localStorage.getItem(TODOS) === null) {
    return true;
  } else {
    return false;
  }
};
// 로컬저장소 투두 추가
const saveLocalTodos = (todo) => {
  let todos;
  if (localStorage.getItem(TODOS) === null) {
    todos = [];
  } else {
    let getStorage = localStorage.getItem(TODOS);
    todos = JSON.parse(getStorage);
  }
  todos.push(todo);
  localStorage.setItem(TODOS, JSON.stringify(todos));
};
//로컬저장소 투두 삭제
const deleteLocalTodos = (todo) => {
  let todos;
  let getStorage = localStorage.getItem(TODOS);
  let deleteTodoString = todo.innerText;
  getStorage ? (todos = JSON.parse(getStorage)) : (todos = []);
  todos === null || todos === void 0 ? void 0 : todos.splice(todos.indexOf(deleteTodoString), 1);
  localStorage.setItem(TODOS, JSON.stringify(todos));
  console.log("localstorage deleted");
};
// EventListener
Form.addEventListener("submit", (e) => {
  e.preventDefault();
  let input = document.querySelector("input");
  if (input.value != "") {
    addToDo(input.value);
  }
  input.value = "";
});
Ul.addEventListener("click", (e) => {
  if (e.target.classList[0] === "deleteButton") {
    deleteToDo(e);
  } else if (e.target.classList[0] === "checkButton") {
    checkToDo(e);
  }
});
document.getElementById("clearAll").addEventListener("click", (e) => {
  Ul.innerHTML = "";
  Ul.innerHTML = `<h3>할일 목록을 작성해주세요!</h4>
  <i id="clearAll" class="fas fa-eraser"></i>
`;
});
loadStorage();
//# sourceMappingURL=index.js.map
