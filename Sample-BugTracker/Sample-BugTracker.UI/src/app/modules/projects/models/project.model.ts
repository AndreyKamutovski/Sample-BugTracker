import { StatisticsError } from "../../errors/models/statistics-error.model";

export class Project {

    public Id?: number;
    public Title: string;
    public DateStart: Date;
    public DateEnd: Date;
    public Description: string;

    public ErrorStatistics?: StatisticsError;

    constructor(init?: Partial<Project>) {
        Object.assign(this, init);
    }

}