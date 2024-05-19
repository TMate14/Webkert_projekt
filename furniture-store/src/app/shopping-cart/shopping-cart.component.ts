import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from '../shopping-cart.service';
import { AuthService } from '../auth.service';
import { CartService } from '../cart.service';
import { CartItem } from '../models';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
  cartItems: CartItem[] = [];
  total: number = 0;

  constructor(private shoppingCartService: ShoppingCartService, private authService: AuthService, private cartService: CartService) {}

  ngOnInit(): void {
    this.cartItems = this.cartService.getCartItems();
    //this.loadCartItems();
    this.calculateTotal();
  }

  loadCartItems(): void {
    this.cartItems = this.shoppingCartService.getItems();
  }

  calculateTotal(): void {
    this.total = this.cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }

  removeFromCart(id: string): void {
    //this.shoppingCartService.removeItem(id);
    this.cartService.removeFromCart(id)
    this.cartItems = this.cartService.getCartItems();
    //this.loadCartItems();
    this.calculateTotal();
  }

  // makePurchase(): void {
  //   const user = this.authService.getCurrentUser();
  //   if (user) {
  //     this.authService.makePurchase(this.cartItems, this.total).then(() => {
  //       this.cartService.clearCart();
  //       //this.loadCartItems();
  //       this.cartItems = this.cartService.getCartItems();
  //       this.calculateTotal();
  //     }).catch(error => {
  //       console.error('Error making purchase:', error);
  //     });
  //   } else {
  //     console.error('User not logged in');
  //   }
  // }

  makePurchase(): void {
    const user = this.authService.getCurrentUser();
    if (user) {
      const cartItemsData = this.cartItems.map(item => ({
        id: item.id,
        name: item.name,
        description: item.description,
        imageUrl: item.imageUrl,
        price: item.price,
        quantity: item.quantity
      }));
      this.authService.makePurchase(cartItemsData, this.total).then(() => {
        this.cartService.clearCart();
        this.cartItems = [];
        this.calculateTotal();
      }).catch(error => {
        console.error('Error making purchase:', error);
      });
    } else {
      console.error('User not logged in');
    }
  }
}
