import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DataService } from '../servises/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  name: string = '';
  email: string = '';
  password: string = '';

  constructor(private dataService: DataService, private router: Router) {}

 

  onSubmit(): void {
    this.dataService.registerUser( { username: this.name, email: this.email, password: this.password }).subscribe({
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
        console.error('Error registering:', error);
      }
    });
  }


  validateData(data: any): void {
    if (data === 'email already exists') {
      this.showAlert('Email already exists. Please try another email.');
    } else if (data === 'fill all the fields') {
      this.showAlert('Please fill all the fields.');
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
