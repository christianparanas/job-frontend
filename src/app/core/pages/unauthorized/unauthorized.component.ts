import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-unauthorized',
  imports: [],
  templateUrl: './unauthorized.component.html',
  styleUrl: './unauthorized.component.css'
})
export class UnauthorizedComponent {
constructor(
    public router: Router,
    private authService: AuthService, // Inject the UserService
  ) {}

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
