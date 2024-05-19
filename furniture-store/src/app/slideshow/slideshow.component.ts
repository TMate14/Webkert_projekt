import { Component, OnInit } from '@angular/core';
import { FurnitureService } from '../furniture.service';
import { Furniture } from '../models';

@Component({
  selector: 'app-slideshow',
  templateUrl: './slideshow.component.html',
  styleUrls: ['./slideshow.component.css']
})
export class SlideshowComponent implements OnInit {
  furnitureList: Furniture[] = [];
  currentIndex: number = 0;
  previousIndex: number = -1;

  constructor(private furnitureService: FurnitureService) { }

  ngOnInit(): void {
    this.furnitureService.getFurnitureList().subscribe(data => {
      this.furnitureList = data;
      this.startSlideshow();
    });
  }

  startSlideshow() {
    setInterval(() => {
      this.previousIndex = this.currentIndex;
      this.currentIndex = (this.currentIndex + 1) % this.furnitureList.length;
    }, 4000);
  }

  getSlideClass(index: number): string {
    if (index === this.currentIndex) {
      return 'slide active';
    } else if (index === this.previousIndex) {
      if (this.previousIndex < this.currentIndex) {
        return 'slide slide-left-exit-active';
      } else {
        return 'slide slide-right-exit-active';
      }
    } else if (index < this.currentIndex) {
      return 'slide slide-left-enter';
    } else {
      return 'slide slide-right-enter';
    }
  }
}
