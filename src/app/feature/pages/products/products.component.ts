import {Component} from '@angular/core';
import {IonButton, IonButtons, IonContent, IonHeader, IonTitle, IonToolbar} from "@ionic/angular/standalone";
import {TokenService} from "../../../core/services/token.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
  imports: [
    IonButton,
    IonButtons,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonContent
  ]
})
export class ProductsComponent  {

  constructor(
    private readonly tokenService: TokenService,
    private readonly router: Router,
  ) { }

  deleteToken() {
    this.tokenService.removeToken();
    this.router.navigate(['/']);
  }
}
