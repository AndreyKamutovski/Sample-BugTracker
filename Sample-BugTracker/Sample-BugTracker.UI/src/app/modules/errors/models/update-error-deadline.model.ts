export class UpdateErrorDeadlineBT {
    public Deadline: Date;
    constructor(
        public ErrorId: number,
        deadline: Date
    ) {
        this.Deadline = new Date(deadline.getTime() - deadline.getTimezoneOffset() * 60000);
        }
}