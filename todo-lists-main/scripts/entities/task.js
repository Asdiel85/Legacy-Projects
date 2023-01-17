class Task {
    constructor(title, description, isComplete, listId) {   
        this.title = title;
        this.description = description;
        this.isComplete = isComplete;
        this.listId = listId;
        this.createDate = getDate();
        this.updateDate = getDate();
        this.creatorId = JSON.parse(sessionStorage.getItem(LOGGED_USER)).id;
        this.updaterId = JSON.parse(sessionStorage.getItem(LOGGED_USER)).id;
    }

    get _id() {
        return this.id;
    }

    set _id(x) {
        this.id = x;
    }

    get _listId() {
        return this.listId;
    }

    set _listId(x) {
        this.listId = x;
    }

    get _title() {
        return this.title;
    }

    set _title(x) {
        this.title = x;
    }

    get _isComplete () {
        return this.isComplete;
    }

    set _isComplete(x) {
        this.isComplete = x;
    }

    get _description () {
        return this.description
    }

    set _description(x) {
        this.description = x;
    }
}