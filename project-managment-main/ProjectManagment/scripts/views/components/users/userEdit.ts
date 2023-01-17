import { submitUserFom} from "../../../controlers/usersController";

export default function userEdit (action) {
    return {
        template: `   
        <div id="edit-user" class="modal user-form-holder">
        <form class="form user-form modal-form modal-content" action="#">
        <h3> ${action} User</h3>
        <input type="hidden" id="id" name="id" > 
        <input id="firstName" type="text" placeholder="First name">
        <input id="lastName" type="text" placeholder="Last name">
        <input id="username" type="text" placeholder="username">
        <input id="password" type="password" placeholder="password">
        <div>
        <label for = "isAdmin">Admin:</label>
        <input class="checkbox" type = "checkbox" id ="isAdmin" name = "isAdmin">  
        </div>
        <input class="button login-button close-modal modal-close-btn" type="submit" value = ${action}User  id= "closeForm" />
       </form>
   </div>`,

   listeners: [
    {
        targetId: 'closeForm',
        eventType: 'click',
        callback: submitUserFom, 
    }
   ]
    }
}