async function listsDetailsButtonClick(id) {

     render(listsDetailsPage());
    document.getElementById('newTaskLink').addEventListener('click', () => tasksEditLinkClick(id));
   
    const item = await ListsRepository.getById(id);
    const tasksTable = document.getElementById('tasksTable');
    const tasks = await TasksRepository.getByParentId(item.id);
    if (tasks === null) {
        return;
    }
    for (let i = 0; i < tasks.length; i++) {
        const currentTask = tasks[i];

        const tr = document.createElement('TR');

        const taskIdTd = document.createElement('TD');
        taskIdTd.innerHTML = currentTask.id;

        const titleTd = document.createElement('TD');
        titleTd.innerHTML = currentTask.title;
        
        const creationTd = document.createElement('TD');
        creationTd.innerHTML = formatDate(currentTask.createDate);

        const creatorTd = document.createElement('TD');
        creatorTd.innerHTML = currentTask.creatorId;

        const dateOfChangeTd = document.createElement('TD');
        dateOfChangeTd.innerHTML = formatDate(currentTask.updateDate);

        const idOfChangeTd = document.createElement('TD');
        idOfChangeTd.innerHTML = currentTask.updaterId;

        const listIdTd = document.createElement('TD');
        currentTask.listId = item.id;
        listIdTd.innerHTML = currentTask.listId;

        const isCompleteTd = document.createElement('input');
        isCompleteTd.type = "checkbox";
        isCompleteTd.innerHTML = currentTask.isComplete;

        const editTd = document.createElement('TD');
        const editButton = document.createElement('BUTTON');
        editButton.innerHTML = 'EDIT';
        editButton.addEventListener('click', () => tasksEditButtonClick(currentTask.id, currentTask.listId));
        editTd.appendChild(editButton);

        const deleteTd = document.createElement('TD');
        const deleteButton = document.createElement('BUTTON');
        deleteButton.innerHTML = 'DELETE';
        deleteButton.addEventListener('click', () => tasksDeleteButtonClick(currentTask.id, id));
        deleteTd.appendChild(deleteButton);

        tr.appendChild(taskIdTd);
        tr.appendChild(titleTd);
        tr.appendChild(creationTd);
        tr.appendChild(creatorTd);
        tr.appendChild(dateOfChangeTd);
        tr.appendChild(idOfChangeTd);
        tr.appendChild(listIdTd);
        tr.appendChild(isCompleteTd);
        tr.appendChild(editTd);
        tr.appendChild(deleteTd);

        tasksTable.appendChild(tr);
    }
}
    
 function tasksEditLinkClick(listId) {
     render(tasksEditPage());

    document.getElementById('listId').value = parseInt(listId);
}
 async function tasksEditButtonClick(id, listId) {
     tasksEditLinkClick();
    
    const item = await TasksRepository.getById(id, listId);
    document.getElementById('id').value = item.id;
    document.getElementById('listId').value = listId;
    document.getElementById('title').value = item.title; 
    document.getElementById('description').value = item.description; 
    document.getElementById('isComplete').checked = item.isComplete;
}
 async function tasksEditFormSubmit() {
    const id = document.getElementById('id').value;
    const listId = document.getElementById('listId').value;
    const title = document.getElementById('title').value;
    const desc = document.getElementById('description').value;
    const isComplete = document.getElementById('isComplete').checked;
   
    const item = new Task(title, desc,isComplete, listId);

    if (id === '') {
       await  TasksRepository.addItem(item);
    } else {
        item.id = id;
       await TasksRepository.editItem(item);
    }
    await listsDetailsButtonClick(listId);
}
 async function tasksDeleteButtonClick(id, parentId) {
   await TasksRepository.deleteItem(id, parentId);
     listsDetailsButtonClick(parentId);
}

async function listsClick() {
     render(listsPage());

    const listsTable = document.getElementById('listsTable');
    const items = await ListsRepository.getAll();
    
    if (items === null) {
        return;
    }
    for (let i = 0; i < items.length; i++) {
        const currentItem = items[i];

        const tr = document.createElement('TR');

        const idTd = document.createElement('TD');
        idTd.innerHTML = currentItem.id;

        const titleTd = document.createElement('TD');
        titleTd.innerHTML = currentItem.title;

        const creatorTd = document.createElement('TD');
        creatorTd.innerHTML = currentItem.creatorId;

        const creationTd = document.createElement('TD');
        creationTd.innerHTML = formatDate(currentItem.createDate);

        const changeDateTd = document.createElement('TD');
        changeDateTd.innerHTML = formatDate(currentItem.updateDate);

        const idOfChangeTd = document.createElement('TD');
        idOfChangeTd.innerHTML = currentItem.updaterId;
      
        const detailsTd = document.createElement('TD');
        const detailsButton = document.createElement('BUTTON');
        detailsButton.innerHTML = 'DETAILS';
        detailsButton.addEventListener('click', () => listsDetailsButtonClick(currentItem.id));
        detailsTd.appendChild(detailsButton);

        const editTd = document.createElement('TD');
        const editButton = document.createElement('BUTTON');
        editButton.innerHTML = 'EDIT';
        editButton.addEventListener('click', () => listsEditButtonClick(currentItem.id));
        editTd.appendChild(editButton);

        const deleteTd = document.createElement('TD');
        const deleteButton = document.createElement('BUTTON');
        deleteButton.innerHTML = 'DELETE';
        deleteButton.addEventListener('click', () => listsDeleteButtonClick(currentItem.id, currentItem.parentId));
        deleteTd.appendChild(deleteButton);

        tr.appendChild(idTd);
        tr.appendChild(titleTd);
        tr.appendChild(creationTd);
        tr.appendChild(creatorTd);
        tr.appendChild(changeDateTd);
        tr.appendChild(idOfChangeTd);
        tr.appendChild(detailsTd);
        tr.appendChild(editTd);
        tr.appendChild(deleteTd);

        listsTable.appendChild(tr);
    }
}
 function listsEditLinkClick() {
     render(listsEditPage());     
}
 async function listsEditButtonClick(id) {
     listsEditLinkClick();
    const item = await ListsRepository.getById(id);

    document.getElementById('id').value = item.id;
    document.getElementById('title').value = item.title;    
}
async function listsEditFormSubmit() {

    const id = document.getElementById('id').value;
    const title = document.getElementById('title').value;
      
    const item = new List(title);

    if (id === '') {
       await  ListsRepository.addItem(item);
    } 
    else {
        item.id = id;
       await  ListsRepository.editItem(item);
    }
        await  listsClick();
}

async function listsDeleteButtonClick(id, parentId) {
   await ListsRepository.deleteItem(id, parentId);
   await  listsClick();
}