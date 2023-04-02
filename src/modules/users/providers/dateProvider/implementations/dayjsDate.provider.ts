import * as dayjs from 'dayjs';

import { IDateProvider } from '../models/DateProvider.interface';

class DayjsDateProvider implements IDateProvider {
  addDays(days: number): Date {
    return dayjs().add(days, 'days').toDate();
  }
}

export default DayjsDateProvider;
