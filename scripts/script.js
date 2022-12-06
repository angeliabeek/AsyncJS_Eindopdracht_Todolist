// Tasklist in HTML
const addButton = document.getElementById("add-button");
const getTaskList = document.getElementById("list");

let arrayTasks = [];

const putAllTasksInHTML = async function (list) {
    const newTask = list.map(task => task.description);
    newTask.forEach(item => {
        const li = document.createElement("li");
        li.classList.add("list__tasks__item");

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.classList.add("list__tasks__item--checkbox");

        const text = document.createElement("span");
        text.innerText = item;
        text.classList.add("list__tasks__item--text");

        const trashcan = document.createElement("i");
        trashcan.classList.add("list__tasks__item--icon", "fa-solid", "fa-trash-can");

        li.appendChild(checkbox);
        li.appendChild(text);
        li.appendChild(trashcan);
        getTaskList.appendChild(li);
    });
};

const removeAllTasksInHTML = async function () {
    while (getTaskList.firstChild) {
        getTaskList.removeChild(getTaskList.firstChild);
    };
};

const checkCheckboxInHTML = async function (allTasks) {
    allTasks.forEach(task => {
        if (task.done == "true") {
            const index = allTasks.indexOf(task);
            const arrayListHTML = Array.from(getTaskList.querySelectorAll("li"));
            const checkedTask = arrayListHTML[index];
            const checkbox = checkedTask.querySelector("input");
            checkbox.checked = true;
            const textSpan = checkedTask.querySelector("span");
            textSpan.classList.add("list__tasks__item--checked");
        };
    });
};

const preventRefreshPage = function () {
    document.body.addEventListener("click", async function (event) {
        if (document.getElementsByClassName("list__tasks__item--checkbox").checked) {
            return true;
        }
        else {
            event.preventDefault();
        }
    });
};
preventRefreshPage();

const addAllTasksInHTML = async function () {
    arrayTasks = await getData();
    await removeAllTasksInHTML();
    await putAllTasksInHTML(arrayTasks);
    await checkCheckboxInHTML(arrayTasks);
};
addAllTasksInHTML();


// Events
const addTaskEvent = async function () {
    addButton.addEventListener("click", async function () {
        const newTask = document.getElementById("new-task").value;
        if (newTask) {
            await postNewTask(newTask);
            arrayTasks = await getData();
            await removeAllTasksInHTML();
            await putAllTasksInHTML(arrayTasks);
            await checkCheckboxInHTML(arrayTasks);
        }
        else {
            alert("You can't add an empty task. Fill in a task in the input field.");
        }
    });
};
addTaskEvent();

const getId = function (e) {
    let task = arrayTasks.filter(item => item.description == e.target.parentElement.innerText);
    const id = task[0]._id;
    return id;
};

const addTrashCanEvent = async function () {
    getTaskList.addEventListener("click", async function (e) {
        if (e.target && e.target.matches("i")) {
            const id = getId(e);
            await deleteTask(id);
            arrayTasks = await getData();
            await removeAllTasksInHTML();
            await putAllTasksInHTML(arrayTasks);
            await checkCheckboxInHTML(arrayTasks);
        };
    });
};
addTrashCanEvent();

const addCheckboxEvent = async function () {
    getTaskList.addEventListener("click", async function (e) {
        if (e.target && e.target.matches("input")) {
            const id = getId(e);
            let state = "";
            if (e.target.checked) {
                state = "true";
            }
            else {
                state = "false";
            }
            await putChangeTask(id, state);
            arrayTasks = await getData();
            await removeAllTasksInHTML();
            await putAllTasksInHTML(arrayTasks);
            await checkCheckboxInHTML(arrayTasks);
        };
    });
};
addCheckboxEvent();

const addChangeTaskEvent = async function () {
    getTaskList.addEventListener("click", async function (e) {
        if (e.target && e.target.matches("span")) {
            const newText = prompt(`Change the text of task: ${e.target.innerText}`).trim();
            if (newText) {
                const id = getId(e);
                await putChangedTaskText(id, newText);
                arrayTasks = await getData();
                await removeAllTasksInHTML();
                await putAllTasksInHTML(arrayTasks);
                await checkCheckboxInHTML(arrayTasks);
            }
            else {
                alert("The text of the task is the same");
            }
        };
    });
};
addChangeTaskEvent();
