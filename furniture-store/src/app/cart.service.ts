import { Injectable } from '@angular/core';
import { CartItem, Furniture } from './models';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems: CartItem[] = [];

  constructor() {}

  getCartItems(): CartItem[] {
    return this.cartItems;
  }

  addToCart(furniture: Furniture, quantity: number): void {
    const existingItem = this.cartItems.find(item => item.id === furniture.id);
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      this.cartItems.push(new CartItem(furniture.id, furniture.name, furniture.description, furniture.price, furniture.imageUrl, quantity));
    }
  }

  removeFromCart(id: string): void {
    this.cartItems = this.cartItems.filter(item => item.id !== id);
  }

  clearCart(): void {
    this.cartItems = [];
  }
}
