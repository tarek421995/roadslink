import React, { FC } from 'react';
import { fetchUtils, Admin as ReactAdmin, Resource } from 'react-admin';
import simpleRestProvider from 'ra-data-simple-rest';
import authProvider from './authProvider';

import { UserList, UserEdit, UserCreate } from './Users';

import { CompanyList, CompanyEdit, CompanyCreate } from './Companies';
import { BranchList, BranchEdit, BranchCreate } from './Branches';
import { ProgramList, ProgramEdit, ProgramCreate } from './Programs';
import { CourseList, CourseEdit, CourseCreate } from './Courses';
import { QuizList, QuizEdit, QuizCreate } from './Quizes';

const httpClient = (url: any, options: any) => {
  if (!options) {
    options = {};
  }
  if (!options.headers) {
    options.headers = new Headers({ Accept: 'application/json' });
  }
  const token = localStorage.getItem('token');
  options.headers.set('Authorization', `Bearer ${token}`);
  console.log(url)
  return fetchUtils.fetchJson(url, options);
};
console.log(httpClient)
const dataProvider = simpleRestProvider('api/v1', httpClient);
const token = localStorage.getItem('token')

export const Admin: FC = () => {
  return (
    <ReactAdmin dataProvider={dataProvider} token={token} authProvider={authProvider}>
      {(permissions: 'admin' | 'user') => [
        permissions === 'admin' && [
          <Resource
            name="users"
            list={UserList}
            edit={UserEdit}
            create={UserCreate}
          />,
          <Resource
            name="companies"
            list={CompanyList}
            edit={CompanyEdit}
            create={CompanyCreate}
            // show={CompanyShow}
          />,
          <Resource
            name="branches"
            list={BranchList}
            edit={BranchEdit}
            create={BranchCreate}
            // show={CompanyShow}
          />,
          <Resource
            name="programs"
            list={ProgramList}
            edit={ProgramEdit}
            create={ProgramCreate}
            // show={CompanyShow}
          />,
          <Resource
          name="courses"
          list={CourseList}
          edit={CourseEdit}
          create={CourseCreate}
          // show={CompanyShow}
          />,
          <Resource
          name="quizes"
          list={QuizList}
          edit={QuizEdit}
          create={QuizCreate}
          // show={CompanyShow}
          />
        ]
      ]}
    </ReactAdmin>
  );
};
