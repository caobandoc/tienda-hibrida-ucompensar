import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {IonBackButton, IonBadge, IonButton, IonButtons, IonIcon, IonTitle, IonToolbar} from "@ionic/angular/standalone";
import {TokenService} from "../../../core/services/token.service";
import {Router} from "@angular/router";
import {addIcons} from "ionicons";
import {cartOutline, logOutOutline} from "ionicons/icons";
import {Subscription} from "rxjs";
import {ShoppingCartService} from "../../../core/services/shopping-cart.service";

@Component({
    selector: 'app-toolbar',
    templateUrl: './toolbar.component.html',
    styleUrls: ['./toolbar.component.scss'],
  imports: [
    IonButton,
    IonButtons,
    IonToolbar,
    IonIcon,
    IonBadge,
    IonBackButton,
    IonTitle
  ]
})
export class ToolbarComponent implements OnInit, OnDestroy {
  @Input() isProductPage: boolean = false;
  cartCount = 0;
  private cartSub?: Subscription;

  constructor(
    private readonly shoppingCartService: ShoppingCartService,
    private readonly tokenService: TokenService,
    private readonly router: Router
  ) {
    addIcons({ cartOutline, logOutOutline })
  }

  ngOnInit() {
    this.cartSub = this.shoppingCartService.cartProducts$.subscribe(products => {
      this.cartCount = products.length;
    });
  }

  ngOnDestroy() {
    this.cartSub?.unsubscribe();
  }

  deleteToken() {
    this.tokenService.removeToken();
    this.router.navigate(['/']);
  }

  toShoppingCart() {
    this.router.navigate(['/shop/shopping-cart']);
  }

}
