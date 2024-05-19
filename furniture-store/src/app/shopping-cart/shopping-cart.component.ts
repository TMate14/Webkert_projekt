import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from '../shopping-cart.service';
import { AuthService } from '../auth.service';
import { CartItem } from '../models';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
  cartItems: CartItem[] = [];
  totalPrice: number = 0;

  constructor(
    private shoppingCartService: ShoppingCartService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.shoppingCartService.cartItems$.subscribe(items => {
      this.cartItems = items;
      this.totalPrice = this.shoppingCartService.getTotalPrice();
    });
  }

  removeItem(furnitureId: number): void {
    this.shoppingCartService.removeItem(furnitureId);
  }

  clearCart(): void {
    this.shoppingCartService.clearCart();
  }

  buyItems(): void {
    if (this.cartItems.length > 0) {
      this.authService.makePurchase(this.cartItems, this.totalPrice);
      this.clearCart();
      alert('Purchase successful!');
    } else {
      alert('Your cart is empty.');
    }
  }
}
