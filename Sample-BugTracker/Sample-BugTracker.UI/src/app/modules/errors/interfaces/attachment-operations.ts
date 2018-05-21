import { Observable } from 'rxjs/Observable';

import { ErrorAttachment } from '../models/error-attachment.model';

export interface AttachmentOperations {
    get(id: number): Observable<ErrorAttachment[]>;
    add(id: number, formData: FormData): Observable<ErrorAttachment[]>;
    delete(id: number): Observable<any>;
    download(id: number): Observable<Response>;
}
