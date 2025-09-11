import {Component} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {AuthService} from "../../../core/services/auth.service";
import {TokenService} from "../../../core/services/token.service";
import {Router} from "@angular/router";
import {IonButton, IonContent, IonIcon, IonInput, IonInputPasswordToggle, IonToast} from "@ionic/angular/standalone";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    IonContent,
    IonInput,
    IonInputPasswordToggle,
    IonButton,
    IonToast,
    IonIcon
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
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit(){
    this.authService.login(this.loginForm.value)
      .subscribe({
        next: (response) => {
          this.tokenService.setToken(response);
          this.router.navigate(['/shop']);
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
