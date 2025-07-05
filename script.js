
  window.onload = function () {
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    savedTasks.forEach(task => addTaskToTable(task.member, task.task, task.priority));
  };

  function getPriorityBadge(priority) {
    switch (priority) {
      case "high":
        return <span class="badge bg-danger">High priority</span>;
      case "middle":
        return <span class="badge bg-warning text-dark">Middle priority</span>;
      case "low":
        return <span class="badge bg-success">Low priority</span>;
      default:
        return '';
    }
  }

  function addTask() {
    const member = document.getElementById("member").value.trim();
    const task = document.getElementById("task").value.trim();
    const priority = document.getElementById("priority").value;

    if (member === "" || task === "") {
      alert("Please fill in all fields.");
      return;
    }

    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push({ member, task, priority });
    localStorage.setItem("tasks", JSON.stringify(tasks));

    addTaskToTable(member, task, priority);

    document.getElementById("member").value = "";
    document.getElementById("task").value = "";
    document.getElementById("priority").value = "high";
  }

  function addTaskToTable(member, task, priority) {
    const tbody = document.getElementById("taskBody");
    const row = document.createElement("tr");
    row.innerHTML = `
      <td><img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp" class="avatar me-2"/> ${member}</td>
      <td>${task}</td>
      <td>${getPriorityBadge(priority)}</td>
      <td>
        <i class="fas fa-check text-success me-3" title="Done" onclick="markDone(this)"></i>
        <i class="fas fa-trash-alt text-warning" title="Remove" onclick="removeTask(this)"></i>
      </td>
    `;
    tbody.appendChild(row);
  }

  function removeTask(el) {
    const row = el.closest("tr");
    const index = [...row.parentNode.children].indexOf(row);

    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.splice(index, 1);
    localStorage.setItem("tasks", JSON.stringify(tasks));

    row.remove();
  }

  function markDone(el) {
    el.closest("tr").style.textDecoration = "line-through";
    el.classList.remove("text-success");
    el.classList.add("text-muted");
  }
