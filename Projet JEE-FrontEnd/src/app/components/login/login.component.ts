import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import Swal from 'sweetalert2';

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule],
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  email: string = '';
  password: string = '';
  isSaving: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    // Change background color
    if (typeof window !== 'undefined' && typeof document !== 'undefined') {
      document.body.style.backgroundColor = '#323232';
    }
  }

  ngOnDestroy(): void {
    // Reset background color
    if (typeof window !== 'undefined' && typeof document !== 'undefined') {
      document.body.style.backgroundColor = '';
    }
  }

  handleSubmit(): void {
    this.isSaving = true;
  
    // Call the AuthService to perform login
    this.authService.login(this.email, this.password).subscribe({
      next: (response) => {
        console.log('Login successful', response);
  
        // Save the token in localStorage
        localStorage.setItem('authToken', response.token);
  
        // Save the user role and other user details
        localStorage.setItem('role', response.role);
  
        // Extract user details and save them
        if (response.user) {
          localStorage.setItem('userId', response.user.id.toString());
          localStorage.setItem('user', JSON.stringify(response.user));
        }
  
        // Show success message
        Swal.fire({
          icon: 'success',
          title: 'Login successfully!',
          showConfirmButton: false,
          timer: 1500
        });
  
        // Redirect based on role
        setTimeout(() => {
          if (response.role === 'RH') {
            this.router.navigate(['/dashboard']);
          } else if (response.role === 'EMPLOYEE') {
            this.router.navigate(['Empdashboard']);
          } else {
            this.router.navigate(['/login']);
          }
          this.isSaving = false;
        }, 1500);
      },
      error: (err) => {
        console.error('Login failed', err);
  
        // Show error message
        Swal.fire({
          icon: 'error',
          title: 'An Error Occurred!',
          text: err.error?.errorMessage || 'Invalid email or password',
          showConfirmButton: true,
        });
  
        this.isSaving = false;
      }
    });
  }
  
}
