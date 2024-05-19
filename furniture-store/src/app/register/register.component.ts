import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  name: string = '';
  email: string = '';
  password: string = '';
  role: 'admin' | 'user' = 'user';

  constructor(private authService: AuthService, private router: Router) {}

  register(): void {
    this.authService.register(this.name, this.email, this.password, this.role);
    this.router.navigate(['/login']);
  }
}
