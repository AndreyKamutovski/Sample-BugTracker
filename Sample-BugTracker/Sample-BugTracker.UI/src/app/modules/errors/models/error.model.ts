import { ErrorSolution } from "./error-solution.model";

export class ErrorBT {

    public Id?: number;
    public Title: string;
    public Description?: string;
    public DateCreation: Date;
    public Deadline?: Date;
    public Status: number;
    public Priority: number;
    public Classification: number;
    public ProjectId: number;
    public EmailErrorAuthor: string;
    public EmailErrorResponsible?: string;

    public Solution: ErrorSolution;

}