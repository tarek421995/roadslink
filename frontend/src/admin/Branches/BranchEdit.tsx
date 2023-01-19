// import React, { FC } from 'react';
// import { NumberInput } from 'react-admin';
// import {
//   Edit,
//   SimpleForm,
//   TextInput,
//   PasswordInput,
//   BooleanInput,
// } from 'react-admin';

// export const BranchEdit: FC = (props) => (
//   <Edit {...props}>
//     <SimpleForm>
//       <TextInput disabled source="id" />
//       <TextInput source="title" />
//       <NumberInput source="contact" />
//       <TextInput source="location" />
//       <TextInput source="type" />
//       <BooleanInput source="is_active" />
//     </SimpleForm>
//   </Edit>
// );


// import React, { FC } from 'react';
// import { NumberInput } from 'react-admin';
// import {
//   Edit,
//   SimpleForm,
//   TextInput,
//   PasswordInput,
//   BooleanInput,
// } from 'react-admin';

// export const BranchEdit: FC = (props) => (
//   <Edit {...props}>
//     <SimpleForm>
//       <TextInput disabled source="id" />
//       <TextInput source="title" />
//       <NumberInput source="contact" />
//       <TextInput source="location" />
//       <TextInput source="type" />
//       <BooleanInput source="is_active" />
//     </SimpleForm>
//   </Edit>
// );

// import React, { FC } from 'react';
// import { NumberInput } from 'react-admin';
// import {
//   Edit,
//   SimpleForm,
//   TextInput,
//   PasswordInput,
//   BooleanInput,
// } from 'react-admin';

// export const BranchEdit: FC = (props) => (
//   <Edit {...props}>
//     <SimpleForm>
//       <TextInput disabled source="id" />
//       <TextInput source="title" />
//       <NumberInput source="contact" />
//       <TextInput source="location" />
//       <TextInput source="type" />
//       <BooleanInput source="is_active" />
//     </SimpleForm>
//   </Edit>
// );


// import React, { FC } from 'react';
// import { NumberInput } from 'react-admin';
// import {
//   Edit,
//   SimpleForm,
//   TextInput,
//   PasswordInput,
//   BooleanInput,
// } from 'react-admin';

// export const BranchEdit: FC = (props) => (
//   <Edit {...props}>
//     <SimpleForm>
//       <TextInput disabled source="id" />
//       <TextInput source="title" />
//       <NumberInput source="contact" />
//       <TextInput source="location" />
//       <TextInput source="type" />
//       <BooleanInput source="is_active" />
//     </SimpleForm>
//   </Edit>
// );


import React, { FC, useEffect, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import { List, ListItem, ListItemText } from '@material-ui/core';
import { FormControl, Select, MenuItem, Button } from '@material-ui/core';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import Autocomplete from '@material-ui/lab/Autocomplete';
import DeleteIcon from '@material-ui/icons/Delete';
import TextField from '@material-ui/core/TextField';
import { Snackbar } from '@material-ui/core';

import axios from 'axios';
import {
  Edit,
  SimpleForm,
  TextInput,
  NumberInput,
  BooleanInput,
  SelectArrayInput,
  ReferenceArrayInput,
  useDataProvider
} from 'react-admin';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  form: {
    backgroundColor: '#f2f2f2',
    padding: '20px',
    margin: '5px',
    borderRadius: '5px',
    '& > *': {
      margin: '10px 0'
    }
  },
  textInput: {
    backgroundColor: 'white',
    padding: '10px',
    borderRadius: '5px',
    width: '100%'
  },
  fullWidth: {
    width: '100%'
  },
  select: {
    width: '100%',
    padding: '12px 20px',
    margin: '8px 0',
    display: 'inline-block',
    border: '1px solid #ccc',
    borderRadius: '4px',
    boxSizing: 'border-box',
    fontSize: '16px',
    backgroundColor: 'white',
  },
  button: {
    width: '100%',
    backgroundColor: '#4CAF50',
    color: 'white',
    padding: '14px 20px',
    margin: '8px 0',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '16px',
  },
});

interface Props {
  id: number;
}

export const BranchEdit: React.FC<Props> = (props) => {
  const [selectedCompanies, setSelectedCompanies] = useState<any[]>([]);
  const [availableCompanies, setAvailableCompanies] = useState<any[]>([]);
  const [selectedProgrames, setSelectedProgrames] = useState<any[]>([]);
  const [availableProgrames, setAvailableProgrames] = useState<any[]>([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchObjects = async () => {
      const token = localStorage.getItem('token')

      const apiUrlProgrames = `/api/v1/branches/programes-list/${props.id}`;
      const responseProgrames = await await fetch(apiUrlProgrames, {
        method: 'GET',
        headers: { 'Authorization': 'Bearer ' + token }
      });
      const dataProgrames = await responseProgrames.json();
      setSelectedProgrames(dataProgrames);

      const apiUrl2Programes = '/api/v1/programs';
      const response2Programes = await fetch(apiUrl2Programes);
      const data2Programes = await response2Programes.json();

      let availableProgrames = data2Programes.map((program: { id: any; }) => program.id)
      let selectedProgrames = dataProgrames.map((program: { id: any; }) => program.id)

      const uniqueProgramIds = availableProgrames.filter((item: any) => !selectedProgrames.includes(item));

      let filteredProgrames = data2Programes.filter(function (program: { id: any; }) {
        for (let i = 0; i < uniqueProgramIds.length; i++) {
          if (program.id === uniqueProgramIds[i]) {
            return true;
          }
        }
        return false;
      });
      // console.log('filteredProgrames', filteredProgrames)
      setAvailableProgrames(filteredProgrames);


      // Retrieve the current associated companies with the company
      const apiUrl = `/api/v1/branches/companies-list/${props.id}`;
      const response = await fetch(apiUrl, {
        method: 'GET',
        headers: { 'Authorization': 'Bearer ' + token }
      });
      const data = await response.json();
      console.log('data',data)
      setSelectedCompanies(data);

      // Retrieve the list of all available companies
      const apiUrl2 = '/api/v1/companies';
      const response2 = await fetch(apiUrl2, {
        method: 'GET',
        headers: { 'Authorization': 'Bearer ' + token }
      });
      const data2 = await response2.json();
      console.log(data2)
      let availableCompanies = data2.map((company: { id: any; }) => company.id)
      let selectedCompanies = data.map((company: { id: any; }) => company.id)
      const uniqueCompaniesIds = availableCompanies.filter((item: any) => !selectedCompanies.includes(item));
      let filteredCompanies = data2.filter(function (company: { id: any; }) {
        for (let i = 0; i < uniqueCompaniesIds.length; i++) {
          if (company.id === uniqueCompaniesIds[i]) {
            return true;
          }
        }
        return false;
      });
      setAvailableCompanies(filteredCompanies);
      console.log("avalible companies", availableCompanies)
    }
    fetchObjects();
  }, [props.id]);

  const handleCompaniesSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const apiUrl = `/api/v1/branches/companies/${props.id}`;
      const data = selectedCompanies.map(company => company.id);
      console.log('data', data)
      const token = localStorage.getItem('token')


      const response = await axios.post(apiUrl, data, {
        headers: {
          'Authorization': 'Bearer ' + token
        }
      })
      await setTimeout(() => {
        setMessage('Companies updated successfully!');
      }, 500);
      console.log(response.data);

      // setSuccess(true);
    } catch (error) {
      console.log('Error:', error);
      setTimeout(() => {
        setMessage('Companies Did not Added');
      }, 500);
      // setError(true);
    }
  };

  const handleBranchSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const apiUrl = `/api/v1/branches/programes/${props.id}`;
      const data1 = selectedProgrames.map(program => program.id);
      const token = localStorage.getItem('token')

      console.log(data1)
      const response = await axios.post(apiUrl, data, {
        headers: {
          'Authorization': 'Bearer ' + token
        }
      })
      console.log(response.data);
      await setTimeout(() => {
        setMessage('Programes updated successfully!');
      }, 500);
      console.log(response.data);

      // setSuccess(true);
    } catch (error) {
      console.log('Error:', error);
      setTimeout(() => {
        setMessage('Programes Did not Added');
      }, 500);
    }
  };

  const classes = useStyles();

  return (
    <Edit {...props}>
      <SimpleForm>
        <Snackbar open={!!message} message={message} onClose={() => setMessage('')} />
        <Grid className={classes.fullWidth} container spacing={3}>
          <Grid item xs={12} sm={12} md={12} lg={6}>
            <TextInput disabled source="id" />
            <TextInput source="title" className={classes.textInput} />
            <NumberInput source="contact" className={classes.textInput}  />
            <TextInput source="location" className={classes.textInput} />
            <TextInput source="type" className={classes.textInput}  />
            <BooleanInput source="is_active" className={classes.textInput} />
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={6}>
            <FormControl fullWidth className={classes.form}>
              <Autocomplete
                multiple
                getOptionSelected={(option, value) => option.name === value.name}
                options={availableCompanies}
                getOptionLabel={(company) => company.name}
                filterSelectedOptions
                value={selectedCompanies}
                onChange={(event, newValue) => {
                  setSelectedCompanies(newValue);
                  console.log("New Selected Companies: ", newValue);
                  let previousSelectedCompanies = [...selectedCompanies];
                  let deletedValues = previousSelectedCompanies.filter(company => !selectedCompanies.includes(newValue));
                  let uniqueCompanies = Array.from(new Set(availableCompanies.concat(deletedValues)));
                  setAvailableCompanies(uniqueCompanies);
                }}
                renderInput={(params) => (
                  <TextField {...params} variant="outlined" label="Select Companies" placeholder="Search Companies" />
                )}
              />
              <Button variant="outlined" color="primary" onClick={handleCompaniesSubmit}>Update Companies</Button>
            </FormControl>

            <FormControl fullWidth className={classes.form} >
              <Autocomplete
                multiple
                options={availableProgrames}
                getOptionLabel={(program) => program.title}
                filterSelectedOptions
                value={selectedProgrames}
                onChange={(event, newValue) => {
                  setSelectedProgrames(newValue);
                  console.log("New Selected Programes: ", newValue);
                  let previousSelectedBranches = [...selectedProgrames];
                  let deletedValues = previousSelectedBranches.filter(program => !selectedProgrames.includes(newValue));
                  let uniqueBranchs = Array.from(new Set(availableProgrames.concat(deletedValues)));
                  setAvailableProgrames(uniqueBranchs);
                }}
                renderInput={(params) => (
                  <TextField {...params} variant="outlined" label="Select Programes" placeholder="Search Programes" />
                )}
              />
              <Button variant="outlined" color="primary" onClick={handleBranchSubmit}>Update Branch</Button>
            </FormControl>
          </Grid>
        </Grid>
      </SimpleForm>
    </Edit>
  );
};

export default BranchEdit;    
