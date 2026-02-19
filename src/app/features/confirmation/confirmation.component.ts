import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Booking, BookingData, Flight } from '../../core/models/flight.model';
import { FlightService } from '../../core/services/flight.service';

@Component({
  selector: 'app-confirmation',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './confirmation.component.html',
  styleUrl: './confirmation.component.scss'
})
export class ConfirmationComponent implements OnInit {
  booking: Booking | null = null;
  bookingData: BookingData | null = null;
  selectedFlight: Flight | null = null;

  constructor(
    private flightService: FlightService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.bookingData = this.flightService.getBookingData();
    this.selectedFlight = this.flightService.getSelectedFlight();

    if (!this.bookingData || !this.selectedFlight) {
      this.router.navigate(['/search']);
      return;
    }

    // Complete the booking
    this.booking = this.flightService.completeBooking(this.bookingData, this.selectedFlight);
  }

  onBackToSearch(): void {
    this.router.navigate(['/search']);
  }
}
