import {Component, OnInit} from '@angular/core';
import {IonContent, IonHeader} from "@ionic/angular/standalone";
import {ProductService} from "../../../core/services/product.service";
import {Product} from "../../../core/models/Product";
import {ProductComponent} from "../../components/product/product.component";
import {ToolbarComponent} from "../../components/toolbar/toolbar.component";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
  imports: [
    IonHeader,
    IonContent,
    ProductComponent,
    ToolbarComponent
  ]
})
export class ProductsComponent implements OnInit{

  products: Product[] = [];

  constructor(private readonly productService: ProductService) { }

  ngOnInit() {
    this.productService.getProducts().subscribe(products => {
      this.products = products;
    });
  }

}
