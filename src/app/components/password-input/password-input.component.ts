import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-password-input',
    imports: [CommonModule, FormsModule],
    templateUrl: './password-input.component.html',
    styleUrl: './password-input.component.scss',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => PasswordInputComponent),
            multi: true
        }
    ]
})
export class PasswordInputComponent implements ControlValueAccessor {
@Input() placeholder = 'Enter password';
  
  value = '';
  disabled = false;
  showPassword = false;

  onChange: any = () => {};
  onTouched: any = () => {};

  toggleVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  onInputChange(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.value = value;
    this.onChange(value);
    this.onTouched();
  }

  writeValue(value: string): void {
    this.value = value || '';
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}
