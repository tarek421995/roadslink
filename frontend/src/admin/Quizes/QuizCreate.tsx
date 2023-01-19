import React, { FC } from 'react';
import {
  Create,
  SimpleForm,
  TextInput,
  PasswordInput,
  BooleanInput,
} from 'react-admin';

export const QuizCreate: FC = (props) => (
  <Create {...props}>
    <SimpleForm>
      <TextInput source="title" />
      <TextInput source="type" />
      <TextInput source="contnet" />
      <TextInput source="description" />
    </SimpleForm>
  </Create>
);
