export class ToDoTask {
    completed = false
    id = crypto.randomUUID()

    constructor(title, desc="", dueDate, priority="Normal") {
        this.title = title
        this.desc = desc
        this.dueDate = dueDate
        this.priority = priority
    }
}

export class Project {
    listTasks = []

    constructor(name) {
        this.name = name
    }

    add(task) {
        this.listTasks.push(task)
    }

    remove(task) {
        const idx = this.listTasks.findIndex(el => el.id === task.id)
        this.listTasks.splice(idx, 1)
    }
}
