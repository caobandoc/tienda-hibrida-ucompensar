import {bootstrapApplication} from "@angular/platform-browser";
import {AppComponent} from "./app/app.component";
import {PreloadAllModules, provideRouter, RouteReuseStrategy, withPreloading} from "@angular/router";
import {IonicRouteStrategy} from "@ionic/angular";
import {provideIonicAngular} from "@ionic/angular/standalone";
import { defineCustomElements } from '@ionic/pwa-elements/loader';
import {routes} from "./app/app.routes";
import {provideHttpClient, withInterceptors} from "@angular/common/http";
import {tokenInterceptor} from "./app/core/interceptors/token-interceptor";
import { enableProdMode } from "@angular/core";
import { environment } from "./environments/environment";

defineCustomElements(window);
if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideIonicAngular(),
    provideRouter(routes, withPreloading(PreloadAllModules)),
    provideHttpClient(
      withInterceptors([tokenInterceptor])
    )
  ],
});
