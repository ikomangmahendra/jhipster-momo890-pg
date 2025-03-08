import dayjs from 'dayjs/esm';

import { INotification, NewNotification } from './notification.model';

export const sampleWithRequiredData: INotification = {
  id: 10110,
};

export const sampleWithPartialData: INotification = {
  id: 1745,
};

export const sampleWithFullData: INotification = {
  id: 5787,
  startDate: dayjs('2025-03-07T16:26'),
  endDate: dayjs('2025-03-07T22:19'),
};

export const sampleWithNewData: NewNotification = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
