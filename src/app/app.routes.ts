import {Routes} from '@angular/router';
import {LoginComponent} from "./feature/pages/login/login.component";
import {RegisterComponent} from "./feature/pages/register/register.component";
import {authGuard} from "./core/guards/auth-guard";
import {tokenGuard} from "./core/guards/token-guard";

export const routes: Routes = [
{
    path: 'login',
    canActivate: [tokenGuard],
    component: LoginComponent
  }, {
    path: 'register',
    canActivate: [tokenGuard],
    component: RegisterComponent
  },
  {
    path: 'shop',
    canActivate: [authGuard],
    loadChildren: () => import('./feature/pages/shop/shop.routes').then(m => m.routes)
  },
  {
    path: '**',
    redirectTo: 'login',
    pathMatch: 'full'
  }
];
