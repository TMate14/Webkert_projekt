import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FurnitureService } from '../furniture.service';
import { CartService } from '../cart.service';
import { Furniture } from '../models';

@Component({
  selector: 'app-furniture-detail',
  templateUrl: './furniture-detail.component.html',
  styleUrls: ['./furniture-detail.component.css']
})
export class FurnitureDetailComponent implements OnInit {
  furniture: Furniture | undefined;

  constructor(
    private route: ActivatedRoute,
    private furnitureService: FurnitureService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.furnitureService.getFurnitureById(id.toString()).subscribe(furniture => this.furniture = furniture);
  }

  addToCart(furniture: Furniture): void {
    this.cartService.addToCart(furniture, 1);
  }
}
