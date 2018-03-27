export class Project {

    public id?: number;
    public Title: string;
    public DateStart: Date;
    public DateEnd: Date;
    public Description: string;

    constructor(init?: Partial<Project>) {
        Object.assign(this, init);
    }

}