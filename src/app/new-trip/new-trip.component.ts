import { Component } from '@angular/core';
import { DataService } from '../servises/data.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-new-trip',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './new-trip.component.html',
  styleUrl: './new-trip.component.css'
})
export class NewTripComponent {
  trip = {
    location: '',
    description: '',
    image_url: '',
    rating: 0
  };

  constructor(private dataService: DataService, private router: Router) {}
  ngOnInit(): void {
    if (!this.dataService.isLoggedIn()) {
      this.router.navigate(['/login']);
    } 
  }
  onSubmit(): void {
    const userid = this.dataService.getUserId();
    const tripData = { ...this.trip, userid };

    console.log('Submitting trip data:', tripData); // Debug log

    this.dataService.addTrip(tripData).subscribe({
      next: () => {
        this.router.navigate(['/']); // Redirect to home page after submission
      },
      error: (error) => {
        console.error('Error adding trip:', error);
      }
    });
  }
    
  }

