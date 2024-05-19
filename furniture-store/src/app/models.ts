export class CartItem {
  constructor(
    public id: string,
    public name: string,
    public description: string,
    public price: number,
    public imageUrl: string,
    public quantity: number
  ) {}
}

export interface Purchase {
  id: string;
  items: CartItem[];
  total: number;
  date: Date;
}

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  role: 'admin' | 'user';
  previousPurchases: Purchase[];
}


export interface Furniture {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  stock: number;
}

export class ShoppingCart {
  items: CartItem[] = [];

  addItem(item: CartItem): void {
    const existingItem = this.items.find(
      (i) => i.id === item.id
    );
    if (existingItem) {
      existingItem.quantity += item.quantity;
    } else {
      this.items.push(item);
    }
  }

  removeItem(furnitureId: string): void {
    this.items = this.items.filter((item) => item.id !== furnitureId);
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
