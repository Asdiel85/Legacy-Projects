export default class Task {
    constructor(
        public id: string,
        public projectId: string,
        public title: string,
        public description: string,
        public status: string,
        public assigneeId: string
    ) {
    }
}