import { Component } from '@angular/core';
import {IonicModule} from "@ionic/angular";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {AuthService} from "../../../core/services/auth.service";
import {TokenService} from "../../../core/services/token.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [
    IonicModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class LoginComponent {
  public loginForm: FormGroup;
  isToastOpen = false;
  toastMessage = 'Datos incorrectos';

  constructor(
    private readonly fb: FormBuilder,
    private readonly router: Router,
    private readonly authService: AuthService,
    private readonly tokenService: TokenService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4)]]
    });
  }

  onSubmit(){
    this.authService.login(this.loginForm.value)
      .subscribe({
        next: (response) => {
          this.tokenService.setToken(response.token);
        },
        error: (error) => {
          this.setOpen(true);
          this.toastMessage = error.error.detail;
        }
      });
  }

  setOpen(isOpen: boolean) {
    this.isToastOpen = isOpen;
  }

  goToRegister(){
    this.router.navigate(['/register']);
  }

}
