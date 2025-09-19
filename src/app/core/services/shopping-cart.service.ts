import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {


  listIdProducts: number[] = [];
  private readonly cartProductsSubject = new BehaviorSubject<number[]>([]);
  cartProducts$ = this.cartProductsSubject.asObservable();

  addProduct(productId: number) {
  if (!this.listIdProducts.includes(productId)) {
    this.listIdProducts.push(productId);
    this.cartProductsSubject.next([...this.listIdProducts]);
  }
}

  removeProduct(id: number) {
    const prev = this.listIdProducts.length;
    this.listIdProducts = this.listIdProducts.filter(item => item !== id);
    if (this.listIdProducts.length !== prev) {
      this.cartProductsSubject.next([...this.listIdProducts]);
    }
  }

  clearCart() {
    this.listIdProducts = [];
    this.cartProductsSubject.next([...this.listIdProducts]);
  }

}
