import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CartItem } from './models';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
  private cartItemsSubject = new BehaviorSubject<CartItem[]>([]);
  cartItems$ = this.cartItemsSubject.asObservable();

  constructor() {}

  addItem(item: CartItem): void {
    const currentItems = this.cartItemsSubject.value;
    const existingItem = currentItems.find(ci => ci.furnitureId === item.furnitureId);

    if (existingItem) {
      existingItem.quantity += item.quantity;
    } else {
      currentItems.push(item);
    }

    this.cartItemsSubject.next([...currentItems]);
  }

  removeItem(furnitureId: number): void {
    const currentItems = this.cartItemsSubject.value.filter(item => item.furnitureId !== furnitureId);
    this.cartItemsSubject.next(currentItems);
  }

  clearCart(): void {
    this.cartItemsSubject.next([]);
  }

  getTotalPrice(): number {
    return this.cartItemsSubject.value.reduce((total, item) => total + item.price * item.quantity, 0);
  }

  getItems(): CartItem[] {
    return this.cartItemsSubject.value;
  }
}
