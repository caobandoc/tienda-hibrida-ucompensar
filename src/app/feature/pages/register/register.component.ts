import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {AuthService} from "../../../core/services/auth.service";
import {ToastController} from "@ionic/angular";
import {
  IonButton, IonButtons,
  IonContent,
  IonHeader, IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonTitle,
  IonToolbar
} from "@ionic/angular/standalone";
import {addIcons} from "ionicons";
import {arrowBackOutline} from "ionicons/icons";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  imports: [ReactiveFormsModule, CommonModule, IonHeader, IonToolbar, IonButton, IonTitle, IonContent, IonInput, IonIcon, IonButtons],
})
export class RegisterComponent {
  registerForm: FormGroup;
  submitted = false;

  constructor(
    private readonly fb: FormBuilder,
    private readonly auth: AuthService,
    private readonly router: Router,
    private readonly toastController: ToastController
  ) {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
    addIcons({arrowBackOutline})
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }

  get f() {
    return this.registerForm.controls;
  }

  async presentToast(message: string, color: 'success' | 'danger') {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      color,
      position: 'top'
    });
    await toast.present();
  }

  onSubmit() {
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    }
    this.auth.register(this.registerForm.value).subscribe({
      next: (response) => {
        this.registerForm.reset();
        this.submitted = false;
        this.presentToast('¡Registro exitoso!', 'success');
        setTimeout(() => {
          this.goToLogin();
        }, 2000);
      },
      error: (error) => {
        this.registerForm.patchValue({password: ''});
        this.presentToast('Error en el registro. Correo ya existe!', 'danger');
        console.error('Error en el registro:', error);
      }
    });
  }
}
