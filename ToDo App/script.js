document.addEventListener("DOMContentLoaded", () => {
    const taskInput = document.getElementById("taskInput");
    const addTaskBtn = document.getElementById("addTaskBtn");
    const taskList = document.getElementById("taskList");

    addTaskBtn.addEventListener("click", () => {
        const taskText = taskInput.value.trim();
        if (taskText !== "") {
            const li = document.createElement("li");

            // 📅 Get Current Date & Time
            const now = new Date();
            const dateString = now.toLocaleDateString('en-GB'); // Format: DD/MM/YYYY
            const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });

            // 🕒 Date-Time Element
            const timeSpan = document.createElement("small");
            timeSpan.textContent = `📅 ${dateString} ⏰ ${timeString}`;
            timeSpan.style.fontSize = "12px";
            timeSpan.style.color = "#777";

            // 📌 Task Text Container (to prevent overlap)
            const textContainer = document.createElement("div");
            textContainer.classList.add("task-text");
            textContainer.appendChild(timeSpan);

            const taskSpan = document.createElement("span");
            taskSpan.textContent = taskText;
            taskSpan.style.fontSize = "16px";
            textContainer.appendChild(taskSpan);

            // 🗑 Delete Button
            const deleteBtn = document.createElement("button");
            deleteBtn.innerHTML = "🗑";
            deleteBtn.classList.add("delete-btn");
            deleteBtn.addEventListener("click", () => li.remove());

            // 📝 Append Elements
            li.appendChild(textContainer);  // Wrap text
            li.appendChild(deleteBtn);      // Delete button stays separate
            taskList.appendChild(li);

            // 🔄 Clear Input
            taskInput.value = "";
        }
    });
});
