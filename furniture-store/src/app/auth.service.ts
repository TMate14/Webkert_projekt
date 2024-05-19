import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { BehaviorSubject, Observable } from 'rxjs';
import { User, CartItem, Purchase } from './models';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);
  public currentUser: Observable<User | null> = this.currentUserSubject.asObservable();

  constructor(private afAuth: AngularFireAuth, private firestore: AngularFirestore) {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.firestore.collection('users').doc<User>(user.uid).valueChanges().subscribe(currentUser => {
          this.currentUserSubject.next(currentUser || null);
        });
      } else {
        this.currentUserSubject.next(null);
      }
    });
  }

  async register(name: string, email: string, password: string, role: 'admin' | 'user'): Promise<void> {
    const userCredential = await this.afAuth.createUserWithEmailAndPassword(email, password);
    const user: User = { id: userCredential.user?.uid || '', name, email, password, role, previousPurchases: [] };
    await this.firestore.collection('users').doc(user.id).set(user);
  }

  async login(email: string, password: string): Promise<void> {
    await this.afAuth.signInWithEmailAndPassword(email, password);
  }

  async logout(): Promise<void> {
    await this.afAuth.signOut();
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  async makePurchase(cartItems: CartItem[], total: number): Promise<void> {
    const user = this.getCurrentUser();
    if (user) {
      const newPurchase: Purchase = { id: Date.now().toString(), items: cartItems, total, date: new Date() };
      user.previousPurchases.push(newPurchase);
      await this.firestore.collection('users').doc(user.id).update(user);
      this.currentUserSubject.next(user); // Update the currentUserSubject to trigger updates
    }
  }
}
