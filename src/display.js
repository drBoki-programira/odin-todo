class DomHandler {

    makeChildOf(parent, tag, properties) {
        // helper function for appending child with multiple properties. returns child element
        const child = document.createElement(tag)
    
        for (const [property, value] of Object.entries(properties)) {
            child[property] = value
        }
    
        parent.appendChild(child)

        return child
    }

    createAddButton(text) {
        return this.makeChildOf(this.topContainer, "button", {"textContent": text})
    }

    remove(child) {
        this.topContainer.removeChild(child)
    }

    add(child) {
        this.topContainer.appendChild(child)
    }

    resetState() {
        this.topContainer.innerHTML = ""
    }
}

export class ProjectContentHandler extends DomHandler {
    topContainer = document.querySelector("#project-content")

    changeName(projectName) {
        const nameElement = document.querySelector(".project>.subtitle")
        nameElement.textContent = projectName
    }

    createTaskElement(task) {
        // creates task element from task data and returns delete button referance
        const taskContainer = this.makeChildOf(this.topContainer, "div", {"className": "task"})
    
        this.makeChildOf(taskContainer, "input", {"type": "checkbox"})
        this.makeChildOf(taskContainer, "span", {"textContent": task.title})
        this.makeChildOf(taskContainer, "span", {"textContent": task.dueDate})
        const delBtn = this.makeChildOf(taskContainer, "button", {"textContent": "Delete"})

        return delBtn
    }

    createNewTaskForm() {
        // creates form like element to collect imput for new task
        this.newTaskContainer = this.makeChildOf(this.topContainer, "div", {})
        this.inputTitle = this.makeChildOf(this.newTaskContainer, "input", {"placeholder": "Title"})
        this.inputDue = this.makeChildOf(this.newTaskContainer, "input", {"placeholder": "Due Date"})
        this.cancelBtn = this.makeChildOf(this.newTaskContainer, "button", {"textContent": "Cancel"})
        this.confirmBtn = this.makeChildOf(this.newTaskContainer, "button", {"textContent": "Confirm"})
    }

    getFormValues() {
        const title = this.inputTitle.value.trim()
        const dueDate = this.inputDue.value.trim()

        return { title, dueDate }
    }
}

export class ListProjectsHandler extends DomHandler {
    topContainer = document.querySelector("#projects-list")

    createListItem(projectName) {
        // creates element with project name and returns it. also returns delete button.
        const li = this.makeChildOf(this.topContainer, "li", {"textContent": projectName})
        const delBtn = this.makeChildOf(this.topContainer, "button", {"textContent": "Delete"})
        return [li, delBtn]
    }

    createNewProjectForm() {
        // creates form like element to collect imput for new project
        this.newProjectContainer = this.makeChildOf(this.topContainer, "li", {})
        this.inputTitle = this.makeChildOf(this.newProjectContainer, "input", {"placeholder": "Project Name"})
        this.cancelBtn = this.makeChildOf(this.newProjectContainer, "button", {"textContent": "Cancel"})
        this.confirmBtn = this.makeChildOf(this.newProjectContainer, "button", {"textContent": "Confirm"})
    }

    getNewProjectName() {
        const name = this.inputTitle.value.trim()

        return name
    }
}
