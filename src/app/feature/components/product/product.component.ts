import {Component, Input} from '@angular/core';
import {Product} from "../../../core/models/Product";
import {IonButton, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle} from "@ionic/angular/standalone";
import {CurrencyPipe, NgOptimizedImage} from "@angular/common";
import { ShoppingCartService } from '../../../core/services/shopping-cart.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
  imports: [
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardSubtitle,
    IonButton,
    CurrencyPipe,
    NgOptimizedImage
  ]
})
export class ProductComponent {

  // @ts-ignore
  @Input() product: Product;

  constructor(
    private readonly shoppingCartService: ShoppingCartService
  ) { }

  addToCart(productId: number) {
    this.shoppingCartService.addProduct(productId);
  }

}
