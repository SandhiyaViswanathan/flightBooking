import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { returnDateValidator, invalidDepartureDateValidator } from '../../shared/validator/return-date.validator';
import { FlightService } from '../../core/services/flight.service';


@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {

  searchForm: FormGroup;

  cities = ['Chennai', 'Delhi', 'Mumbai', 'Bangalore', 'Hyderabad'];

  constructor(private fb: FormBuilder,
              private router: Router,
              private flightService: FlightService) {

    this.searchForm = this.fb.group({
      tripType: ['roundTrip'],
      from: ['', Validators.required],
      to: ['', Validators.required],
      departureDate: ['', Validators.required],
      returnDate: ['']
    },
    { validators: [returnDateValidator,invalidDepartureDateValidator] },
    );
  }

  swapCities() {
    const from = this.searchForm.value.from;
    const to = this.searchForm.value.to;

    this.searchForm.patchValue({
      from: to,
      to: from
    });
  }

  onSearch() {
    if (this.searchForm.invalid) return;
    this.flightService.searchCriteriaSubject.next(this.searchForm.value);
    this.router.navigate(['/results']);
  }
}
