document.addEventListener("DOMContentLoaded", () => {
    const taskInput = document.getElementById("taskInput");
    const addTaskBtn = document.getElementById("addTaskBtn");
    const taskList = document.getElementById("taskList");

    addTaskBtn.addEventListener("click", () => {
        const taskText = taskInput.value.trim();
        if (taskText !== "") {
            const li = document.createElement("li");
            li.textContent = taskText;
            
            const deleteBtn = document.createElement("button");
            deleteBtn.innerHTML = "🗑";
            deleteBtn.classList.add("delete-btn");
            deleteBtn.addEventListener("click", () => {
                li.remove();
            });
            
            li.appendChild(deleteBtn);
            taskList.appendChild(li);
            taskInput.value = "";
        }
    });
});