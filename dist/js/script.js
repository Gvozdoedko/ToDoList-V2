function loadData() {
    return fetch("./data/db.json").then((res) => res.json());
}

let todoItems = [];





const titleInput = document.querySelector(`.form__input-title`);
const descInput = document.querySelector(`.form__input-desc`);
const statusInput = document.querySelector(`.form__group-wrapper1`);
const priorInput = document.querySelector(`.form__group-wrapper2`);

const cardStatus = document.querySelector(`.card__status-select`);
const cardPriority = document.querySelector(`.card__priority-select`);




const addBtn = document.querySelector(`.form__button`);
const sb = document.querySelector(`.form__group-wrapper1`);
let newObj;
addBtn.onclick = (e) => {
    e.preventDefault();
    if (titleInput.value == ``) {
        alert(`Заполните поле Title`)
    }
    if (descInput.value == ``) {
        alert(`Заполните поле Description`)
    }
    newObj = {title: titleInput.value, description: descInput.value, status: +statusInput.value, priority: +priorInput.value};
    todoItems.push(newObj);
    localStorage.setItem("todoItems", JSON.stringify(todoItems));
}


if (!localStorage.getItem("todoItems")) {
    loadData().then((items) => {
        todoItems = items;
        console.log(todoItems);
        localStorage.setItem("todoItems", JSON.stringify(todoItems));
        // render cards
        renderTodoItems(todoItems);
    });
} else {
    todoItems = JSON.parse(localStorage.getItem("todoItems"));
    statusInput.value = todoItems.status;
    priorInput.value = todoItems.priority;
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
                        <option value="1">Low</option>
                        <option value="2">Medium</option>
                        <option value="3">High</option>
                        </select>
                    </div>
                    <div class="card__status">
                        <select class="card__status-select">
                        <option value="1">Todo</option>
                        <option value="2">In progress</option>
                        <option value="3">Done</option>
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
    
    cardStatus.value = todoItem.status;
    cardPriority.value = todoItem.priority;
}
