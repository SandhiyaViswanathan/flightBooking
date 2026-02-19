import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Flight } from '../../core/models/flight.model';

@Component({
  selector: 'app-flight-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './flight-card.component.html',
  styleUrl: './flight-card.component.scss'
})
export class FlightCardComponent {
  @Input() flight!: Flight;
  @Output() bookClick = new EventEmitter<Flight>();

  onBookClick(): void {
    this.bookClick.emit(this.flight);
  }
}
