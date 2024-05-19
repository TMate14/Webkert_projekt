// import { Injectable } from '@angular/core';
// import { Observable, of } from 'rxjs';
// import { Furniture } from './models';

// @Injectable({
//   providedIn: 'root'
// })
// export class FurnitureService {
//   private furnitureList: Furniture[] = [
//     { id: 1, name: 'Sofa', description: 'A comfortable sofa.', price: 500, imageUrl: 'assets/sofa.jpg', stock: 5 },
//     { id: 2, name: 'Chair', description: 'A stylish chair.', price: 150, imageUrl: 'assets/chair.jpg', stock: 10 },
//     { id: 3, name: 'Table', description: 'A wooden table.', price: 300, imageUrl: 'assets/table.jpg', stock: 3 },
//     { id: 4, name: 'Bed', description: 'A king size bed.', price: 700, imageUrl: 'assets/bed.jpg', stock: 2 }
//   ];

//   constructor() {}

//   getFurnitureList(): Observable<Furniture[]> {
//     return of(this.furnitureList);
//   }

//   getFurnitureById(id: number): Observable<Furniture | undefined> {
//     const furniture = this.furnitureList.find(f => f.id === id);
//     return of(furniture);
//   }

//   addFurniture(furniture: Furniture): void {
//     furniture.id = Date.now(); // Generate a new ID based on the current timestamp
//     this.furnitureList.push(furniture);
//   }

//   updateFurniture(furniture: Furniture): void {
//     const index = this.furnitureList.findIndex(f => f.id === furniture.id);
//     if (index !== -1) {
//       this.furnitureList[index] = furniture;
//     }
//   }

//   deleteFurniture(id: number): void {
//     this.furnitureList = this.furnitureList.filter(f => f.id !== id);
//   }
// }

import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Furniture } from './models';

@Injectable({
  providedIn: 'root'
})
export class FurnitureService {

  constructor(private firestore: AngularFirestore) {}

  getFurnitureList(): Observable<Furniture[]> {
    return this.firestore.collection<Furniture>('furniture').snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Furniture;
        const id = a.payload.doc.id;
        return { ...data, id }; // Ensure id is added last to avoid overwriting
      }))
    );
  }

  getFurnitureById(id: string): Observable<Furniture | undefined> {
    return this.firestore.collection('furniture').doc<Furniture>(id).valueChanges();
  }

  addFurniture(furniture: Furniture): Promise<void> {
    const id = this.firestore.createId();
    return this.firestore.collection('furniture').doc(id).set({ ...furniture, id });
  }

  updateFurniture(furniture: Furniture): Promise<void> {
    return this.firestore.collection('furniture').doc(furniture.id).update(furniture);
  }

  deleteFurniture(id: string): Promise<void> {
    return this.firestore.collection('furniture').doc(id).delete();
  }
}
