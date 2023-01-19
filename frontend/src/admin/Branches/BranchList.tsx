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

export const BranchList: FC = (props) => (
  <List {...props}>
    <Datagrid rowClick="edit">
      <TextField source="title" />
      <TextField source="contact" />
      <TextField source="location" />
      <TextField source="type" />
      <BooleanField source="is_active" />
      <EditButton />
    </Datagrid>
  </List>
);
