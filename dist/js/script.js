function loadData() {
    return fetch("./data/db.json").then((res) => res.json());
}

let todoItems = [];

const titleInput = document.querySelector(`.form__input-title`);
const descInput = document.querySelector(`.form__input-desc`);
const statusInput = document.querySelector(`.form__group-wrapper1`);
const priorInput = document.querySelector(`.form__group-wrapper2`);
const cardContainer = document.querySelector(`.card__container`);

const addBtn = document.querySelector(`.form__button`);
let newObj;
addBtn.onclick = (e) => {
    
    if (titleInput.value === ``) {
        return;
    }
    if (descInput.value === ``) {
        return;
    }
    newObj = {
        title: titleInput.value,
        description: descInput.value,
        status: +statusInput.options.selectedIndex,
        priority: +priorInput.options.selectedIndex,
    };
    todoItems.push(newObj);
    localStorage.setItem("todoItems", JSON.stringify(todoItems));
};

if (!localStorage.getItem("todoItems")) {
    loadData().then((items) => {
        todoItems = items;
        console.log(todoItems);
        localStorage.setItem("todoItems", JSON.stringify(todoItems));
        renderTodoItems(todoItems);
    });
} else {
    todoItems = JSON.parse(localStorage.getItem("todoItems"));
    renderTodoItems(todoItems);
}

function renderTodoItems(todoItems) {
    const parent = document.getElementById("cards");

    for (let item of todoItems) {
        renderCard(item, parent);
    }
}

function renderCard(todoItem, parent) {
    const cardTemplate = `
            <div class="card">
                <div class="card__container">
                    <h1 class="card__title">${todoItem.title}</h1>
                    <div class="card__priority">
                        <select class="card__priority-select">
                        <option>Low</option>
                        <option>Medium</option>
                        <option>High</option>
                        </select>
                    </div>
                    <div class="card__status">
                        <select class="card__status-select">
                        <option>Todo</option>
                        <option>In progress</option>
                        <option>Done</option>
                        </select>
                    </div>
                </div>
                <div class="description"><p>${todoItem.description}</p></div>
                <div class="controls">
                    <button class = "controls__edit">Edit</button>
                    <button class = "controls__delete">Delete</button>
                </div>
            </div>
    `;

    parent.innerHTML += cardTemplate;
}
const cardPriority = document.querySelectorAll(`.card__priority-select`);
const cardStatus = document.querySelectorAll(`.card__status-select`);
function changeClass() {
    for (let i = 0; i < Object.keys(todoItems).length; i++) {
        cardStatus[i].options.selectedIndex = todoItems[i].status;
        cardPriority[i].options.selectedIndex = todoItems[i].priority;
    }
}
changeClass();

const parent = document.querySelectorAll(`.card`);

const btnDiv = document.querySelectorAll(".controls");

function btnFunction() {
    for (let i = 0; i < Object.keys(todoItems).length; i++) {
        parent[i].addEventListener("click", (e) => {
            console.log(e.target.className);

            if (e.target.className == `controls__delete`) {
                console.log(`deleted`);
                parent[i].remove();
                todoItems.splice(i, 1);
                console.log(todoItems[i]);
                localStorage.removeItem(todoItems);
                localStorage.setItem("todoItems", JSON.stringify(todoItems));
            }

            if (e.target.className == `controls__edit`) {
                console.log(`edit`);
                localStorage.removeItem(todoItems);

                todoItems[i].status = cardStatus[i].options.selectedIndex;
                todoItems[i].priority = cardPriority[i].options.selectedIndex;

                localStorage.setItem("todoItems", JSON.stringify(todoItems));
            }
        });
    }
}

btnFunction();
