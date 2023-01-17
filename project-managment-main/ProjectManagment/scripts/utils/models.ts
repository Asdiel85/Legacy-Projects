export type UserItem = {
    id: string,
    username: string,
    password: string,
    firstName: string,
    lastName: string,
    isAdmin: boolean
}

export type ProjectItem = {
    id: string,
    creatorId: string,
    title: string,
    description: string
}

export type TaskItem = {
    id: string,
    projectId: string,
    title: string,
    description: string,
    status: string,
    assigneeId: string
}

export type TeamItem = {
    id: string,
    title: string,
    createDate: string,
    updateDate: string
}

export type LoggedUser = {
    id: number,
    isAdmin: boolean
}

export type Listener = {
    targetId: string,
    eventType: string,
    callback(): void
}

export type WorkLogItem = {
    id: string,
    time: number,
    taskId: string,
    userId: number,
    date: string
}

  