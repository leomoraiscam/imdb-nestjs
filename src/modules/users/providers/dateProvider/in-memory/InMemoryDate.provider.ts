import { IDateProvider } from '../models/DateProvider.interface';

export class InMemoryDateProvider implements IDateProvider {
  dateNow(): Date {
    return new Date();
  }

  addDays(days: number): Date {
    const date = new Date();

    const result = new Date(date);

    result.setDate(result.getDate() + days);

    return result;
  }

  addHours(hours: number): Date {
    const expiryDate = new Date(
      new Date().setHours(new Date().getHours() + hours),
    );

    return expiryDate;
  }

  compareIfBefore(startDate: Date, endDate: Date): boolean {
    const first = new Date(startDate);
    const end = new Date(endDate);

    if (first > end) {
      return true;
    } else {
      return false;
    }
  }
}
