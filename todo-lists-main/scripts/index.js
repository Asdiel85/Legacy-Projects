    window.addEventListener('DOMContentLoaded', init);


    function init() {
     render (homePage());
     handleMenu();
    }    

 function render(innerHtml) {
    let contentDiv =  document.getElementById('content');
    contentDiv.innerHTML = innerHtml;
}

 function handleMenu() {

    const loggedUser =  AuthenticationService.getLoggedUser();
  
    if (loggedUser === null) {
        document.getElementById('loginLink').style.display = '';
        document.getElementById('homeLink').style.display = '';
        document.getElementById('usersLink').style.display = 'none';
        document.getElementById('lists').style.display = 'none';
        document.getElementById('logoutLink').style.display = 'none';
        return;
    } else {
        document.getElementById('logoutLink').style.display = '';
        document.getElementById('loginLink').style.display = 'none';
    }

    if (loggedUser.isAdmin) {

        document.getElementById('usersLink').style.display = '';
        document.getElementById('lists').style.display = '';
    } else {
        document.getElementById('lists').style.display = '';
        document.getElementById('usersLink').style.display = 'none';
    }
}