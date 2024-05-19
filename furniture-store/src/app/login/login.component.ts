import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  async login(): Promise<void> {
    try {
      await this.authService.login(this.email, this.password);
      this.router.navigate(['/']);
    } catch (error) {
      console.error('Login error:', error);
      // handle error, e.g., show an error message
    }
  }
  
}
