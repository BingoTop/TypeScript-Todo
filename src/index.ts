//global
const TODOS: string = "todos";
// Selector
const Form = document.querySelector(".new-add-form") as HTMLFormElement;
const Ul = document.querySelector(".list") as HTMLUListElement;

// Function
const loadStorage: Function = (): void => {
  const li: HTMLLIElement = document.querySelector("li")!;
  let ls: string = localStorage.getItem(TODOS)!;
  let storageArr: string[] = JSON.parse(ls);

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

const addToDo: Function = (text: string): void => {
  let ul = document.querySelector("ul") as HTMLUListElement;

  let li = document.createElement("li");
  let div = document.createElement("div");
  let spanText = document.createElement("span");
  let deleteBtn: HTMLElement = document.createElement("i");
  let checkBtn: HTMLElement = document.createElement("i");

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

const deleteToDo: Function = (e: Event): void => {
  const item = <HTMLElement>(<HTMLElement>e.target).parentNode?.parentNode;
  item.remove();
  const spanItem = <HTMLElement>(<HTMLElement>e.target).parentNode?.parentNode?.firstChild;
  deleteLocalTodos(spanItem);
};

const checkToDo: Function = (e: Event): void => {
  const item = <HTMLElement>(<HTMLElement>e.target).parentNode?.parentNode;
  item.classList.toggle("checked");
};
const localStorageIsEmpty: Function = (todos = TODOS): boolean => {
  if (localStorage.getItem(TODOS) === null) {
    return true;
  } else {
    return false;
  }
};
// 로컬저장소 투두 추가
const saveLocalTodos: Function = (todo: string): void => {
  let todos: string[];
  if (localStorage.getItem(TODOS) === null) {
    todos = [];
  } else {
    let getStorage: string = localStorage.getItem(TODOS)!;
    todos = JSON.parse(getStorage);
  }
  todos.push(todo);
  localStorage.setItem(TODOS, JSON.stringify(todos));
};

//로컬저장소 투두 삭제
const deleteLocalTodos: Function = (todo: HTMLElement): void => {
  let todos: string[] | null;
  let getStorage: string = localStorage.getItem(TODOS)!;
  let deleteTodoString: string = todo.innerText;

  getStorage ? (todos = JSON.parse(getStorage)) : (todos = []);

  todos?.splice(todos.indexOf(deleteTodoString), 1);
  localStorage.setItem(TODOS, JSON.stringify(todos));
  console.log("localstorage deleted");
};

// EventListener
Form.addEventListener("submit", (e: Event): void => {
  e.preventDefault();
  let input = document.querySelector("input") as HTMLInputElement;
  if (input.value != "") {
    addToDo(input.value);
  }
  input.value = "";
});
Ul.addEventListener("click", (e: Event): void => {
  if ((<HTMLButtonElement>e.target).classList[0] === "deleteButton") {
    deleteToDo(e);
  } else if ((<HTMLButtonElement>e.target).classList[0] === "checkButton") {
    checkToDo(e);
  }
});

document.getElementById("clearAll")!.addEventListener("click", (e: Event) => {
  Ul.innerHTML = "";
  Ul.innerHTML = `<h3>할일 목록을 작성해주세요!</h4>
  <i id="clearAll" class="fas fa-eraser"></i>
`;
});
loadStorage();
