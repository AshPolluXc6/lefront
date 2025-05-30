import { Component, OnInit, } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { PasswordInputComponent } from '../password-input/password-input.component';
import { ToggleSwitchComponent } from '../toggle-switch/toggle-switch.component';
import { AuthService } from '../../core/services/auth.service';
// import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PasswordInputComponent,
    ToggleSwitchComponent,
    TranslateModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit{
  loginForm: FormGroup;
  isSubmitting = false;
  formError: string | null = null;


  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
     this.loginForm = this.fb.group({
      email: ['',[Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      rememberMe: [false]
    });
  }

ngOnInit(): void {

    const savedCredentials = localStorage.getItem('rememberedCredentials');
    if (savedCredentials) {
      const { email, password } = JSON.parse(savedCredentials);
      this.loginForm.patchValue({ email, password });
    }

  }

 onSubmit(): void {
    if (this.loginForm.invalid || this.isSubmitting) return;

    this.isSubmitting = true;
    this.formError = null;

    const { email, password, rememberMe } = this.loginForm.value;
      const credentials = {
      user: email,    
      pass: password  
      };
    this.authService.login(credentials).subscribe({
      
      next: (response) => {
        console.log('Login Response:', response);
        if (rememberMe) {
          localStorage.setItem('rememberedCredentials', JSON.stringify({ email, password }));
        } else {
          localStorage.removeItem('rememberedCredentials');
        }
        
        this.router.navigate(['/home']); 
      },
      error: (error) => {
        this.isSubmitting = false;
        this.formError = this.handleLoginError(error);
      },
      complete: () => {
        this.isSubmitting = false;
      }
    });
  } 

    loginWithSocial(provider: string): void {
    // Implementar lógica de login social
    console.log(`Login with ${provider}`);
  }

  private handleLoginError(error: any): string {
    if (error.status === 401) {
      return 'Invalid email or password';
    }
    if (error.status === 0) {
      return 'Unable to connect to the server';
    }
    return 'An unexpected error occurred';
  }
}
