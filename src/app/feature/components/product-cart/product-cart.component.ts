import { Component, Input } from '@angular/core';
import { Product } from 'src/app/core/models/Product';
import { CurrencyPipe, NgOptimizedImage } from '@angular/common';
import { IonButton, IonIcon } from "@ionic/angular/standalone";
import { addIcons } from 'ionicons';
import { trashOutline } from 'ionicons/icons';
import { ShoppingCartService } from 'src/app/core/services/shopping-cart.service';

@Component({
  selector: 'app-product-cart',
  templateUrl: './product-cart.component.html',
  styleUrls: ['./product-cart.component.scss'],
  imports: [IonIcon, IonButton, NgOptimizedImage, CurrencyPipe],
})
export class ProductCartComponent {
  // @ts-ignore
  @Input() product: Product;

  constructor(
    private readonly shoppingCartService: ShoppingCartService
  ) {
    addIcons({ trashOutline });
  }

  deleteProduct(id: number) {
    this.shoppingCartService.removeProduct(id);
  }

}
