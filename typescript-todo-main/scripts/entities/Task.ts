export default class Task {
    constructor(  
    public id: string,
    public taskListId: string,
    public title: string,  
    public description: string, 
    public isComplete : boolean,
    public createDate: string,
    public updateDate: string
   ) {}

    }