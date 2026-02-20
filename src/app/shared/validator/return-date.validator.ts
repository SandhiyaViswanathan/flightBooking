import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const returnDateValidator: ValidatorFn = (
  group: AbstractControl
): ValidationErrors | null => {

  const tripType = group.get('tripType')?.value;
  const departure = group.get('departureDate')?.value;
  const returnDate = group.get('returnDate')?.value;

  if (tripType === 'roundTrip') {

    if (!returnDate) {
      return { returnRequired: true };
    }

    if (departure && returnDate && returnDate < departure) {
      return { invalidReturnDate: true };
    }
  }

  return null;
};

export const invalidDepartureDateValidator: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  const departureDate = control.get('departureDate')?.value;
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Set to start of the day  
  if (departureDate && new Date(departureDate) < today) {
    return { invalidDepartureDate: true };
  }

  return null;
};
