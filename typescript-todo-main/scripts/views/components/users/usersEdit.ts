import { submitUserForm } from '../../../controlers/usersController';

export default function usersEdit(action) {
  return {
    template: `
    <h2 class="section-heading user-head">${action} user</h2>
    <input type="hidden" id="id" name="id" />
    <input type="hidden" id="createDate" name= "createDate"/>
    <input type="hidden" id="updateDate" name= "updateDate"/>
      <div class="form-holder">
        <div class="user-form">
        <form class ="forms">
         <div class= "name-input">
        <label class ="labels" for="firstName">First Name</label>
        <input class="user-field" type = "text" class = "form-input" id ="firstName" name = "firstName">
        <label class ="labels" for = "username">Username</label>
        <input class="user-field" type = "text" class = "form-input" id = "username" name = "username">
        </div>
          <div class= "user-input">
        <label class ="labels" for="lastName">Last Name</label>
        <input class="user-field" type="text" class = "form-input" id="lastName" name="lastName">
        <label class ="labels" for="password">Password</label>
        <input class="user-field" type="password" class = "form-input" id="password" name="password">
         </div>
      </form> 
      <div class="users-buttons">
           <label for = "isAdmin">Admin:</label>
          <input type = "checkbox" id ="isAdmin" name = "isAdmin">
          <input class="button user-form-button" type="submit" id="editUserBtn" value=${action}user />
           </div> 
           </div>
        </div>`,
    listeners: [
      {
        targetId: 'editUserBtn',
        eventType: 'click',
        callback: submitUserForm
      }
    ]
  };
}