import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { IonicModule, ToastController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { Auth } from 'src/app/core/services/auth';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  standalone: true,
  imports: [IonicModule, ReactiveFormsModule, CommonModule],
})
export class RegisterComponent  {
  registerForm: FormGroup;
  submitted = false;

  constructor(
    private fb: FormBuilder,
  private auth: Auth,
    private router: Router,
    private toastController: ToastController
  ) {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }

  get f() { return this.registerForm.controls; }

  async presentToast(message: string, color: 'success' | 'danger') {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      color,
      position: 'top'
    });
    toast.present();
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
      },
      error: (error) => {
        this.registerForm.patchValue({ password: '' });
        this.presentToast('Error en el registro. Correo ya existe!', 'danger');
      }
    });
  }
}
