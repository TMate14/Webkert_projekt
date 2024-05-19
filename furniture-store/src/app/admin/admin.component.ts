import { Component, OnInit } from '@angular/core';
import { FurnitureService } from '../furniture.service';
import { Furniture } from '../models';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  furnitureList: Furniture[] = [];
  selectedFurniture: Furniture | null = null;
  newFurniture: Furniture = {
    id: '',
    name: '',
    description: '',
    price: 0,
    imageUrl: '',
    stock: 0
  };

  constructor(private furnitureService: FurnitureService) {}

  ngOnInit(): void {
    this.loadFurniture();
  }

  loadFurniture(): void {
    this.furnitureService.getFurnitureList().subscribe(furnitureList => {
      this.furnitureList = furnitureList;
    });
  }

  selectFurniture(furniture: Furniture): void {
    this.selectedFurniture = { ...furniture }; // Create a copy to edit
    console.log('Selected furniture for editing:', this.selectedFurniture);
  }

  saveFurniture(): void {
    if (this.selectedFurniture) {
      console.log('Saving edited furniture:', this.selectedFurniture);
      this.furnitureService.updateFurniture(this.selectedFurniture).then(() => {
        console.log('Furniture updated successfully');
        this.loadFurniture();
        this.selectedFurniture = null;
      }).catch(error => {
        console.error('Error updating furniture:', error);
      });
    } else {
      console.log('Adding new furniture:', this.newFurniture);
      this.furnitureService.addFurniture(this.newFurniture).then(() => {
        this.newFurniture = {
          id: '',
          name: '',
          description: '',
          price: 0,
          imageUrl: '',
          stock: 0
        };
        this.loadFurniture();
      }).catch(error => {
        console.error('Error adding furniture:', error);
      });
    }
  }

  deleteFurniture(id: string): void {
    this.furnitureService.deleteFurniture(id).then(() => {
      console.log('Furniture deleted successfully');
      this.loadFurniture();
    }).catch(error => {
      console.error('Error deleting furniture:', error);
    });
  }

  cancelEdit(): void {
    this.selectedFurniture = null;
  }
}
