import { FormGroup, FormControl } from "@angular/forms";

export function requireLowercasePasswordValidator(fc: FormControl): { [key: string]: any } {
    if (fc != null) {
        let enterPassword = fc.value;
        let pattern = new RegExp("[a-z]+");
        return pattern.test(enterPassword) ? null : { requireLowercase: "Пароль должен содержать хотя бы одну букву в нижнем регистре" };
    }
}