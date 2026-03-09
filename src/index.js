import "./styles.css"
import { ToDoTask, Project } from "./objects"
import { createTaskElement, TaskForm, createAddButton } from "./display"


const app = function() {
    const projects = [new Project("Miscellaneous")]

    const displayProject = function(project) {
        const projectContent = document.querySelector("#project-content")

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
        const addTask = createAddButton("Add New Task")

        addTask.addEventListener("click", function() {
            const taskForm = new TaskForm()

            // add form like element for creating a new task
            projectContent.removeChild(addTask)
            projectContent.appendChild(taskForm.containerElement)
            
            taskForm.cancelBtn.addEventListener("click", function() {
                projectContent.removeChild(taskForm.containerElement)
                projectContent.appendChild(addTask)
            })

            taskForm.confirmBtn.addEventListener("click", function() {
                const data = taskForm.getValues()
                const newTask = new ToDoTask(data.title, "", data.dueDate)
                project.add(newTask)

                projectContent.removeChild(taskForm.containerElement)
                displayProject(project)
            })
        })

        projectContent.appendChild(addTask)
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