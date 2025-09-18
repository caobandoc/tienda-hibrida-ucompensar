import { Component, OnDestroy, OnInit } from '@angular/core';
import { IonContent, IonHeader, IonFooter, IonButton } from "@ionic/angular/standalone";
import {ToolbarComponent} from "../../components/toolbar/toolbar.component";
import { Product } from 'src/app/core/models/Product';
import { ShoppingCartService } from 'src/app/core/services/shopping-cart.service';
import { ProductService } from 'src/app/core/services/product.service';
import { ProductCartComponent } from "../../components/product-cart/product-cart.component";
import { CurrencyPipe } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss'],
  imports: [
    IonContent,
    IonHeader,
    ToolbarComponent,
    ProductCartComponent,
    IonFooter,
    IonButton,
    CurrencyPipe
]
})
export class ShoppingCartComponent implements OnInit, OnDestroy{

  products: Product[] = [];
  total: number = 0;
  private cartProducts?: Subscription;

  constructor(
    private readonly shoppingCartService: ShoppingCartService,
    private readonly productService: ProductService
  ) {}

  ngOnInit() {
    this.cartProducts = this.shoppingCartService.cartProducts$.subscribe(ids => {
      this.products = [];
      this.total = 0;
      ids.forEach(id => {
        this.productService.getProduct(id).subscribe(product => {
          this.products.push(product);
          this.total += product.price;
        });
      });
    });
  }

  ngOnDestroy() {
    this.cartProducts?.unsubscribe();
  }

}
