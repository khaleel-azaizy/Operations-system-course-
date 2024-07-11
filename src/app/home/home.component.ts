import { Component } from '@angular/core';
import { DataService } from '../servises/data.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RatingModule } from 'primeng/rating';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  standalone: true,
  imports: [CommonModule,FormsModule,RatingModule]
})
export class HomeComponent {
 
  topTrips: any[] = [];
  greeting: string = '';
  searchResults: any[] = [];
  searchQuery: string = '';
   constructor(private dataservice:DataService ,private router: Router){}
 
   ngOnInit(): void {
    if (!this.dataservice.isLoggedIn()) {
      this.router.navigate(['/login']);
    } else {
      const username = this.dataservice.getUsername();
      this.greeting = `${username} Welcome to Travel Diary`;
      this.fetchTopTrips();
    }
  }

  fetchTopTrips(): void {
    this.dataservice.getTopTrips().subscribe({
      next: (data) => {
        this.topTrips = data;
      },
      error: (error) => {
        console.error('Error fetching top trips:', error);
      }
    });
  }

  onSearch(): void {
    if (this.searchQuery.trim()) {
      this.dataservice.searchTrips(this.searchQuery).subscribe({
        next: (results) => {
          this.searchResults = results;
        },
        error: (error) => {
          console.error('Error searching trips:', error);
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
      this.dataservice.logout();
      this.router.navigate(['/login']);
    }
    
}
