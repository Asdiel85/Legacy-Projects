class BaseRepository {

  static async getAll() {
    const response = await fetch(`${URL_BASE}${this.url}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': await AuthenticationService.getAuthorizationHeader()
      },
    });

    return await response.json();
  }

//Tried to think of method for "urlItem" , but seems like all of the callings are different.

  static async editItem(item) {
    // Cant think of a way to pass other parameter than "listId", so editTask to work! 
    const urlItem = typeof listId === 'undefined'
    ?`${URL_BASE}${this.url}/${item.id}`
    :`${URL_BASE}${URL_LISTS}/${item.listId}${this.url}/${item.id}`

    await fetch(urlItem, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': AuthenticationService.getAuthorizationHeader()
      },
      body: JSON.stringify(item)
    });
  }
  
  static async getById(id, parentId) {
    const getUrl = typeof parentId === 'undefined'
      ? `${URL_BASE}${this.url}/${id}`
      : `${URL_BASE}${this.parentUrl}/${parentId}${this.url}/${id}`;


    const response = await fetch(getUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': await AuthenticationService.getAuthorizationHeader()
      },
    });

    return await response.json();
  }

  static async addItem(item) {
     // Cant think of a way to pass other parameter than "listId", so addTask to work! 
    const urlItem = typeof listId === 'undefined'
    ?`${URL_BASE}${this.url}/`
    :`${URL_BASE}${this.parentUrl}/${item.listId}${this.url}`

    await fetch(urlItem, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization':  await AuthenticationService.getAuthorizationHeader()
      },
      body: JSON.stringify(item)
    });
  }

  static async deleteItem(id, listId) {
     // Cant think of a way to pass other parameter than "listId", so delete to work! 
    const getUrl= typeof listId === 'undefined'
      ?`${URL_BASE}${this.url}/${id}`
      :`${URL_BASE}${this.parentUrl}/${listId}${this.url}/${id}`;

    await fetch(getUrl, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': await AuthenticationService.getAuthorizationHeader()
      },
    });
  }
}
