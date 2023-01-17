export default  function teamManagment () {
    return {
        template: `
        <section class="table-section">
        <div class="table-section-heading">
          <h2>Members</h2>
        </div>
        <div class="table-holder">
          <table class="team-table">
            <thead>
              <tr>
              <th>ID</th>
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
        listeners: []
    };
}