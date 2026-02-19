import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Flight } from '../../core/models/flight.model';
import { FlightService } from '../../core/services/flight.service';
import { FlightCardComponent } from '../../shared/flight-card/flight-card.component';
import { FilterSidebarComponent } from '../../shared/filter-sidebar/filter-sidebar.component';

@Component({
  selector: 'app-results',
  standalone: true,
  imports: [CommonModule, FormsModule, FlightCardComponent, FilterSidebarComponent],
  templateUrl: './results.component.html',
  styleUrl: './results.component.scss'
})
export class ResultsComponent implements OnInit {
  flights: Flight[] = [];
  filteredFlights: Flight[] = [];
  sortBy: string = 'price';
  searchCriteria: any = null;
  
  private filters: any = {
    airlines: [],
    timeSlots: [],
    maxPrice: 1000
  };

  constructor(
    private flightService: FlightService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const navigationState = this.router.getCurrentNavigation()?.extras?.state || (history && history.state);

    if (navigationState && Object.keys(navigationState).length) {
      this.searchCriteria = navigationState;
      console.log('Received search criteria:', this.searchCriteria);
      // Use service to perform a search (simulated) and then filter by from/to
      this.flightService.searchFlights(this.searchCriteria).subscribe((flights: Flight[]) => {
        // Narrow results by origin/destination from the search criteria
        this.flights = flights.filter(f => {
          const matchesFrom = !this.searchCriteria.from || f.from === this.searchCriteria.from;
          const matchesTo = !this.searchCriteria.to || f.to === this.searchCriteria.to;
          return matchesFrom && matchesTo;
        });

        this.filteredFlights = [...this.flights];
      });
    } else {
      // Fallback: load all flights and allow user to filter
      this.flights = this.flightService.getFlights();
      this.filteredFlights = [...this.flights];
    }
  }

  onFilterChange(filters: any): void {
    this.filters = filters;
    this.applyFiltersAndSort();
  }

  onSortChange(): void {
    this.applyFiltersAndSort();
  }

  private applyFiltersAndSort(): void {
    // Apply filters
    this.filteredFlights = this.flights.filter(flight => {
      // Price filter
      if (flight.price > this.filters.maxPrice) {
        return false;
      }

      // Airline filter
      if (this.filters.airlines.length > 0 && !this.filters.airlines.includes(flight.airline)) {
        return false;
      }

      // Time slot filter
      if (this.filters.timeSlots.length > 0) {
        const hour = parseInt(flight.departureTime.split(':')[0]);
        const matchesTimeSlot = this.filters.timeSlots.some((slot: string) => {
          if (slot.includes('Morning')) return hour >= 6 && hour < 12;
          if (slot.includes('Afternoon')) return hour >= 12 && hour < 18;
          if (slot.includes('Evening')) return hour >= 18 || hour < 6;
          return false;
        });
        if (!matchesTimeSlot) {
          return false;
        }
      }

      return true;
    });

    // Apply sorting
    this.sortFlights();
  }

  private sortFlights(): void {
    switch (this.sortBy) {
      case 'price':
        this.filteredFlights.sort((a, b) => a.price - b.price);
        break;
      case 'duration':
        this.filteredFlights.sort((a, b) => {
          const aDuration = this.parseDuration(a.duration);
          const bDuration = this.parseDuration(b.duration);
          return aDuration - bDuration;
        });
        break;
      case 'departure':
        this.filteredFlights.sort((a, b) => a.departureTime.localeCompare(b.departureTime));
        break;
      default:
        break;
    }
  }

  private parseDuration(duration: string): number {
    // Parse "7h 30m" to minutes
    const match = duration.match(/(\d+)h\s*(\d+)?m/);
    if (match) {
      const hours = parseInt(match[1]);
      const minutes = match[2] ? parseInt(match[2]) : 0;
      return hours * 60 + minutes;
    }
    return 0;
  }

  onBookFlight(flight: Flight): void {
    this.flightService.selectFlight(flight);
    this.router.navigate(['/booking']);
  }
}
