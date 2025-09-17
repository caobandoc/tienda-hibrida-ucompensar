import {Component, OnInit} from '@angular/core';
import {IonButton, IonButtons, IonContent, IonHeader, IonTitle, IonToolbar} from "@ionic/angular/standalone";
import {TokenService} from "../../../core/services/token.service";
import {Router} from "@angular/router";
import {ProductService} from "../../../core/services/product.service";
import {Product} from "../../../core/models/Product";
import {ProductComponent} from "../../components/product/product.component";

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
    IonContent,
    ProductComponent
  ]
})
export class ProductsComponent implements OnInit{

  products: Product[] = [];

  constructor(
    private readonly tokenService: TokenService,
    private readonly productService: ProductService,
    private readonly router: Router
  ) { }

  ngOnInit() {
    this.productService.getProducts().subscribe(products => {
      this.products = products;
    });
  }

  deleteToken() {
    this.tokenService.removeToken();
    this.router.navigate(['/']);
  }
}
