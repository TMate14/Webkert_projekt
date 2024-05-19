import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FurnitureService } from '../furniture.service';
import { Furniture } from '../models';

@Component({
  selector: 'app-furniture-list',
  templateUrl: './furniture-list.component.html',
  styleUrls: ['./furniture-list.component.css']
})
export class FurnitureListComponent implements OnInit {

  furnitureList: Furniture[] = [];

  constructor(private furnitureService: FurnitureService, private router: Router) { }

  ngOnInit(): void {
    this.furnitureService.getFurnitureList().subscribe(data => {
      this.furnitureList = data;
    });
  }

  viewDetails(id: string): void {
    this.router.navigate(['/furniture', id]);
  }
}
