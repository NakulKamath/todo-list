const view = document.querySelector("#view");
const taskform = document.querySelector('#task');
const projectform = document.querySelector('#project');
const submitTask = document.querySelector('#submitTask');
const submitProject = document.querySelector('#submitProject');
const cover = document.querySelector('#cover');
const announcer = document.querySelector('#announcer');
const header = document.querySelector('#header');

const taskbtn = document.querySelector("#createTask");
const closetaskbtn = document.querySelector("#closeTask");
const projectbtn = document.querySelector('#createProject');
const closeprojectbtn = document.querySelector('#closeProject');

const taskname = document.querySelector('#nameTask');
const taskdate = document.querySelector('#dateTask');
const lowTask = document.querySelector('#lowTask');
const mediumTask = document.querySelector('#mediumTask');
const highTask = document.querySelector('#highTask');

const projectname = document.querySelector('#nameProject');
const projectsList = document.querySelector('#projects');

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
async function createTask(name, priority, date, project) {
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
    if (priority == 'Low') {
        task.style.border = '1px solid green';
    } else if (priority == 'Medium') {
        task.style.border = '1px solid yellow';
    } else {
        task.style.border = '1px solid red';
    }
    currentSession.tasks[project].push({name, priority, date});
    announcer.textContent = 'Successfully created task - ' + name;
    announcer.style.border = '2px solid green';
    announcer.classList.remove('hidden');
    await timer(4000);
    announcer.classList.add('hidden');
}
function renderProject(project) {
    view.innerHTML = '';
    header.textContent = currentSession.projects[project];
    for (i = 0 ; i < currentSession.tasks[project].length; i++) {
        taskObject = currentSession.tasks[project][i];
        let task = document.createElement('div');
        let nameElement = document.createElement('p');
        let dateElement = document.createElement('p');
        let priorityElement = document.createElement('p');
        nameElement.textContent = "Task : " + taskObject.name;
        dateElement.textContent = "Due on : " + taskObject.date;
        priorityElement.textContent = "Priority : " + taskObject.priority;
        nameElement.style.fontWeight = 600;
        task.classList.add('task');
        task.appendChild(nameElement);
        task.appendChild(dateElement);
        task.appendChild(priorityElement);
        view.appendChild(task);
        if (taskObject.priority == 'Low') {
            task.style.border = '1px solid green';
        } else if (taskObject.priority == 'Medium') {
            task.style.border = '1px solid yellow';
        } else {
            task.style.border = '1px solid red';
        }
    }
}
async function createProject(name) {
    let project = document.createElement('li');
    project.textContent = name;
    project.id = "project" + currentSession.projects.length;
    project.addEventListener('click', () => {
        projectSelect(project.id);
    })
    currentSession.projects.push(name);
    currentSession.tasks.push([]);
    projectsList.appendChild(project);
    announcer.textContent = 'Successfully created project - ' + name;
    announcer.style.border = '2px solid green';
    announcer.classList.remove('hidden');
    await timer(4000);
    announcer.classList.add('hidden');
}
function clearTask() {
    taskname.value = '';
    taskdate.value = '';
    mediumTask.checked = true;
}
function clearProject() {
    projectname.value = '';
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
submitTask.addEventListener('click', async () => {
    if (taskname.value == '' || taskdate.value == '') {
        announcer.textContent = 'Please fill all fields';
        announcer.style.border = '2px solid red';
        announcer.classList.remove('hidden');
        await timer(2000);
        announcer.classList.add('hidden');
        return;
    }
    if (lowTask.checked) {
        createTask(taskname.value, 'Low', taskdate.value, currentSession.currentProject);
    } else if (mediumTask.checked) {
        createTask(taskname.value, 'Medium', taskdate.value, currentSession.currentProject);
    } else {
        createTask(taskname.value, 'High', taskdate.value, currentSession.currentProject);
    }
    clearTask();
    closetask();
})
submitProject.addEventListener('click', async() => {
    if (projectname.value == '') {
        announcer.textContent = 'Please fill all fields';
        announcer.style.border = '2px solid red';
        announcer.classList.remove('hidden');
        await timer(2000);
        announcer.classList.add('hidden');
        return;
    }
    if (currentSession.projects.length >= 5) {
        submitProject.disabled = true;
        submitProject.style.backgroundColor = 'red';
        announcer.textContent = 'You have reached the limit of 5 projects';
        announcer.style.border = '2px solid red';
        announcer.classList.remove('hidden');
        await timer(2000);
        announcer.classList.add('hidden');
        return
    }
    createProject(projectname.value);
    clearProject();
    closeproject();
})
function projectSelect(id) {
    let projectOld = document.querySelector('#project'+currentSession.currentProject);
    let projectNew = document.querySelector('#'+id);
    projectOld.classList.remove('selected');
    projectNew.classList.add('selected');
    currentSession.currentProject = parseInt(id.slice(-1));
    renderProject(currentSession.currentProject);
}

async function timer(x) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(x);
      }, x);
    });
  }