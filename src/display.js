export class ProjectContentHandler {
    topContainer = document.querySelector("#project-content")

    changeName(projectName) {
        const nameElement = document.querySelector(".project>.subtitle")
        nameElement.textContent = projectName
    }

    resetState() {
        this.topContainer.innerHTML = ""
    }

    #makeChildOf(parent, tag, properties) {
        // helper function for appending child with multiple properties. returns child element
        const child = document.createElement(tag)
    
        for (const [property, value] of Object.entries(properties)) {
            child[property] = value
        }
    
        parent.appendChild(child)

        return child
    }

    createTaskElement(task) {
        // creates task element from task data and returns delete button referance
        const taskContainer = this.#makeChildOf(this.topContainer, "div", {"className": "task"})
    
        this.#makeChildOf(taskContainer, "input", {"type": "checkbox"})
        this.#makeChildOf(taskContainer, "span", {"textContent": task.title})
        this.#makeChildOf(taskContainer, "span", {"textContent": task.dueDate})
        const delBtn = this.#makeChildOf(taskContainer, "button", {"textContent": "Delete"})

        return delBtn
    }

    createAddButton(text) {
        return this.#makeChildOf(this.topContainer, "button", {"textContent": text})
    }

    createNewTaskForm() {
        // creates form like element to collect imput for new task and returns cancel and confirm buttons
        this.newTaskContainer = this.#makeChildOf(this.topContainer, "div", {})
        this.inputTitle = this.#makeChildOf(this.newTaskContainer, "input", {"placeholder": "Title"})
        this.inputDue = this.#makeChildOf(this.newTaskContainer, "input", {"placeholder": "Due Date"})
        this.cancelBtn = this.#makeChildOf(this.newTaskContainer, "button", {"textContent": "Cancel"})
        this.confirmBtn = this.#makeChildOf(this.newTaskContainer, "button", {"textContent": "Confirm"})
    }

    remove(child) {
        this.topContainer.removeChild(child)
    }

    add(child) {
        this.topContainer.appendChild(child)
    }

    getFormValues() {
        const title = this.inputTitle.value.trim()
        const dueDate = this.inputDue.value.trim()

        return { title, dueDate }
    }
}



export const createAddButton = function(text) {
    const add = document.createElement("button")

    add.textContent = text

    return add
}
