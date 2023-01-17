import { createNewUser } from '../../controlers/usersController';

export default function users() {
  return {
    template: `
      <section class="table-section">
        <div class="table-section-heading">
          <h2>Users List</h2>
          <button class="button" id="newUserLink">+ Add user</button>
        </div>
        <div class="table-holder">
          <table id="usersTable">
            <thead>
              <tr class="bg-primary-dark">
              <th>First Name</th>
              <th>Last Name</th>
                <th>Username</th>
                <th class="hide-user">Date of creation</th>
                <th class="hide-user">Date of last edit</th>
                <th colspan="2"></th>
              </tr>
            </thead>
          </table>
        </div>
      </section>`,
    listeners: [
      {
        targetId: 'newUserLink',
        eventType: 'click',
        callback: () => createNewUser('Create')
      }
    ]
  };
}