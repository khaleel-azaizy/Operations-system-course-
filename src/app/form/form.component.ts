import { Component, input } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { DataService } from '../servises/data.service';
import { PaginationParams, user, users } from '../../types';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})
export class FormComponent {
  email: string = '';
  password: string = '';

  constructor(private dataService: DataService, private router: Router) {}

  onSubmit(): void {
    this.dataService.loginUser( { email: this.email, password: this.password }).subscribe({
      next: (data) => {
        if (data.username) {
          sessionStorage.setItem('username', data.username);
          sessionStorage.setItem('email', data.email);
          sessionStorage.setItem('userid', data.id);
          this.router.navigate(['/']);
        } else {
          this.validateData(data);
        }
      },
      error: (error) => {
        console.error('Error logging in:', error);
      }
    });
  }


  
  validateData(data: any): void {
    if (!data || !data.username) {
      this.showAlert('Invalid credentials. Please try again.');
    } else {
      sessionStorage.setItem('username', data.username);
      sessionStorage.setItem('email', data.email);
      this.router.navigate(['/']);
    }
  }

  showAlert(message: string): void {
    const alertContainer = document.querySelector('.alert-box') as HTMLElement;
    const alertMsg = document.querySelector('.alert') as HTMLElement;
    alertMsg.innerHTML = message;

    alertContainer.style.top = '5%';
    setTimeout(() => {
      alertContainer.style.top = '';
    }, 5000);
  }
}