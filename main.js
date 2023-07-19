window.addEventListener("load", () => {
    //==== new content video====
    tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const nameInput = document.querySelector("#name");
    const form = document.querySelector("#new-task-form");

    const username = localStorage.getItem("username") || "";

    nameInput.value = username;

    nameInput.addEventListener("change", e => {
        localStorage.setItem("username" , e.target.value);
    })

    form.addEventListener("submit", e => {
        e.preventDefault();

        
        const task = {
            content: e.target.elements.newTaskInput.value,
            done: false,
            createdAt: new Date().getTime(),
        }

        tasks.push(task);

        localStorage.setItem("tasks", JSON.stringify(tasks));

        e.target.reset();
        
        DisplayTasks();
    })
    DisplayTasks();
})

function DisplayTasks(){
    const tasklist = document.querySelector(".task-list");

    tasklist.innerHTML = "";

    tasks.forEach(task => {
        const taskItem = document.createElement("div");
        taskItem.classList.add("task-item");

        const label = document.createElement("label");
        const input = document.createElement("input");
        const span = document.createElement("span");
        const content = document.createElement("div");
        const actions = document.createElement("div");
        const editButton = document.createElement("button");
        const deleteButton = document.createElement("button");

        input.type = "checkbox";
        input.checked = task.done;

        content.classList.add("task-content");
        actions.classList.add("actions");
        editButton.classList.add("edit");
        deleteButton.classList.add("delete");

        content.innerHTML = `<input type="text" value="${task.content}" readonly>`;
        editButton.innerHTML = "Edit";
        deleteButton.innerHTML = "Delete";

        label.appendChild(input);
        label.appendChild(span);
        actions.appendChild(editButton);
        actions.appendChild(deleteButton);
        taskItem.appendChild(label);
        taskItem.appendChild(content);
        taskItem.appendChild(actions);

        tasklist.appendChild(taskItem);

        if(task.done) {
            taskItem.classList.add("done");
        }

        input.addEventListener("click", e => {
            task.done = e.target.checked;
            localStorage.setItem("tasks", JSON.stringify(tasks));

            if(task.done) {
                taskItem.classList.add("done");
            }else {
                taskItem.classList.remove("done");
            }

            DisplayTasks();
        })

        editButton.addEventListener("click", e => {
            const input = content.querySelector("input");
            input.removeAttribute("readonly");
            input.focus();
            input.addEventListener("blur", e => {
                input.setAttribute("readonly", true);
                task.content = e.target.value;
                localStorage.setItem("tasks", JSON.stringify(tasks));
                DisplayTasks(); 
            })
        })
    })

}

    //==== end of new content form ====
    // const form = document.querySelector("#new-task-form");
    // const input = document.querySelector("#new-task-input");
    // const list_el = document.querySelector("#tasks");

//     form.addEventListener("submit", (e) => {
//         e.preventDefault();

//         // fetching the task from the form input line
//         const task = input.value;

//         if(!task) {
//             // alert the user to type a task name before submitting
//             alert("Please fill out the task");
//             return;
//         }

//         // creating the DOM elements to add to the page
//         // creating the task
//         const task_el = document.createElement("div");
//         task_el.classList.add("task");

//         // creating the task content
//         const task_content_el = document.createElement("div");
//         task_content_el.classList.add("content");

//         // appending the content to the related task
//         task_el.appendChild(task_content_el);

//         // creating the task as an DOM element
//         const task_input_el = document.createElement("input");
//         task_input_el.classList.add("text");
//         task_input_el.type = "text";
//         task_input_el.value = task;
//         task_input_el.setAttribute("readonly", "readonly");

//         task_content_el.appendChild(task_input_el);

//         // creating the task action buttons
//         const task_actions_el = document.createElement("div");
//         task_actions_el.classList.add("actions");

//         const task_edit_el = document.createElement("button");
//         task_edit_el.classList.add("edit");
//         task_edit_el.innerHTML = "Edit";

//         const task_delete_el = document.createElement("button");
//         task_delete_el.classList.add("delete");
//         task_delete_el.innerHTML ="Delete";

//         task_actions_el.appendChild(task_edit_el);
//         task_actions_el.appendChild(task_delete_el);

//         task_el.appendChild(task_actions_el);

//         // appending the task to the task list
//         list_el.appendChild(task_el);

//         input.value = "";

//         // adding event listeners to the action buttons to modify the tasks and list
//         task_edit_el.addEventListener("click", () => {
//             if(task_edit_el.innerText.toLowerCase() == "edit"){
//                 task_input_el.removeAttribute("readonly");
//                 task_input_el.focus();
//                 task_edit_el.innerText = "Save";
//             }else {
//                 task_input_el.setAttribute("readonly", "readonly");
//                 task_edit_el.innerText = "Edit"; 
//             }
//         })

//         task_delete_el.addEventListener("click", () => {
//             list_el.removeChild(task_el);
//         })
//     })
// })