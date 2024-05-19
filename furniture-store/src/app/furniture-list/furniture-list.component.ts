import { Component, OnInit } from '@angular/core';
import { FurnitureService } from '../furniture.service';
import { Furniture } from '../models';

@Component({
  selector: 'app-furniture-list',
  templateUrl: './furniture-list.component.html',
  styleUrls: ['./furniture-list.component.css']
})
export class FurnitureListComponent implements OnInit {

  furnitureList: Furniture[] = [];

  constructor(private furnitureService: FurnitureService) { }

  ngOnInit(): void {
    this.furnitureService.getFurnitureList().subscribe((data: Furniture[]) => {
      this.furnitureList = data;
    });
  }
}
