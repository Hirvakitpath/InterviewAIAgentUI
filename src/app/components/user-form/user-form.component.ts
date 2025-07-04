import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { VisibilityService } from '../../services/visibility.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {
  isVisible = false;
  userForm: FormGroup;
  selectedFileName: string = 'No file chosen';
  selectedFile: File | null = null;

  constructor(
    private fb: FormBuilder,
    private visibilityService: VisibilityService,
    private http: HttpClient,
    private router: Router
  ) {
    this.userForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      name: ['', Validators.required],
      mobile: ['', [Validators.required, Validators.pattern('^[0-9]{8,10}$')]], // Adjusted to 8-10 digits
      description: ['', [Validators.required, Validators.maxLength(500)]]
    });
  }

  openFileInput(fileInput: HTMLInputElement) {
    console.log('openFileInput called', fileInput);
    fileInput.click();
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    console.log('File selected:', file); // Debug log
    this.selectedFileName = file ? file.name : 'No file chosen';
    this.selectedFile = file ? file : null;
  }

  ngOnInit() {
    this.visibilityService.showUserForm$.subscribe(
      visible => this.isVisible = visible
    );
  }

  onSubmit() {
  try {
    console.log('Form submitted', this.userForm.value, this.selectedFile);
    
    if (this.userForm.valid && this.selectedFile) {
      const formData = new FormData();
      formData.append('CandidateFullName', this.userForm.get('name')?.value);
      formData.append('Email', this.userForm.get('email')?.value);
      formData.append('PhoneNumber', this.userForm.get('mobile')?.value);
      formData.append('Description', this.userForm.get('description')?.value);
      formData.append('CV', this.selectedFile);
      formData.append('Questions', JSON.stringify([]));

      this.http.post('https://localhost:7187/api/Candidate/add-candidate-with-cv', formData)
        .subscribe({
          next: (response) => {
            console.log('Submission successful', response);
            this.userForm.reset();
            this.selectedFileName = 'No file chosen';
            this.selectedFile = null;
            this.visibilityService.toggleUserList(true);
            this.router.navigate(['/users']);
          },
          error: (error) => {
            console.error('Submission failed', error);
            alert('Error submitting form. Please try again.');
          }
        });
    } else {
      console.log('Form invalid or no file selected');
      alert('Please fill all required fields and select a CV file.');
    }
  } catch (error) {
    console.error('Unexpected error:', error);
    alert('An error occurred. Please try again.');
  }
}
}