class List {

    constructor(title) {
        this.title = title;
        this.creatorId = JSON.parse(sessionStorage.getItem(LOGGED_USER)).id;
        this.updaterId = JSON.parse(sessionStorage.getItem(LOGGED_USER)).id;  
        this.createDate = getDate();
        this.updateDate = getDate();   
    }

    get _id() {
        return this.id;
    }

    set _id(x) {
        this.id = x;
    }

    get _title() {
        return this.title;
    }

    set _title(x) {
        this.title = x;
    }

    get _createDate() {
        return this.createDate;
    }

    set _createDate(x) {
        this.createDate = x;
    }

    get _creatorId() {
        return this.creatorId;
    }

    set _creatorId(x) {
        this.creatorId = x;
    }

    get _updateDate() {
        return this.updateDate;
    }

    set _updateDate(x) {
        this.updateDate = x;
    }

    get _updaterId () {
        return this.updaterId;
    }

    set _updaterId (x) {
        this.updaterId = x;
    }

    get _task () {
        return this.task;
    }

    set _task (x) {
        this.task = x;
    }    
}