import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { VisibilityService } from '../../services/visibility.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  isVisible = false;
  users = [
    { name: 'John Doe', email: 'john@example.com', mobile: '1234567890' },
    { name: 'Jane Smith', email: 'jane@example.com', mobile: '9876543210' },
    { name: 'Alice Johnson', email: 'alice@example.com', mobile: '1122334455' },
    { name: 'Bob Williams', email: 'bob@example.com', mobile: '9988776655' }
  ];

  constructor(
    private visibilityService: VisibilityService,
    private router: Router
  ) {}

  viewUserDetails(user: any) {
    // For now, we'll just use the user's name as an ID. In a real app, this would be a unique ID.
    this.router.navigate(['/user-details', user.name]);
  }

  ngOnInit() {
    this.visibilityService.showUserList$.subscribe(
      visible => this.isVisible = visible
    );
  }
}