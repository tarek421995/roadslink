import React, { FC } from 'react';
import {
  Create,
  SimpleForm,
  TextInput,
  NumberInput,
} from 'react-admin';

export const ProgramCreate: FC = (props) => (
  <Create {...props}>
    <SimpleForm>
      <TextInput source="title" />
      <TextInput source="type" />
      <NumberInput source="price" />
      <TextInput source="description" />
    </SimpleForm>
  </Create>
);
