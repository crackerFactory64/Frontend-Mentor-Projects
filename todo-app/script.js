const lightSwitch = document.getElementById("light-switch");
const newTodo = document.getElementById("new-task");
const listEl = document.getElementById("list");
const remainingTasks = document.getElementById("remaining");
const clearBtn = document.getElementById("clear");
const showAll = document.getElementById("filter-all");
const showActive = document.getElementById("filter-active");
const showCompleted = document.getElementById("filter-completed");
const showAllDesktop = document.getElementById("filter-all-desktop");
const showActiveDesktop = document.getElementById("filter-active-desktop");
const showCompletedDesktop = document.getElementById(
  "filter-completed-desktop"
);

//elements to change style of during light mode toggle

const body = document.getElementById("body");
const newDiv = document.getElementById("new");
const footer = document.getElementById("footer");
const filters = document.querySelectorAll(".main__filter");

let list = [
  { completed: false, title: "Buy turkey" },
  { completed: false, title: "Make stuffing" },
  { completed: true, title: "Buy booze" },
];

let darkModeActive = false;

updateList();

function updateList() {
  //clear list element
  while (listEl.firstChild) {
    listEl.removeChild(listEl.firstChild);
  }
  let remainingCount = list.length;
  //replace list element with current list array contents
  list.forEach((task, index) => {
    if (task.completed == true) {
      remainingCount--;
    }
    let item = document.createElement("li");
    item.setAttribute("data-index", index);
    darkModeActive == false
      ? item.classList.add("main__list-item", "main__list-item--light")
      : item.classList.add("main__list-item");
    item.innerHTML = `
        ${checkCompleted(task)}
        <button class="main__delete" onclick="deleteTodo(this)">
            <img
                src="images/icon-cross.svg"
                alt="delete todo"
                class="main__cross"
            />
        </button>
    `;
    listEl.appendChild(item);
    index++;
  });
  remainingCount == 1
    ? (remainingTasks.innerHTML = remainingCount + " item left")
    : (remainingTasks.innerHTML = remainingCount + " items left");
}

function checkCompleted(task) {
  if (darkModeActive == false) {
    return task.completed == true
      ? ` 
        <div class="main__circle__outer">
            <button class="main__circle main__circle--light main__circle--completed" onclick="toggleCompleted(this)">
                <img src="images/icon-check.svg" alt="completed" />
            </button>
        </div>
        <p class="main__task-name main__task-name--completed">${task.title}</p>
    `
      : ` 
        <div class="main__circle__outer">
            <button class="main__circle main__circle--light" onclick="toggleCompleted(this)"></button>
        </div>
        <p class="main__task-name">${task.title}</p>
        `;
  } else {
    return task.completed == true
      ? ` 
      <div class="main__circle__outer">
          <button class="main__circle main__circle--completed" onclick="toggleCompleted(this)">
              <img src="images/icon-check.svg" alt="completed" />
          </button>
      </div>
      <p class="main__task-name main__task-name--completed">${task.title}</p>
  `
      : ` 
      <div class="main__circle__outer">
          <button class="main__circle" onclick="toggleCompleted(this)"></button>
      </div>
      <p class="main__task-name">${task.title}</p>
      `;
  }
}

function deleteTodo(item) {
  list.splice(item.parentNode.dataset.index, 1);
  updateList();
}

function clearCompleted() {
  //array to hold indexes of completed tasks
  const arr = [];
  //loops through list and adds completed tasks to arr
  list.forEach((item) => {
    if (item.completed == false) {
      arr.push(list[list.indexOf(item)]);
    }
  });
  //replaces list with arr
  list = arr;
  updateList();
}

function filterList(filter) {
  const listItems = document.querySelectorAll(".main__list-item");
  if (filter == showAll) {
    updateList();
  } else if (filter == showActive) {
    listItems.forEach((item) => {
      if (item.querySelector(".main__circle--completed")) {
        item.style.display = "none";
      } else {
        item.style.display = "flex";
      }
    });
  } else if (filter == showCompleted) {
    listItems.forEach((item) => {
      if (!item.querySelector(".main__circle--completed")) {
        item.style.display = "none";
      } else {
        item.style.display = "flex";
      }
    });
  }
}

function filterBtnHandler(button) {
  document.querySelectorAll("button").forEach((el) => {
    el.classList.remove("main__filter__selected");
  });
  button.classList.add("main__filter__selected");
}

function addTodo() {
  const newTitle = newTodo.value.trim();
  list.push({ completed: false, title: newTitle });
  updateList();
  newTodo.value = "";
}

function toggleCompleted(button) {
  const task = button.parentNode.parentNode;
  if (list[task.dataset.index].completed == true) {
    list[task.dataset.index].completed = false;
  } else {
    list[task.dataset.index].completed = true;
  }
  updateList();
}

function toggleDarkMode() {
  const circles = document.querySelectorAll(".main__circle");
  const listItems = document.querySelectorAll(".main__list-item");
  body.classList.toggle("body--light");
  newDiv.classList.toggle("main__new--light");
  newTodo.classList.toggle("main__input--light");
  footer.classList.toggle("main__list-footer--light");
  circles.forEach((el) => {
    el.classList.toggle("main__circle--light");
  });
  listItems.forEach((el) => {
    el.classList.toggle("main__list-item--light");
  });
  filters.forEach((el) => {
    el.classList.toggle("main__filter--light");
  });

  if (darkModeActive == false) {
    lightSwitch.innerHTML =
      '<img src="images/icon-sun.svg" alt="toggle light mode" />';
    darkModeActive = true;
  } else {
    lightSwitch.innerHTML =
      '<img src="images/icon-moon.svg" alt="toggle dark mode" />';
    darkModeActive = false;
  }
}

clearBtn.addEventListener("click", clearCompleted);

showAll.addEventListener("click", () => {
  filterList(showAll);
});
showActive.addEventListener("click", () => {
  filterList(showActive);
});
showCompleted.addEventListener("click", () => {
  filterList(showCompleted);
});
showAllDesktop.addEventListener("click", () => {
  filterList(showAll);
});
showActiveDesktop.addEventListener("click", () => {
  filterList(showActive);
});
showCompletedDesktop.addEventListener("click", () => {
  filterList(showCompleted);
});

newTodo.addEventListener("keydown", (e) => {
  if (e.key == "Enter") {
    addTodo();
  }
});

lightSwitch.addEventListener("click", toggleDarkMode);
