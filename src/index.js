import "./styles.css"
import { ToDoTask, Project } from "./objects"
import { ProjectContentHandler, ListProjectsHandler, TaskDetailsHandler } from "./display"


const app = function() {
    const projects = []

    const remove = function(project) {
        const idx = projects.findIndex(proj => proj.name === project.name)
        projects.splice(idx, 1)
    }

    const saveProjects = function() {
        localStorage.clear()
        localStorage.setItem("projects", JSON.stringify(projects))
    }

    const loadProjects = function() {
        const projectsJSON = localStorage.getItem("projects")
        const storedProjects = JSON.parse(projectsJSON)

        for (const project of storedProjects) {
            const storedProject = new Project(project.name)

            for (const taskData of project.listTasks) {
                const storedTask = ToDoTask.fromStored(taskData)
                storedProject.add(storedTask)
            }

            projects.push(storedProject)
        }
    }

    const displayTaskDetails = function(task) {
        const taskHandler = new TaskDetailsHandler()
        taskHandler.resetState()

        if (task) {
            taskHandler.displayDetails(task)
        } else {
            taskHandler.createInfoMessage("Click on a task for more details")
        }
    }

    const displayProject = function(project) {
        saveProjects()

        const handler = new ProjectContentHandler()
        handler.resetState()

        if (project) {
            handler.changeName(project.name)

            project.listTasks.forEach(function(task) {
                const [deleteTaskBtn, checkBoxBtn, checkMark, taskContainer] = handler.createTaskElement(task)

                deleteTaskBtn.addEventListener("click", function(event) {
                    event.stopPropagation()
                    project.remove(task)
                    displayProject(project)
                    displayTaskDetails()
                })

                checkBoxBtn.addEventListener("click", function(event) {
                    event.stopPropagation()
                    if (checkMark.checked) {
                        handler.completeTask(taskContainer)
                        task.completed = true
                    } else {
                        handler.uncompleteTask(taskContainer)
                        task.completed = false
                    }
                })

                taskContainer.addEventListener("click", function() {
                    displayTaskDetails(task)
                })
            })

            const addTaskBtn = handler.createAddButton("New Task")

            addTaskBtn.addEventListener("click", function() {
                handler.createNewTaskForm()
                handler.remove(addTaskBtn)
                
                handler.cancelBtn.addEventListener("click", function() {
                    handler.remove(handler.newTaskContainer)
                    handler.add(addTaskBtn)
                })

                handler.confirmBtn.addEventListener("click", function() {
                    const data = handler.getFormValues()
                    const newTask = new ToDoTask(data.title, data.desc, data.dueDate, data.priority)
                    project.add(newTask)

                    handler.remove(handler.newTaskContainer)
                    displayProject(project)
                })
            })
        } else {
            handler.changeName("Project Not Selected")
            handler.createInfoMessage("Select a project or create a new one.")
        }
    }

    const listAllProjects = function() {
        saveProjects()

        const handler = new ListProjectsHandler()
        handler.resetState()
        
        projects.forEach(function (project) {
            const [listItem, delBtn] = handler.createListItem(project.name)

            listItem.addEventListener("click", () => {
                displayProject(project)
                displayTaskDetails()
            })
            
            delBtn.addEventListener("click", function() {
                remove(project)
                displayProject()
                displayTaskDetails()
                listAllProjects()
            })
        })

        const addProjectBtn = handler.createAddButton("New Project")
        addProjectBtn.addEventListener("click", function() {
            handler.createNewProjectForm()
            handler.remove(addProjectBtn)

            handler.cancelBtn.addEventListener("click", function() {
                handler.remove(handler.newProjectContainer)
                handler.add(addProjectBtn)
            })

            handler.confirmBtn.addEventListener("click", function() {
                const newName = handler.getNewProjectName()
                const newProject = new Project(newName)

                projects.push(newProject)
                handler.remove(handler.newProjectContainer)
                listAllProjects()
            })
        })
    }

    if (localStorage.projects) {
        loadProjects()
    } else {
        projects.push(new Project("Miscellaneous"))
    }

    displayProject()
    listAllProjects()

    return { displayProject, listAllProjects, projects } 
} ()

// const proj1 = new Project("Misc")
// const proj2 = new Project("Chores")
// const proj3 = new Project("Music")
// const task1 = new ToDoTask("buy shoes", "something something", "2026-02-26", "high")
// const task2 = new ToDoTask("buy milk", "words", "2026-03-28", "low")
// const task3 = new ToDoTask("clean apt", "", "2026-05-26")
// const task4 = new ToDoTask("listen mozzart", "yo yoy yo", "2026-05-26")
// const task5 = new ToDoTask("write symphony", "", "2026-05-26")

// proj1.add(task1)
// proj1.add(task2)
// proj2.add(task3)
// proj3.add(task4)
// proj3.add(task5)

// app.projects.push(proj1)
// app.projects.push(proj2)
// app.projects.push(proj3)

// app.displayProject(proj1)
// app.listAllProjects()
