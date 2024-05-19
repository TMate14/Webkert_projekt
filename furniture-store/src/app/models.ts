export interface Furniture {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  stock: number;
}

export interface User {
    id: string;  // Change number to string
    name: string;
    email: string;
    password: string;
    role: 'admin' | 'user';
    previousPurchases: Purchase[];
  }
  
  export interface Purchase {
    id: string;
    items: CartItem[];
    total: number;
    date: Date;
  }
  
  export interface CartItem {
    id: string;
    name: string;
    price: number;
    quantity: number;
  }
  

export interface Furniture {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  stock: number;
}

export class CartItem {
  constructor(
    public furnitureId: number,
    public name: string,
    public price: number,
    public quantity: number
  ) {}
}

export class ShoppingCart {
  items: CartItem[] = [];

  addItem(item: CartItem): void {
    const existingItem = this.items.find(
      (i) => i.furnitureId === item.furnitureId
    );
    if (existingItem) {
      existingItem.quantity += item.quantity;
    } else {
      this.items.push(item);
    }
  }

  removeItem(furnitureId: number): void {
    this.items = this.items.filter((item) => item.furnitureId !== furnitureId);
  }

  clearCart(): void {
    this.items = [];
  }

  getTotalPrice(): number {
    return this.items.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  }
}
