import {Routes} from '@angular/router';
import {LoginComponent} from "./feature/pages/login/login.component";
import {RegisterComponent} from "./feature/pages/register/register.component";
import {ProductsComponent} from "./feature/pages/products/products.component";

export const routes: Routes = [
{
    path: 'login',
    component: LoginComponent
  }, {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'products',
    component: ProductsComponent
  },
  {
    path: '**',
    redirectTo: 'login',
    pathMatch: 'full'
  }
];
