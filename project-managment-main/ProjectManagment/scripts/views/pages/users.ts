import { createNewUser } from "../../controlers/usersController";


export default function users() {
    return {
      template: `
        <div class="table-section">
          <div class="table-section-heading">
            <h3>Users</h3>
            <button class="button create" id="newUserLink">+ CREATE USER</button>
          </div>
          <div class="table-holder">
            <table id="usersTable">
              <thead>
                <tr>
                <th>First Name</th>
                <th>Last Name</th>
                  <th>Username</th>
                  <th colspan="2"></th>
                </tr>
              </thead>
            </table>
          </div>
        </section>
        `,
      listeners: [
         {
          targetId: 'newUserLink',
          eventType: 'click',
          callback: () => createNewUser ()
        },
      ]
    };
  }
  