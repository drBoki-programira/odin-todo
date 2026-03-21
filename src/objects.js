import { formatDistance, isSameDay, isAfter } from "date-fns"

export class ToDoTask {
    completed = false
    createdDate = new Date()
    id = crypto.randomUUID()

    constructor(title, desc="", dueDate, priority="normal") {
        this.title = title
        this.desc = desc
        this.dueDate = new Date(dueDate)
        this.priority = priority
    }

    dueIn() {
        const now = new Date()

        if (isSameDay(this.dueDate, now) || isAfter(this.dueDate, now)) {
            const distance = formatDistance(this.dueDate, now)
            return `Due in ${distance}`
        } else {
            return "Due time has passed"
        }
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
