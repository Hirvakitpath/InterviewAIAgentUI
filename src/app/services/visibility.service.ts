import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VisibilityService {
  private showUserList = new BehaviorSubject<boolean>(false);
  private showUserForm = new BehaviorSubject<boolean>(false);

  showUserList$ = this.showUserList.asObservable();
  showUserForm$ = this.showUserForm.asObservable();

  toggleUserList(show: boolean) {
    this.showUserList.next(show);
    if (show) {
      this.showUserForm.next(false);
    }
  }

  toggleUserForm(show: boolean) {
    this.showUserForm.next(show);
    if (show) {
      this.showUserList.next(false);
    }
  }
}