export interface Flight {
  id: string;
  airline: string;
  flightNumber: string;
  from: string;
  to: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  price: number;
  availableSeats: number;
}

export interface BookingData {
  fullName: string;
  email: string;
  contactNumber: string;
  numberOfPassengers: number;
  selectedFlight?: Flight;
}

export interface Booking {
  referenceId: string;
  bookingData: BookingData;
  flight: Flight;
  totalPrice: number;
  bookingDate: Date;
}

export interface SearchCriteria {
  from: string;
  to: string;
  departureDate: string;
  returnDate?: string;
  isRoundTrip: boolean;
}
