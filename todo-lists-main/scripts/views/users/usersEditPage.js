function usersEditPage() {
    return `<input type="hidden" id="id" name="id" />
   
        <legend class = "create">Create User</legend>
        <div class = "form-container">
        <form class ="forms">
        <div class ="rows">
          <div class ="columns">
        <label class ="labels" for="username">Username:</label>
        <input type="text" class = "form-input" id="username" name="username">
          </div>
          <div class ="columns"> 
        <label class ="labels" for="password">Password:</label>
        <input type="password" class = "form-input" id="password" name="password">
          </div>
          <div class ="columns">
        <label class ="labels" for="firstName">First Name:</label>
        <input type = "text" class = "form-input" id ="firstName" name = "firstName">
        </div>
        <div class ="columns">
        <label class ="labels" for = "lastName">Last Name:</label>
        <input type = "text" class = "form-input" id = "lastName" name = "lastName">
          </div>
        </div>  
        <label for = "isAdmin">isAdmin:</label>
        <input type = "checkbox" id ="isAdmin" name = "isAdmin">
        <input type="button" onclick="usersEditFormSubmit()" value="Save" />
      </form> 
      </div>
   `;
}