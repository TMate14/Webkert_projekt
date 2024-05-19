// shopping-cart.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CartItem } from './models';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
  private itemsSubject: BehaviorSubject<CartItem[]> = new BehaviorSubject<CartItem[]>([]);
  public items$ = this.itemsSubject.asObservable();

  addItem(item: CartItem): void {
    const items = this.itemsSubject.value;
    const existingItem = items.find(i => i.id === item.id);
    if (existingItem) {
      existingItem.quantity += item.quantity;
    } else {
      items.push(item);
    }
    this.itemsSubject.next(items);
  }

  removeItem(itemId: string): void {
    const items = this.itemsSubject.value.filter(item => item.id !== itemId);
    this.itemsSubject.next(items);
  }

  clearCart(): void {
    this.itemsSubject.next([]);
  }

  getItems(): CartItem[] {
    return this.itemsSubject.value;
  }
}
