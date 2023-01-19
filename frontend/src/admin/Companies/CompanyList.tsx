// in src/users.js
import React, { FC } from 'react';
import {
  List,
  Datagrid,
  TextField,
  BooleanField,
  EditButton,
} from 'react-admin';

export const CompanyList: FC = (props) => (
  <List {...props}>
    <Datagrid rowClick="edit">
      <TextField source="id" />
      <TextField source="name" />
      <TextField source="contact" />
      <TextField source="location" />
      <TextField source="type" />
      <BooleanField source="is_active" />
      <EditButton />
    </Datagrid>
  </List>
);
