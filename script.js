document.addEventListener("DOMContentLoaded", () => {
    const todoForm = document.getElementById("todoForm");
    const todoInput = document.getElementById("todoInput");
    const todoList = document.getElementById("todoList");
    const filterButtons = document.querySelectorAll(".filters button");
    const clearCompleted = document.getElementById("clearCompleted");
    const themeToggle = document.getElementById("themeToggle");

    let todos = JSON.parse(localStorage.getItem("todos")) || [];
    let filter = "all";

    const saveTodos = () => localStorage.setItem("todos", JSON.stringify(todos));

    const renderTodos = () => {
        todoList.innerHTML = "";
        let filteredTodos = todos.filter(t =>
            filter === "all" ? true :
                filter === "completed" ? t.completed :
                    !t.completed
        );

        filteredTodos.forEach((t, index) => {
            const item = document.createElement("div");
            item.className = "todo-item";

            item.innerHTML = `
                <div class="left">
                    <div class="checkbox ${t.completed ? "checked" : ""}" data-index="${index}">
                        ${t.completed ? "✔" : ""}
                    </div>
                    <div class="task-text ${t.completed ? "completed" : ""}">${t.text}</div>
                </div>
                <div class="actions">
                    <button data-index="${index}" class="delete-btn">✖</button>
                </div>
            `;

            todoList.appendChild(item);
        });
    };

    todoForm.addEventListener("submit", e => {
        e.preventDefault();
        const text = todoInput.value.trim();
        if (!text) return;
        todos.push({ text, completed: false });
        todoInput.value = "";
        saveTodos();
        renderTodos();
    });

    todoList.addEventListener("click", e => {
        const index = e.target.dataset.index;
        if (e.target.classList.contains("checkbox")) {
            todos[index].completed = !todos[index].completed;
        }
        if (e.target.classList.contains("delete-btn")) {
            todos.splice(index, 1);
        }
        saveTodos();
        renderTodos();
    });

    filterButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            filterButtons.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            filter = btn.dataset.filter;
            renderTodos();
        });
    });

    clearCompleted.addEventListener("click", () => {
        todos = todos.filter(t => !t.completed);
        saveTodos();
        renderTodos();
    });

    // DARK MODE
    themeToggle.addEventListener("click", () => {
        document.body.classList.toggle("dark");
        themeToggle.textContent = document.body.classList.contains("dark") ? "☀️" : "🌙";
    });

    renderTodos();
});
