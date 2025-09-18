import {Routes} from '@angular/router';
import {ProductsComponent} from "../products/products.component";
import {ShoppingCartComponent} from "../shopping-cart/shopping-cart.component";

export const routes: Routes = [
  {
    path: 'products',
    component: ProductsComponent
  },
  {
    path: 'shopping-cart',
    component: ShoppingCartComponent
  },
  {
    path: '**',
    redirectTo: 'products',
    pathMatch: 'full'
  }
];
