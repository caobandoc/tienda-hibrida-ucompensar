import {Component} from '@angular/core';
import {IonApp, IonRouterOutlet} from "@ionic/angular/standalone";

@Component({
    selector: 'app-shop',
    templateUrl: './shop.component.html',
    styleUrls: ['./shop.component.scss'],
    imports: [
        IonApp,
        IonRouterOutlet
    ]
})
export class ShopComponent {

  constructor() { }

}
