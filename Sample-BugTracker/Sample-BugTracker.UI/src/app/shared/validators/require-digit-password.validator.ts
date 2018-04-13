import { FormGroup, FormControl } from "@angular/forms";

export function requireDigitPasswordValidator(fc: FormControl): { [key: string]: any } {
    if (fc != null) {
        let enterPassword = fc.value;
        let pattern = new RegExp("[0-9]+");
        return pattern.test(enterPassword) ? null : { requireDigit: "Пароль должен содержать хотя бы одну цифру" };
    }
}