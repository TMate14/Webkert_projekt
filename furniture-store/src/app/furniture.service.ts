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
    console.log('Updating furniture in Firestore:', furniture);
    return this.firestore.collection('furniture').doc(furniture.id).update(furniture);
  }

  deleteFurniture(id: string): Promise<void> {
    console.log('Deleting furniture from Firestore with id:', id);
    return this.firestore.collection('furniture').doc(id).delete();
  }
}
