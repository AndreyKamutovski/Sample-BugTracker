import { User } from "../../users/models/user.model";

export class ErrorSolution {
    public Id: number;
    public ErrorStatus: number;
    public Description: string;
    public RecievingDate: Date;
    public Author: User;
}