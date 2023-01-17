import { submitLoginForm } from "../../controlers/loginController";

export default function login() {
    return {
        template: `
        <div class="weclome-message">
        <div class="welcome-text">
        <h1>Welcome Back!</h1>
        <p>To keep connected with us please</p>
        <p>Sign in with your credentials</p>
        </div>
     </div>
        <div class="login">
        <div class="login-side">
        <h2 class="login-h2"> Project Managment App</h2>
        <div class="login-image"/>
        </div>
        <div id="error"></div>
        <form class="form login-form">  
        <input type="text" id="username" name="username" placeholder ="Username"/>
        <input type="password" id="password" name="password" placeholder= "Password" />
        <input class="button login-button" type="submit" id="loginButton" value="SIGN IN"  />
        </form>
        </div>
        <footer>&copy; ScaleFocus Academy</footer>
        `,
        
        listeners: [
            {
              targetId: 'loginButton',
              eventType: 'click',
              callback: submitLoginForm
            }
        ]
    };

};