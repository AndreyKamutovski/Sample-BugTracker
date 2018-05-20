import { User } from "../../users/models/user.model";
import { SafeUrl } from "@angular/platform-browser";

export class ErrorAttachment {
    public Id: number;    
    public UploadDate: Date;
    public FileName: string;
    public OriginalFileName: string;
    public Author: User;
    public PreviewFilePath?: string | SafeUrl;
}