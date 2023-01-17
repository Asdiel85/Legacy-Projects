function usersPage() {
    return `
    <table id="usersTable">
        <tr>
            <td>Username</td>
            <td>Password</td>
            <td>First Name</td>
            <td>Last Name</td>
            <td>IsAdmin</td>
            <td>ID</td>
            <td>Date of Creation</td>
            <td>ID of Creator</td>
            <td>Date of Last Change</td>
            <td>ID of Last Change</td>
            <td></td>
            <td><button id="newUserLink" onclick="usersEditLinkClick()">New User</button></td>
        </tr>             
    </table>
  
    `;
}