const view = document.querySelector("#view");
const taskform = document.querySelector('#task');
const projectform = document.querySelector('#project');
const submitTask = document.querySelector('#submitTask');
const submitProject = document.querySelector('#submitProject');
const cover = document.querySelector('#cover');

const taskbtn = document.querySelector("#createTask");
const closetaskbtn = document.querySelector("#closeTask");
const projectbtn = document.querySelector('#createProject');
const closeprojectbtn = document.querySelector('#closeProject');

const taskname = document.querySelector('#nameTask');
const taskdate = document.querySelector('#dateTask');
const lowTask = document.querySelector('#lowTask');
const mediumTask = document.querySelector('#mediumTask');
const highTask = document.querySelector('#highTask');

currentSession = {
    currentProject : 0,
    projects : ["My tasks"],
    tasks : [[]],
}

function newtask() {
    projectform.classList.add('hidden');
    taskform.classList.remove('hidden');
    cover.classList.remove('hidden');
}
function closetask() {
    taskform.classList.add('hidden');
    cover.classList.add('hidden');
}
function newproject() {
    taskform.classList.add('hidden');
    projectform.classList.remove('hidden');
    cover.classList.remove('hidden');
}
function closeproject() {
    projectform.classList.add('hidden');
    cover.classList.add('hidden');
}
function createTask(name, priority, date, project) {
    if (name == '' || date == '') return
    let task = document.createElement('div');
    let nameElement = document.createElement('p');
    let dateElement = document.createElement('p');
    let priorityElement = document.createElement('p');
    nameElement.textContent = "Task : " + name;
    dateElement.textContent = "Due on : " + date;
    priorityElement.textContent = "Priority : " + priority;
    nameElement.style.fontWeight = 600;
    task.classList.add('task');
    task.appendChild(nameElement);
    task.appendChild(dateElement);
    task.appendChild(priorityElement);
    view.appendChild(task);
    currentSession.tasks[project].push({name, priority, date});
}
function createProject() {

}

taskbtn.addEventListener('click', () => {
    newtask();
})
closetaskbtn.addEventListener('click', () => {
    closetask();
})
projectbtn.addEventListener('click', () => {
    newproject();
})
closeprojectbtn.addEventListener('click', () => {
    closeproject();
})
submitTask.addEventListener('click', () => {
    if (lowTask.checked) {
        createTask(taskname.value, 'Low', taskdate.value, currentSession.currentProject);
    } else if (mediumTask.checked) {
        createTask(taskname.value, 'Medium', taskdate.value, currentSession.currentProject);
    } else {
        createTask(taskname.value, 'High', taskdate.value, currentSession.currentProject);
    }
    closetask();
})