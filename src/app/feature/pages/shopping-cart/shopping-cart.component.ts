import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  IonContent,
  IonHeader,
  IonFooter,
  IonButton,
  IonModal,
  IonToolbar,
  IonTitle, IonToast } from '@ionic/angular/standalone';
import { ToolbarComponent } from '../../components/toolbar/toolbar.component';
import { Product } from 'src/app/core/models/Product';
import { ShoppingCartService } from 'src/app/core/services/shopping-cart.service';
import { ProductService } from 'src/app/core/services/product.service';
import { ProductCartComponent } from '../../components/product-cart/product-cart.component';
import { CurrencyPipe } from '@angular/common';
import { Subscription } from 'rxjs';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss'],
  imports: [IonToast,
    IonTitle,
    IonToolbar,
    IonModal,
    IonContent,
    IonHeader,
    ToolbarComponent,
    ProductCartComponent,
    IonFooter,
    IonButton,
    CurrencyPipe,
  ],
})
export class ShoppingCartComponent implements OnInit, OnDestroy {
  showCameraModal = false;
  isToastOpen = false;

  products: Product[] = [];
  total: number = 0;
  private cartProducts?: Subscription;

  constructor(
    private readonly shoppingCartService: ShoppingCartService,
    private readonly productService: ProductService
  ) {}

  ngOnInit() {
    this.cartProducts = this.shoppingCartService.cartProducts$.subscribe(
      (ids) => {
        // Si el carrito está vacío, limpiar la lista de productos y total
        if (ids.length === 0) {
          this.products = [];
          this.total = 0;
        }

        // Recuperar los id actuales del carrito
        const currentIds = this.products.map((p) => p.id);
        // revisar nuevos ids
        const newIds = ids.filter((id) => !currentIds.includes(id));
        // revisar ids eliminados
        const removedIds = currentIds.filter((id) => !ids.includes(id));

        // Eliminar productos que ya no están en el carrito
        this.products = this.products.filter((p) => !removedIds.includes(p.id));
        this.total = this.products.reduce((sum, p) => sum + p.price, 0);
        // Agregar nuevos productos al carrito
        newIds.forEach((id) => {
          this.productService.getProduct(id).subscribe((product) => {
            this.products.push(product);
            this.total += product.price;
          });
        });
      }
    );
  }

  ngOnDestroy() {
    this.cartProducts?.unsubscribe();
  }

  cancel() {
    this.showCameraModal = false;
  }

  setOpen(isOpen: boolean) {
    this.isToastOpen = isOpen;
  }

  async confirm() {
  this.showCameraModal = false;
  await this.openCamera();
}

  async openCamera() {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Base64,
      source: CameraSource.Camera,
    });
    // Aquí puedes manejar la imagen, por ejemplo guardarla o mostrarla
    console.log('Imagen capturada:', image);
    this.setOpen(true);
    // Limpiar el carrito después de la compra
    this.shoppingCartService.clearCart();
  }
}
