import dayjs from 'dayjs/esm';
import { CustomerType } from 'app/entities/enumerations/customer-type.model';
import { CustomerStatus } from 'app/entities/enumerations/customer-status.model';

export interface ICustomer {
  id: number;
  registerDate?: dayjs.Dayjs | null;
  customerType?: keyof typeof CustomerType | null;
  firstName?: string | null;
  lastName?: string | null;
  primaryEmail?: string | null;
  primaryPhone?: string | null;
  status?: keyof typeof CustomerStatus | null;
}

export type NewCustomer = Omit<ICustomer, 'id'> & { id: null };
