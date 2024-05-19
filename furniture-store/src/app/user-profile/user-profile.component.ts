import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { User, Purchase } from '../models';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  user: User | null = null;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.currentUser.subscribe(user => {
      this.user = user;
    });
  }

  getPurchaseTotal(purchase: Purchase): number {
    return purchase.total;
  }

  getPurchaseDate(purchase: Purchase): Date {
    return purchase.date as unknown as Date;
  }
}
