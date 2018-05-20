import { FormControl } from "@angular/forms";

export function emailNotTakenValidator({ value }: FormControl): { [key: string]: any } {
    console.log('emailNotTakenValidator');
    return this.signupService.IsEmailAvailable(value).map(res => {
        return res ? null : {
            emailNotTaken: "Аккаунт для данного Email-адреса уже существует. Введите другой Email или выполните вход."
        }
    })
}