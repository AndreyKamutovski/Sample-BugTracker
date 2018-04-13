import { FormGroup, FormControl } from "@angular/forms";

export function nonLetterOrDigitPasswordValidator(fc: FormControl): { [key: string]: any } {
    if (fc != null) {
        let enterPassword = fc.value;
        let pattern = new RegExp("[^a-zA-Z0-9]+");
        return pattern.test(enterPassword) ? null : { nonLetterOrDigit: "Пароль должен содержать хотя бы один не буквенно-цифровой символ" };
    }
}