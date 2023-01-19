import React, { FC } from 'react';
import { NumberInput } from 'react-admin';
import {
  Edit,
  SimpleForm,
  TextInput,
  PasswordInput,
  BooleanInput,
} from 'react-admin';

export const QuizEdit: FC = (props) => (
  <Edit {...props}>
    <SimpleForm>
    <TextInput disabled source="id" />
    <TextInput source="title" />
      <TextInput source="type" />
      <TextInput source="contnet" />
      <TextInput source="description" />
    </SimpleForm>
  </Edit>
);
