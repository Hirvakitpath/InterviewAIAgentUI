import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { VisibilityService } from './services/visibility.service';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'H-care Dashboard';
  showDashboardLayout: boolean = true;
  isDropdownOpen: boolean = false;

  constructor(
    private router: Router,
    private visibilityService: VisibilityService
  ) {
  }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  logout() {
    // Implement your logout logic here
    console.log('User logged out');
    // For example, navigate to a login page or clear user session
    this.router.navigate(['/login']); // Assuming you have a login route
  }

  showUserList() {
    this.visibilityService.toggleUserList(true);
    this.router.navigate(['/users']);
  }

  showUserForm() {
    this.visibilityService.toggleUserForm(true);
    this.router.navigate(['/register']);
  }
}