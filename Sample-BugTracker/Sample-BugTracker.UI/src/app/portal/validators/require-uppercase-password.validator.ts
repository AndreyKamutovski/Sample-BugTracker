import { FormGroup, FormControl } from "@angular/forms";

export function requireUppercasePasswordValidator(fc: FormControl): { [key: string]: any } {
    if (fc != null) {
        let enterPassword = fc.value;
        let pattern = new RegExp("[A-Z]+");
        return pattern.test(enterPassword) ? null : { requireUppercase: "Пароль должен содержать хотя бы одну букву в верхнем регистре" };
    }
}