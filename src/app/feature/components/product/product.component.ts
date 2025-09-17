import {Component, Input} from '@angular/core';
import {Product} from "../../../core/models/Product";
import {IonButton, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle} from "@ionic/angular/standalone";
import {CurrencyPipe, NgOptimizedImage} from "@angular/common";

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

  constructor() { }

}
