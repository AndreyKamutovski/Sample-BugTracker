import { ErrorSolution } from "./error-solution.model";

export class ErrorBT {

    public ErrorId?: number;
    public Title: string;
    public Description?: string;
    public DateCreation: Date;
    public Deadline?: Date;
    public Status: number;
    public Priority: number;
    public Classification: number;
    public ProjectId: number;
    public EmailAuthor: string;
    public EmailAssignee?: string;

    public Solution: ErrorSolution;

}