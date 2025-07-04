import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { VisibilityService } from '../../services/visibility.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {
  isVisible = false;
  userForm: FormGroup;
  selectedFileName: string = 'No file chosen';

  constructor(
    private fb: FormBuilder,
    private visibilityService: VisibilityService
  ) {
    this.userForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      name: ['', Validators.required],
      mobile: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      cv: [null, Validators.required]
    });
  }

  openFileInput(fileInput: HTMLInputElement) {
    fileInput.click();
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    this.selectedFileName = file ? file.name : 'No file chosen';
    this.userForm.patchValue({
      cv: file
    });
  }

  ngOnInit() {
    this.visibilityService.showUserForm$.subscribe(
      visible => this.isVisible = visible
    );
  }

  onSubmit() {
    if (this.userForm.valid) {
      console.log(this.userForm.value);
      this.userForm.reset();
      this.selectedFileName = 'No file chosen';
      this.visibilityService.toggleUserList(true);
    }
  }
}