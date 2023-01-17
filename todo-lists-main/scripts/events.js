async function usersLinkClick() {

     render(usersPage());
    const usersTable = document.getElementById('usersTable');
   
    const items = await UsersRepository.getAll();
    if (items === null) {
        return;
    }

    for (let i = 0; i < items.length; i++) {
        const currentItem = items[i];

        const tr = document.createElement('TR');

        const usernameTd = document.createElement('TD');
        usernameTd.innerHTML = currentItem.username;

        const passwordTd = document.createElement('TD');
      //  Removed password field in order not to be changed to 'unindentified.

        const firstNameTd = document.createElement('TD');
        firstNameTd.innerHTML = currentItem.firstName;

        const lastNameTd = document.createElement('TD');
        lastNameTd.innerHTML = currentItem.lastName;

        const isAdminTd = document.createElement('TD');
        isAdminTd.innerHTML = currentItem.isAdmin;

        const idTd = document.createElement('TD');
        idTd.innerHTML = currentItem.id;

        const dateTd = document.createElement('TD');
        dateTd.innerHTML = formatDate(currentItem.createDate); 


        const createIdTd = document.createElement('TD');
        createIdTd.innerHTML = currentItem.creatorId;
         
        
        const updatedTd = document.createElement('TD');
        updatedTd.innerHTML = formatDate(currentItem.updateDate);

        const updatedIdTd = document.createElement('TD');
        updatedIdTd.innerHTML = currentItem.updaterId;


        const editTd = document.createElement('TD');
        
        const editButton = document.createElement('BUTTON');
        editButton.innerHTML = 'EDIT';
        editButton.addEventListener('click', () => usersEditButtonClick(currentItem.id));
        editTd.appendChild(editButton);

        const deleteTd = document.createElement('TD');
        const deleteButton = document.createElement('BUTTON');
        deleteButton.innerHTML = 'DELETE';
        deleteButton.addEventListener('click', () => usersDeleteButtonClick(currentItem.id));
        deleteTd.appendChild(deleteButton);

        tr.appendChild(usernameTd);
        tr.appendChild(passwordTd);
        tr.appendChild(firstNameTd);
        tr.appendChild(lastNameTd);
        tr.appendChild(isAdminTd);
        tr.appendChild(idTd);
        tr.appendChild(dateTd);
        tr.appendChild(createIdTd);
        tr.appendChild(updatedTd);
        tr.appendChild(updatedIdTd);
        tr.appendChild(editTd);
        tr.appendChild(deleteTd);

        usersTable.appendChild(tr);
    }
}

 function usersEditLinkClick() {
     render(usersEditPage());
}

async function usersEditButtonClick(id) {

     usersEditLinkClick();
    const item = await UsersRepository.getById(id);

    document.getElementById('id').value = item.id;
    document.getElementById('username').value = item.username;
    document.getElementById('password').value = item.password;
    document.getElementById('firstName').value = item.firstName;
    document.getElementById('lastName').value = item.lastName;
    document.getElementById('isAdmin').checked = item.isAdmin;   
}
   
async function usersEditFormSubmit() {
    const id = document.getElementById('id').value;
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const isAdmin = document.getElementById('isAdmin').checked;
   
    const item = new User(username, password, firstName, lastName, isAdmin); 
       
    if (id === '') {
      await   UsersRepository.addItem(item);
    } 
    else {
        item.id = id;
      await   UsersRepository.editItem(item);
    }

    await usersLinkClick();
}

async function usersDeleteButtonClick(id) {

    await UsersRepository.deleteItem(id);
    await  usersLinkClick();
}

 function homeLinkClick() {

     render(homePage());
}

 function loginLinkClick() {

     render(loginPage());
}

 async function loginFormSubmit() {

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    await  AuthenticationService.authenticate(username, password);
    const loggedUser = await AuthenticationService.getLoggedUser();
        
    if (loggedUser != null) {
         render(homePage());
         handleMenu();
    } 
    else {
        document.getElementById('error').innerHTML = "User doesn't exist";
    }
}

 function logoutLinkClick() {

     AuthenticationService.logout();
     handleMenu();
     render(homePage());
}