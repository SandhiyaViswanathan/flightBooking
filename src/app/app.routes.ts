import { Routes } from '@angular/router';
import { SearchComponent } from './features/search/search.component';
import { ResultsComponent } from './features/results/results.component';
import { BookingComponent } from './features/booking/booking.component';
import { ConfirmationComponent } from './features/confirmation/confirmation.component';

export const routes: Routes = [
  { path: '', redirectTo: '/search', pathMatch: 'full' },
  { path: 'search', component: SearchComponent },
  { path: 'results', component: ResultsComponent },
  { path: 'booking', component: BookingComponent },
  { path: 'confirmation', component: ConfirmationComponent },
  { path: '**', redirectTo: '/search' }
];
