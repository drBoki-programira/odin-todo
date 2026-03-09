const makeChildOf = function(parent, tag, properties) {
    const child = document.createElement(tag)

    for (const [property, value] of Object.entries(properties)) {
        child[property] = value
    }

    parent.appendChild(child)
}

export const createTaskElement = function(task) {
    const taskContainer = document.createElement("div")
    taskContainer.setAttribute("class", "task")

    makeChildOf(taskContainer, "input", {"type": "checkbox"})
    makeChildOf(taskContainer, "span", {"textContent": task.title})
    makeChildOf(taskContainer, "span", {"textContent": task.dueDate})
    makeChildOf(taskContainer, "button", {"textContent": "Delete", "className": "deleteBtn"})

    return taskContainer
}

export const createAddButton = function(text) {
    const add = document.createElement("button")

    add.textContent = text

    return add
}

export class TaskForm {
    constructor() {
        this.containerElement = document.createElement("div")
        this.inputTitle = document.createElement("input")
        this.inputDue = document.createElement("input")
        this.cancelBtn = document.createElement("button")
        this.confirmBtn = document.createElement("button")
        this.init()
    }

    init() {
        this.inputTitle.placeholder = "Title"
        this.inputDue.placeholder = "Due Date"
        this.cancelBtn.textContent = "cancel"
        this.confirmBtn.textContent = "confirm"

        this.containerElement.appendChild(this.inputTitle)
        this.containerElement.appendChild(this.inputDue)
        this.containerElement.appendChild(this.cancelBtn)
        this.containerElement.appendChild(this.confirmBtn)
    }

    getValues() {
        const title = this.inputTitle.value.trim()
        const dueDate = this.inputDue.value.trim()

        return { title, dueDate }
    }
}