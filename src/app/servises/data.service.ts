import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Observable } from 'rxjs';
import { StorageService } from '../storage/storage.service';
import { isPlatformBrowser } from '@angular/common';
@Injectable({
  providedIn: 'root'
})
export class DataService {
  private BASE_URL = 'http://localhost:3000';

 
  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  loginUser(body: any): Observable<any> {
    return this.http.post<any>(`${this.BASE_URL}/login-user`, body);
  }

  registerUser(body: any): Observable<any> {
    return this.http.post<any>(`${this.BASE_URL}/register-user`, body);
  }

  isLoggedIn(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      return !!sessionStorage.getItem('userid');
    }
    return false;
  }

  getUsername(): string | null {
    if (isPlatformBrowser(this.platformId)) {
      return sessionStorage.getItem('username');
    }
    return null;
  }

  getUserId(): string | null {
    if (isPlatformBrowser(this.platformId)) {
      const userid = sessionStorage.getItem('userid');
      console.log('Retrieved userid from session storage:', userid); // Debug log
      return userid;
    }
    return null;
  }

  logout(): void {
    if (isPlatformBrowser(this.platformId)) {
      sessionStorage.removeItem('username');
      sessionStorage.removeItem('email');
      sessionStorage.removeItem('userid');
    }
  }

  getTopTrips(): Observable<any> {
    return this.http.get<any>(`${this.BASE_URL}/top-trips`);
  }
  getUserTrips(userid: string): Observable<any> {
    return this.http.get<any>(`${this.BASE_URL}/user-trips/${userid}`);
  }
  addTrip(trip: any): Observable<any> {
    const userid = this.getUserId();
    if (!userid) {
      throw new Error('User ID not found in session storage.');
    }
    const tripData = { ...trip, userid };
    console.log('Sending trip data:', tripData); // Debug log
    return this.http.post<any>(`${this.BASE_URL}/add-trip`, tripData);
  }
  searchTrips(query: string): Observable<any> {
    return this.http.get<any>(`${this.BASE_URL}/search-trips?q=${query}`);
  }
}