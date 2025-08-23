import dayjs from 'dayjs/esm';

import { ICustomer, NewCustomer } from './customer.model';

export const sampleWithRequiredData: ICustomer = {
  id: 3366,
  registerDate: dayjs('2025-08-22'),
  customerType: 'CORPORATE',
  firstName: 'Karley',
  primaryEmail: 'stained',
  status: 'SUSPENDED',
};

export const sampleWithPartialData: ICustomer = {
  id: 21246,
  registerDate: dayjs('2025-08-22'),
  customerType: 'PERSONAL',
  firstName: 'Eleazar',
  primaryEmail: 'insolence window secret',
  status: 'SUSPENDED',
};

export const sampleWithFullData: ICustomer = {
  id: 4149,
  registerDate: dayjs('2025-08-22'),
  customerType: 'PERSONAL',
  firstName: 'Johnny',
  lastName: 'Doyle-Bergnaum',
  primaryEmail: 'rout sweetly abaft',
  primaryPhone: 'brr',
  status: 'SUSPENDED',
};

export const sampleWithNewData: NewCustomer = {
  registerDate: dayjs('2025-08-22'),
  customerType: 'CORPORATE',
  firstName: 'Chelsey',
  primaryEmail: 'vain however',
  status: 'BLOCKED',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
