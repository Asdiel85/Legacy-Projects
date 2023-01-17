export default class WorkLog {
    constructor(
        public id: string,
        public time: number,
        public userId: number,
        public date: Date
    ) {
    }
};