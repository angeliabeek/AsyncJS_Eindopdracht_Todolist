const baseURL = "http://localhost:3000/";

const getData = async function () {
    try {
        const response = await fetch(baseURL, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
            },
        });
        return await response.json();
    }
    catch (error) {
        return error;
    }
};
//getData().then((result) => { console.log(result) });


const postNewTask = async function (input) {
    try {
        const response = await fetch(baseURL, {
            method: 'POST',
            body: JSON.stringify({
                "description": input,
                "done": "false",
            }),
            headers: {
                "Content-Type": "application/json",
            }
        });
        return await response.json();
    }
    catch (error) {
        return error;
    }
};
//postNewTask().then((result) => { console.log(result) });


const deleteTask = async function (id) {
    try {
        const response = await fetch(baseURL + id, {
            method: 'DELETE',
        });
    }
    catch (error) {
        return error;
    }
};
//deleteTask().then((result) => { console.log(result) });


const putChangeTask = async function (id, state) {
    try {
        const response = await fetch(baseURL + id, {
            method: 'PUT',
            body: JSON.stringify({
                "done": state,
            }),
            headers: {
                "Content-Type": "application/json",
            }

        });
        return await response.json();
    }
    catch (error) {
        return error;
    }
};
//putChangeTask().then((result) => { console.log(result) });


const putChangedTaskText = async function (id, newText) {
    try {
        const response = await fetch(baseURL + id, {
            method: 'PUT',
            body: JSON.stringify({
                "description": newText,
            }),
            headers: {
                "Content-Type": "application/json",
            }

        });
        return await response.json();
    }
    catch (error) {
        return error;
    }
};
//putChangedTaskText().then((result) => { console.log(result) });
