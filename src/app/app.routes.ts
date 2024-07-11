import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { FormComponent } from './form/form.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { NewTripComponent } from './new-trip/new-trip.component';
import { UserTripsComponent } from './user-trips/user-trips.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: FormComponent },
  { path: 'register', component: RegisterComponent },
  { path:'new-trip' , component:NewTripComponent},
  { path: 'user-trips', component: UserTripsComponent }
];

