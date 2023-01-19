// in src/users.js
import React, { FC } from 'react';
import { NumberField } from 'react-admin';
import {
  List,
  Datagrid,
  TextField,
  BooleanField,
  EmailField,
  EditButton,
} from 'react-admin';

export const ProgramList: FC = (props) => (
  <List {...props}>
    <Datagrid rowClick="edit">
      <TextField rce="title" />
      <TextField source="type" />
      <NumberField source="price" />
      <TextField source="description" />
      <EditButton />
    </Datagrid>
  </List>
);
