import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Flight, SearchCriteria, BookingData, Booking } from '../models/flight.model';

@Injectable({
  providedIn: 'root'
})
export class FlightService {
  private flights: Flight[] = [];
  private searchCriteriaSubject = new BehaviorSubject<SearchCriteria | null>(null);
  private selectedFlightSubject = new BehaviorSubject<Flight | null>(null);
  private bookingDataSubject = new BehaviorSubject<BookingData | null>(null);

  searchCriteria$ = this.searchCriteriaSubject.asObservable();
  selectedFlight$ = this.selectedFlightSubject.asObservable();
  bookingData$ = this.bookingDataSubject.asObservable();

  constructor(private http: HttpClient) {
    this.loadFlights();
  }

  private loadFlights(): void {
    this.http.get<Flight[]>('/assets/data/flights.json').subscribe(
      data => {
        this.flights = data;
      },
      error => {
        console.error('Error loading flights:', error);
        // this.flights = this.getMockFlights();
      }
    );
  }

  searchFlights(criteria: SearchCriteria): Observable<Flight[]> {
    this.searchCriteriaSubject.next(criteria);
    return new Observable(observer => {
      // Simulate API delay
      setTimeout(() => {
        observer.next(this.flights);
        observer.complete();
      }, 500);
    });
  }

  getFlights(): Flight[] {
    return this.flights;
  }

  selectFlight(flight: Flight): void {
    this.selectedFlightSubject.next(flight);
  }

  getSelectedFlight(): Flight | null {
    return this.selectedFlightSubject.getValue();
  }

  saveBookingData(data: BookingData): void {
    this.bookingDataSubject.next(data);
  }

  getBookingData(): BookingData | null {
    return this.bookingDataSubject.getValue();
  }

  completeBooking(bookingData: BookingData, flight: Flight): Booking {
    const referenceId = 'BK' + Date.now();
    const totalPrice = flight.price * bookingData.numberOfPassengers;
    
    const booking: Booking = {
      referenceId,
      bookingData,
      flight,
      totalPrice,
      bookingDate: new Date()
    };

    return booking;
  }

  getAirlines(): string[] {
    const uniqueAirlines = [...new Set(this.flights.map(f => f.airline))];
    return uniqueAirlines.sort();
  }

  getTimeSlots(): string[] {
    return ['Morning (06:00-12:00)', 'Afternoon (12:00-18:00)', 'Evening (18:00-00:00)'];
  }
}
