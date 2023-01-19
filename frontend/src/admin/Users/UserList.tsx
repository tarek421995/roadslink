// in src/users.js
import React, { FC } from 'react';
import {
  List,
  Datagrid,
  TextField,
  BooleanField,
  EmailField,
  EditButton,
} from 'react-admin';

export const UserList: FC = (props) => (
  <List {...props}>
    <Datagrid rowClick="edit">
      <TextField source="id" />
      <EmailField source="email" />
      <TextField source="full_name" />
      <TextField source="nationality" />
      <TextField source="contact" />
      <BooleanField source="is_active" />
      <BooleanField source="is_superuser" />
      <EditButton />
    </Datagrid>
  </List>
);
