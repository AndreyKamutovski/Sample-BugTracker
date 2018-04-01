import { FormControl } from "@angular/forms";

export function emailNotTakenValidator({ value }: FormControl): { [key: string]: any } {
    return this.signupService.checkEmailNotTaken(value).map(res => {
        return res ? null : {
            emailNotTaken: "Аккаунт для данного Email-адреса уже существует. Введите другой Email или выполните вход."
        }
    })
}