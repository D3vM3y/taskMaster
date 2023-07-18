window.addEventListener("load", () => {
    const form = document.querySelector("#new-task-form");
    const input = document.querySelector("#new-task-input");
    const list_el = document.querySelector("#tasks");

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        // fetching the task from the form input line
        const task = input.value;

        if(!task) {
            // alert the user to type a task name before submitting
            alert("Please fill out the task");
            return;
        }

        // creating the DOM elements to add to the page
        // creating the task
        const task_el = document.createElement("div");
        task_el.classList.add("task");

        // creating the task content
        const task_content_el = document.createElement("div");
        task_content_el.classList.add("content");
        task_content_el.innerText = task;

        // appending the content to the related task
        task_el.appendChild(task_content_el);

        // appending the task to the task list
        list_el.appendChild(task_el);
    })
})