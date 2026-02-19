import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Flight, BookingData } from '../../core/models/flight.model';
import { FlightService } from '../../core/services/flight.service';

@Component({
  selector: 'app-booking',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './booking.component.html',
  styleUrl: './booking.component.scss'
})
export class BookingComponent implements OnInit {
  bookingForm!: FormGroup;
  selectedFlight: Flight | null = null;
  showErrors: boolean = false;

  constructor(
    private fb: FormBuilder,
    private flightService: FlightService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.selectedFlight = this.flightService.getSelectedFlight();
    if (!this.selectedFlight) {
      this.router.navigate(['/search']);
      return;
    }

    this.initializeForm();
  }

  private initializeForm(): void {
    this.bookingForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      contactNumber: ['', [Validators.required, Validators.pattern(/^\d{10,}$/)]],
      numberOfPassengers: [1, [Validators.required, Validators.min(1), Validators.max(9)]]
    });
  }

  get fullName() {
    return this.bookingForm.get('fullName');
  }

  get email() {
    return this.bookingForm.get('email');
  }

  get contactNumber() {
    return this.bookingForm.get('contactNumber');
  }

  get numberOfPassengers() {
    return this.bookingForm.get('numberOfPassengers');
  }

  getTotalPrice(): number {
    if (!this.selectedFlight || !this.numberOfPassengers) {
      return 0;
    }
    return this.selectedFlight.price * this.numberOfPassengers.value;
  }

  onSubmit(): void {
    this.showErrors = true;

    if (this.bookingForm.invalid) {
      return;
    }

    const bookingData: BookingData = {
      fullName: this.bookingForm.get('fullName')?.value,
      email: this.bookingForm.get('email')?.value,
      contactNumber: this.bookingForm.get('contactNumber')?.value,
      numberOfPassengers: this.bookingForm.get('numberOfPassengers')?.value,
      selectedFlight: this.selectedFlight!
    };

    this.flightService.saveBookingData(bookingData);
    this.router.navigate(['/confirmation']);
  }

  onCancel(): void {
    this.router.navigate(['/results']);
  }
}
