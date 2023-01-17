import { submitLoginForm } from '../../controlers/loginController';

export default function login() {
  return {
    template: `<div class="forms-container login-form">
            <h2 class="section-heading">TODO APP</h2>
            <p>Welcome back! Please login to your account.</p>
            <div id="error"></div>
            <form>
              <div>
                <label class="required-input" for="username"></label>
                <input type="text" id="username" name="username" placeholder="Username" />
              </div>
              <div>
                <label class="required-input" for="password"></label>
                <input type="password" id="password" name="password" placeholder="Password" />
              </div>
              <div>
                <input class="button login" type="submit" id="loginBtn" value="Login" />
              </div>
            </form>
        </div>
        <footer>&copy;ScaleFocus Aacademy</footer>
        `,
    listeners: [
      {
        targetId: 'loginBtn',
        eventType: 'click',
        callback: submitLoginForm
      }
    ]
  };
}