import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { LoginComponent } from '../../../components/login/login.component';
// import { ReactiveFormsModule } from '@angular/forms';
// import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [LoginComponent],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss'
})
export class LoginPageComponent {
}

