export const createTaskElement = function(task) {
    const taskContainer = document.createElement("div")
    const checkMark = document.createElement("input")
    const taskTitle = document.createElement("span")
    const taskDue = document.createElement("span")
    const delBtn = document.createElement("button")

    taskContainer.setAttribute("class", "task")
    checkMark.setAttribute("type", "checkbox")
    taskTitle.textContent = task.title
    taskDue.textContent = task.dueDate
    delBtn.textContent = "DELETE"

    taskContainer.appendChild(checkMark)
    taskContainer.appendChild(taskTitle)
    taskContainer.appendChild(taskDue)
    taskContainer.appendChild(delBtn)

    return taskContainer
}

export const createTaskForm = function() {
    const taskContainer = document.createElement("form")
    const taskTitle = document.createElement("input")
    const taskDue = document.createElement("input")

    taskContainer.appendChild(taskTitle)
    taskContainer.appendChild(taskDue)

    return taskContainer
}

export const createAddTaskButton = function() {
    const add = document.createElement("button")

    add.textContent = "Add new task"

    return add
}