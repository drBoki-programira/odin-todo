import "./styles.css"
import { ToDoTask, Project } from "./objects"
import { createTaskElement, createTaskForm, createAddTaskButton } from "./display"


const app = function() {
    const projects = []
    const projectContent = document.querySelector("#project-content")
    const projectsList = document.querySelector("#projects-list")

    const displayProject = function(project) {
        // change name of the displayed project
        const projectName = document.querySelector(".project>.subtitle")
        projectName.textContent = project.name

        // display all the tasks
        projectContent.innerHTML = ""
        project.listTasks.forEach(function(task) {
            
            const taskElement =  createTaskElement(task)
            const deleteTask = taskElement.querySelector("button")

            deleteTask.addEventListener("click", function() {
                project.remove(task)
                displayProject(project)
            })

            projectContent.appendChild(taskElement)
        })

        // add new task button at the end
        const addTask = createAddTaskButton()

        addTask.addEventListener("click", function() {
            const taskForm = createTaskForm()

            projectContent.removeChild(addTask)
            projectContent.appendChild(taskForm)
        })

        projectContent.appendChild(addTask)
    }

    const listAllProjects = function() {
        this.projects.forEach(function (project) {
            const liELement = document.createElement("li")

            liELement.textContent = project.name
            liELement.addEventListener("click", () => displayProject(project))

            projectsList.appendChild(liELement)
        })
    }

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