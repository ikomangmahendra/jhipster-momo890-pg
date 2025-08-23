import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { ICustomer, NewCustomer } from '../customer.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts ICustomer for edit and NewCustomerFormGroupInput for create.
 */
type CustomerFormGroupInput = ICustomer | PartialWithRequiredKeyOf<NewCustomer>;

type CustomerFormDefaults = Pick<NewCustomer, 'id'>;

type CustomerFormGroupContent = {
  id: FormControl<ICustomer['id'] | NewCustomer['id']>;
  registerDate: FormControl<ICustomer['registerDate']>;
  customerType: FormControl<ICustomer['customerType']>;
  firstName: FormControl<ICustomer['firstName']>;
  lastName: FormControl<ICustomer['lastName']>;
  primaryEmail: FormControl<ICustomer['primaryEmail']>;
  primaryPhone: FormControl<ICustomer['primaryPhone']>;
  status: FormControl<ICustomer['status']>;
};

export type CustomerFormGroup = FormGroup<CustomerFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class CustomerFormService {
  createCustomerFormGroup(customer: CustomerFormGroupInput = { id: null }): CustomerFormGroup {
    const customerRawValue = {
      ...this.getFormDefaults(),
      ...customer,
    };
    return new FormGroup<CustomerFormGroupContent>({
      id: new FormControl(
        { value: customerRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      registerDate: new FormControl(customerRawValue.registerDate, {
        validators: [Validators.required],
      }),
      customerType: new FormControl(customerRawValue.customerType, {
        validators: [Validators.required],
      }),
      firstName: new FormControl(customerRawValue.firstName, {
        validators: [Validators.required, Validators.maxLength(100)],
      }),
      lastName: new FormControl(customerRawValue.lastName, {
        validators: [Validators.maxLength(100)],
      }),
      primaryEmail: new FormControl(customerRawValue.primaryEmail, {
        validators: [Validators.required, Validators.maxLength(100)],
      }),
      primaryPhone: new FormControl(customerRawValue.primaryPhone, {
        validators: [Validators.maxLength(15)],
      }),
      status: new FormControl(customerRawValue.status, {
        validators: [Validators.required],
      }),
    });
  }

  getCustomer(form: CustomerFormGroup): ICustomer | NewCustomer {
    return form.getRawValue() as ICustomer | NewCustomer;
  }

  resetForm(form: CustomerFormGroup, customer: CustomerFormGroupInput): void {
    const customerRawValue = { ...this.getFormDefaults(), ...customer };
    form.reset(
      {
        ...customerRawValue,
        id: { value: customerRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): CustomerFormDefaults {
    return {
      id: null,
    };
  }
}
