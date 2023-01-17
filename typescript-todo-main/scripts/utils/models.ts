//Main benefit of using types over interfaces is the ability
//to look inside type structure on hover (in VS Code and other editors)
//Test it by hovering over 'listener' (uncomment interface declaration and check again)
export type Listener = {
    targetId: string,
    eventType: string,
    callback(): void
  }
  
  // Equivalent declaration
  // More on topic: https://stackoverflow.com/questions/37233735/typescript-interfaces-vs-types
  
  // export interface listener {
  //     targetId: string,
  //     eventType: string,
  //     callback(): void
  // }
  
  export type LoggedUser = {
    id: string,
    isAdmin: boolean
  }
  
  export type UserItem = {
    id: string,
    username: string,
    password: string,
    firstName: string,
    lastName: string,
    isAdmin: boolean,
    createDate: string,
    updateDate: string,
  }
  
  export type ListItem = {
    id: string,
    title:string,
    createDate: string,
    updateDate: string,
  }
  
  export type TaskItem = {
    id: string,
    taskListId: string,
    title: string,
    description:string,
    isComplete : boolean
    createDate: string,
    updateDate: string,
  }