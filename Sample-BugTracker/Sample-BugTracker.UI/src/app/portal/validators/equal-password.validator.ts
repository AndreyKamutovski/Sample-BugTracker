import { FormGroup } from "@angular/forms";

export function equalPasswordValidator(fg: FormGroup): { [key: string]: any } {
    if (fg != null) {
        let password = fg.value.password;
        let pconfirm = fg.value.confirmPassword;
        let valid = password === pconfirm;
        let pconfirmControl = fg.get('confirmPassword');
        if (valid) {
            if (pconfirmControl.hasError('equalpassword')) {
                delete pconfirmControl.errors.equalpassword;
                pconfirmControl.updateValueAndValidity();
            }
            return null;
        } else {
            let errObj = { equalpassword: "Пароль и его подтверждение не совпадают" };
            pconfirmControl.setErrors({ ...pconfirm.errors, ...errObj });
            return errObj;
        }
    }
}