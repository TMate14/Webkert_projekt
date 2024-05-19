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
    id: '0',
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
  }

  saveFurniture(): void {
    if (this.selectedFurniture) {
      this.furnitureService.updateFurniture(this.selectedFurniture);
    } else {
      this.furnitureService.addFurniture(this.newFurniture);
      this.newFurniture = {
        id: '0',
        name: '',
        description: '',
        price: 0,
        imageUrl: '',
        stock: 0
      };
    }
    this.loadFurniture();
    this.selectedFurniture = null;
  }

  deleteFurniture(id: string): void {
    this.furnitureService.deleteFurniture(id);
    this.loadFurniture();
  }  

  cancelEdit(): void {
    this.selectedFurniture = null;
  }
}
