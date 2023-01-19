import React, { FC } from 'react';
import { NumberInput } from 'react-admin';
import {
  Create,
  SimpleForm,
  TextInput,
  PasswordInput,
  BooleanInput,
} from 'react-admin';

export const CourseCreate: FC = (props) => (
  <Create {...props}>
    <SimpleForm>
      <TextInput source="title" />
      <TextInput source="type" />
      <NumberInput source="price" />
      <TextInput source="description" />
    </SimpleForm>
  </Create>
);
