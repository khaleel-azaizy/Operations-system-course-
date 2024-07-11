import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DataService } from '../servises/data.service';
import { RatingModule } from 'primeng/rating';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-trips',
  standalone: true,
  imports: [FormsModule,RatingModule,CommonModule],
  templateUrl: './user-trips.component.html',
  styleUrl: './user-trips.component.css'
})
export class UserTripsComponent implements OnInit {
  userTrips: any[] = [];
  greeting: string = '';
  constructor(private dataService: DataService,private router: Router) {}

  ngOnInit(): void {
    const userid = this.dataService.getUserId();
    const username = this.dataService.getUsername();
    if (!this.dataService.isLoggedIn()) {
      this.router.navigate(['/login']);
    }
    this.greeting = `${username} here are your personal trips`;
    if (userid) {
      this.dataService.getUserTrips(userid).subscribe({
        next: (trips) => {
          this.userTrips = trips;
        },
        error: (error) => {
          console.error('Error fetching user trips:', error);
        }
      });
    }
  }
  
  openSidebar(): void {
    document.getElementById('mySidebar')!.style.left = '0';
  }

  closeSidebar(): void {
    document.getElementById('mySidebar')!.style.left = '-250px';
  }

  logout(): void {
    this.dataService.logout();
    this.router.navigate(['/login']);
  }
}
