class AuthenticationService {
  static async authenticate(username, password) {
    const response = await fetch(URL_BASE + URL_AUTH, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        password
      })
    });

    if (response.ok) {
      const result = await response.json();
      const { token, userId } = result;
      window.sessionStorage.setItem(TOKEN, token);

      const loggedUser = await UsersRepository.getById(userId);

      window.sessionStorage.setItem(LOGGED_USER, JSON.stringify({
        id: userId,
        username: loggedUser.username,
        firstName: loggedUser.firstName,
        lastName: loggedUser.lastName,
        isAdmin: loggedUser.isAdmin
      }))
    }
  }

  static getLoggedUser() {
    return JSON.parse(window.sessionStorage.getItem(LOGGED_USER));
  }

  static logout() {
    window.sessionStorage.removeItem(LOGGED_USER);
    window.sessionStorage.removeItem(TOKEN);
  }

  static getAuthorizationHeader() {
    return 'Bearer ' + window.sessionStorage.getItem(TOKEN);
  }
}
