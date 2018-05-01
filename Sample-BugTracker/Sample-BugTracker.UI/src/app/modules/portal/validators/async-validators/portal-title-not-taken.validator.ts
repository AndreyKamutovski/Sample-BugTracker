import { FormControl } from '@angular/forms';

export function portalTitleNotTakenValidator({ value }: FormControl): { [key: string]: any } {
    return this.portalService.IsPortalTitleAvailable(value).map(res => {
        return res ? null : {
            portalTitleNotTaken: "Портал с таким названием уже зарегистрирован. Введите другое название портала."
        }
    })
}