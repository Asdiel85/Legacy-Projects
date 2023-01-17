function loginPage() {
    return `
    <legend class ="create">Login</legend>
    <div class ="form-container">
    <form class ="forms">
    <div class ="rows">
          <div class ="columns">
    <label class ="labels" for="uname">Username:</label>
    <input class = "form-input" type="text" id="username" name="username"><br>
    <label class ="labels" for="lname">Password:</label>
    <input class = "form-input" type="password" id="password" name="password"><br>
    </div>
        </div>
            <input id="loginBtn" type="button" onclick="loginFormSubmit()" value="Login">
            </form>
   
    </div>
    `;
}