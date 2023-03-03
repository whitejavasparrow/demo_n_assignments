// 初始變數
const list = document.querySelector("#my-todo");
const doneList = document.querySelector("#my-done");
const addBtn = document.querySelector("#add-btn");
const input = document.querySelector("#new-todo");

// 資料
const todos = [
  "Hit the gym",
  "Read a book",
  "Buy eggs",
  "Organize office",
  "Pay bills"
];

for (let todo of todos) {
  addItem(todo);
}

// 函式
function addItem(text) {
  input.value = "";

  let newItem = document.createElement("li");
  newItem.innerHTML = `
    <label for="todo">${text}</label>
    <i class="delete fa fa-trash"></i>
  `;
  list.appendChild(newItem);
}

// Create
addBtn.addEventListener("click", function () {
  const inputValue = input.value;

  if (inputValue.trim().length > 0) {
    addItem(inputValue);
  } else {
    alert("The addition might be an empty one");
  }
});

input.addEventListener("keyup", function (event) {
  const inputValue = input.value;

  if (event.key === "Enter" && inputValue.trim().length > 0) {
    addItem(inputValue);
  }
});

// Delete and check
list.addEventListener("click", function (event) {
  const target = event.target;

  if (target.classList.contains("delete")) {
    let parentElement = target.parentElement;
    parentElement.remove();
  } else if (target.tagName === "LABEL") {
    // why capitalized?
    target.classList.toggle("checked");
    let parentElement = target.parentElement;
    doneList.appendChild(parentElement);
  }
});

doneList.addEventListener("click", function (event) {
  const target = event.target;

  if (target.classList.contains("delete")) {
    let parentElement = target.parentElement;
    parentElement.remove();
  }
});
