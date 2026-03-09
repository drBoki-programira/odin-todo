import "./styles.css"
import { ToDoTask, Project } from "./objects"
import { createAddButton, ProjectContentHandler } from "./display"


const app = function() {
    const projects = [new Project("Miscellaneous")]

    const displayProject = function(project) {
        const projectContent = document.querySelector("#project-content") // should delete

        const handler = new ProjectContentHandler()
        handler.changeName(project.name)
        handler.resetState()

        project.listTasks.forEach(function(task) {
            const deleteTaskBtn = handler.createTaskElement(task)

            deleteTaskBtn.addEventListener("click", function() {
                project.remove(task)
                displayProject(project)
            })
        })

        const addTaskBtn = handler.createAddButton("Add New Task")

        addTaskBtn.addEventListener("click", function() {
            handler.createNewTaskForm()
            handler.remove(addTaskBtn)
            
            handler.cancelBtn.addEventListener("click", function() {
                handler.remove(handler.newTaskContainer)
                handler.add(addTaskBtn)
            })

            handler.confirmBtn.addEventListener("click", function() {
                const data = handler.getFormValues()
                const newTask = new ToDoTask(data.title, "", data.dueDate)
                project.add(newTask)

                handler.remove(handler.newTaskContainer)
                displayProject(project)
            })
        })
    }

    const listAllProjects = function() {
        const projectsList = document.querySelector("#projects-list")
        
        projects.forEach(function (project) {
            const liELement = document.createElement("li")

            liELement.textContent = project.name
            liELement.addEventListener("click", () => displayProject(project))

            projectsList.appendChild(liELement)
        })
        const addProject = createAddButton("Add New Project")

        addProject.addEventListener("click", function() {
            projectsList.removeChild(addProject)
        })

        projectsList.appendChild(addProject)
    }

    displayProject(projects[0])
    listAllProjects()

    return { displayProject, listAllProjects, projects } 
} ()

const proj1 = new Project("Misc")
const proj2 = new Project("Chores")
const proj3 = new Project("Music")
const task1 = new ToDoTask("buy shoes", "", "26.5.26")
const task2 = new ToDoTask("buy milk", "", "28.5.26")
const task3 = new ToDoTask("clean apt", "", "26.5.26")
const task4 = new ToDoTask("listen mozzart", "", "26.5.26")
const task5 = new ToDoTask("write symphony", "", "26.5.26")

proj1.add(task1)
proj1.add(task2)
proj2.add(task3)
proj3.add(task4)
proj3.add(task5)

app.projects.push(proj1)
app.projects.push(proj2)
app.projects.push(proj3)

app.displayProject(proj1)
app.listAllProjects()