import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  registerForm = this.fb.group({
    userName: ['', Validators.required],
    name: ['', Validators.required],
    designation: ['', Validators.required],
    role: ['', Validators.required],
    status: ['', Validators.required],
    password: ['', Validators.required]
  });

  errorMessage = '';
  successMessage = '';

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {}

  onSubmit(): void {
    if (this.registerForm.invalid) return;

    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    this.http.post('http://localhost:8080/auth/register', this.registerForm.value, { headers }).subscribe({
      next: () => {
        this.successMessage = 'User berhasil didaftarkan';
        this.registerForm.reset();
        this.errorMessage = '';
      },
      error: (err) => {
        this.errorMessage = err.error.message || 'Terjadi kesalahan';
        this.successMessage = '';
      }
    });
  }

    allowOnlyDigits(event: KeyboardEvent) {
    const char = String.fromCharCode(event.keyCode);
    if (!/^[0-9]$/.test(char)) {
      event.preventDefault();
    }
  }
  
}
