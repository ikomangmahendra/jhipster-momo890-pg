import { ICategory, NewCategory } from './category.model';

export const sampleWithRequiredData: ICategory = {
  id: 8109,
};

export const sampleWithPartialData: ICategory = {
  id: 862,
  name: 'meanwhile',
};

export const sampleWithFullData: ICategory = {
  id: 28780,
  name: 'ouch',
};

export const sampleWithNewData: NewCategory = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
