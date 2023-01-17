class TasksRepository extends BaseRepository {
    static url = URL_TASKS;
    static parentUrl = URL_LISTS;
    
 
    static async getByParentId(id) {
        const response = await fetch (`${URL_BASE}${URL_LISTS}/${id}${this.url}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': AuthenticationService.getAuthorizationHeader()
            },
        });

        return await response.json();
    }

}