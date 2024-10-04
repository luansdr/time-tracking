import { AbstractControl, ValidationErrors } from '@angular/forms';

export class CustomValidators {
  static cpfValidator(control: AbstractControl): ValidationErrors | null {
    const cpf = control.value;

    if (!cpf) return null;

    const cpfPattern = /^\d{3}\.\d{3}\.\d{3}-\d{2}$|^\d{11}$/;
    if (!cpfPattern.test(cpf)) {
      return { invalidCPF: true };
    }

    let sum = 0;
    let remainder;

    if (cpf === '00000000000') return { invalidCPF: true };

    for (let i = 1; i <= 9; i++) {
      sum = sum + parseInt(cpf.substring(i - 1, i)) * (11 - i);
    }
    remainder = (sum * 10) % 11;

    if (remainder === 10 || remainder === 11) remainder = 0;
    if (remainder !== parseInt(cpf.substring(9, 10))) {
      return { invalidCPF: true };
    }

    sum = 0;
    for (let i = 1; i <= 10; i++) {
      sum = sum + parseInt(cpf.substring(i - 1, i)) * (12 - i);
    }
    remainder = (sum * 10) % 11;

    if (remainder === 10 || remainder === 11) remainder = 0;
    if (remainder !== parseInt(cpf.substring(10, 11))) {
      return { invalidCPF: true };
    }

    return null; // CPF é válido
  }

  static phoneValidator(control: AbstractControl): ValidationErrors | null {
    const phone = control.value;

    if (!phone) return null;

    const phonePattern =
      /^1\d\d(\d\d)?$|^0800 ?\d{3} ?\d{4}$|^(\(0?([1-9a-zA-Z][0-9a-zA-Z])?[1-9]\d\) ?|0?([1-9a-zA-Z][0-9a-zA-Z])?[1-9]\d[ .-]?)?(9|9[ .-])?[2-9]\d{3}[ .-]?\d{4}$/gm;
    if (!phonePattern.test(phone)) {
      return { invalidPhone: true };
    }

    return null;
  }
}
