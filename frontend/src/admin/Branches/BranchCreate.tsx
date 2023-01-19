import React, { FC } from 'react';
import { NumberInput } from 'react-admin';
import {
  Create,
  SimpleForm,
  TextInput,
  PasswordInput,
  BooleanInput,
} from 'react-admin';

export const BranchCreate: FC = (props) => (
  <Create {...props}>
    <SimpleForm>
      <TextInput source="title" />
      <NumberInput source="contact" />
      <TextInput source="location" />
      <TextInput source="type" />
      <BooleanInput source="is_active" />
    </SimpleForm>
  </Create>
);

