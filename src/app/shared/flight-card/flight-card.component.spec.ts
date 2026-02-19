import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FlightCardComponent } from './flight-card.component';
import { Flight } from '../../core/models/flight.model';

describe('FlightCardComponent', () => {
  let component: FlightCardComponent;
  let fixture: ComponentFixture<FlightCardComponent>;

  const mockFlight: Flight = {
    "id": "FL001",
    "airline": "SkyAir",
    "flightNumber": "SA101",
    "from": "Bangalore",
    "to": "Chennai",
    "departureTime": "08:00",
    "arrivalTime": "20:30",
    "duration": "7h 30m",
    "price": 450,
    "availableSeats": 120
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FlightCardComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(FlightCardComponent);
    component = fixture.componentInstance;
    component.flight = mockFlight;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display flight airline name', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.textContent).toContain('SkyAir');
  });

  it('should display flight number', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.textContent).toContain('SA101');
  });

  it('should display route information', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.textContent).toContain('New York');
    expect(compiled.textContent).toContain('London');
  });

  it('should display times', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.textContent).toContain('08:00');
    expect(compiled.textContent).toContain('20:30');
  });

  it('should display price', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.textContent).toContain('450');
  });

  it('should display available seats', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.textContent).toContain('120');
  });

  it('should have a book button', () => {
    const compiled = fixture.nativeElement;
    const button = compiled.querySelector('.btn');
    expect(button).toBeTruthy();
    expect(button.textContent).toContain('Book Now');
  });

  it('should emit bookClick event when Book Now button is clicked', () => {
    spyOn(component.bookClick, 'emit');
    
    const button = fixture.nativeElement.querySelector('.btn');
    button.click();
    
    expect(component.bookClick.emit).toHaveBeenCalledWith(mockFlight);
  });

  it('should display duration', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.textContent).toContain('7h 30m');
  });
});
