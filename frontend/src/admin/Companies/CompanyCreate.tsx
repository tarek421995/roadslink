import React, { FC } from 'react';
import {
  Create,
  SimpleForm,
  TextInput,
  BooleanInput,
  NumberInput,
} from 'react-admin';

export const CompanyCreate: FC = (props) => (
  <Create {...props}>
    <SimpleForm>
      <TextInput source="name" />
      <NumberInput source="license_no" />
      <TextInput source="discription" />
      <NumberInput source="contact" />
      <TextInput source="location" />
      <TextInput source="type" />
      <BooleanInput source="is_active" />
    </SimpleForm>
  </Create>
);
