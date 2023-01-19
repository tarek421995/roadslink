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

export const QuizList: FC = (props) => (
  <List {...props}>
    <Datagrid rowClick="edit">
      <TextField source="id" />
      <TextField source="title" />
      <TextField source="content" />
      <TextField source="type" />
      <TextField source="description" />
      <EditButton />
    </Datagrid>
  </List>
);
