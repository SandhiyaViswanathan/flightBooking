import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FlightService } from '../../core/services/flight.service';

@Component({
  selector: 'app-filter-sidebar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './filter-sidebar.component.html',
  styleUrl: './filter-sidebar.component.scss'
})
export class FilterSidebarComponent implements OnInit {
  @Output() filterChange = new EventEmitter<any>();

  airlines: string[] = [];
  timeSlots: string[] = [];

  selectedAirlines: Set<string> = new Set();
  selectedTimeSlots: Set<string> = new Set();
  priceRange: number = 1000;

  constructor(private flightService: FlightService) {}

  ngOnInit(): void {
    this.airlines = this.flightService.getAirlines();
    this.timeSlots = this.flightService.getTimeSlots();
  }

  toggleAirline(airline: string): void {
    if (this.selectedAirlines.has(airline)) {
      this.selectedAirlines.delete(airline);
    } else {
      this.selectedAirlines.add(airline);
    }
    this.emitFilters();
  }

  toggleTimeSlot(slot: string): void {
    if (this.selectedTimeSlots.has(slot)) {
      this.selectedTimeSlots.delete(slot);
    } else {
      this.selectedTimeSlots.add(slot);
    }
    this.emitFilters();
  }

  onPriceChange(): void {
    this.emitFilters();
  }

  emitFilters(): void {
    this.filterChange.emit({
      airlines: Array.from(this.selectedAirlines),
      timeSlots: Array.from(this.selectedTimeSlots),
      maxPrice: this.priceRange
    });
  }

  clearFilters(): void {
    this.selectedAirlines.clear();
    this.selectedTimeSlots.clear();
    this.priceRange = 1000;
    this.emitFilters();
  }
}
