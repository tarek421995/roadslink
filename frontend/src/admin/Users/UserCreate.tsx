// import React, { FC } from 'react';
// import {
//   Create,
//   SimpleForm,
//   TextInput,
//   PasswordInput,
//   BooleanInput,
// } from 'react-admin';

// export const UserCreate: FC = (props) => (

//   const classes = useStyles();

//   <Create {...props}>
//     <SimpleForm>
//       <TextInput disabled source="id" className={classes.textInput} />
//       <TextInput fullWidth source="email" className={classes.textInput} />
//       <TextInput fullWidth source="full_name" className={classes.textInput} />
//       <TextInput fullWidth source="age" className={classes.textInput} />
//       <TextInput fullWidth source="contact" className={classes.textInput} />
//       <TextInput fullWidth source="gender" className={classes.textInput} />
//       <TextInput fullWidth source="nationality" className={classes.textInput} />
//       <TextInput fullWidth source="role" className={classes.textInput} />
//       <BooleanInput fullWidth source="is_active" className={classes.textInput} />
//       <BooleanInput fullWidth source="is_superuser" className={classes.textInput} />
//     </SimpleForm>
//   </Create>
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
  Create,
  SimpleForm,
  TextInput,
  PasswordInput,
  BooleanInput,
  NumberInput

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

export const UserCreate: React.FC<Props> = (props) => {
  const [selectedCompanies, setSelectedCompanies] = useState<any[]>([]);
  const [availableCompanies, setAvailableCompanies] = useState<any[]>([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchObjects = async () => {
      let data = []
      if (props.id){
        console.log(props.id)


      // Retrieve the current associated companys with the company
      const apiUrl = `/api/v1/users/companies/${props.id}`;
      const response = await fetch(apiUrl);
      data = await response.json();
      setSelectedCompanies(data);
      }
      

      // Retrieve the list of all available companys
      const apiUrl2 = '/api/v1/companies';
      const response2 = await fetch(apiUrl2);
      const data2 = await response2.json();
      console.log(data2)
      let availableCompanies = data2.map((company: { id: any; }) => company.id)
      console.log(availableCompanies)
      if (data){
        let selectedCompanies = data.map((company: { id: any; }) => company.id)
        const uniqueCompanyIds = availableCompanies.filter((item: any) => !selectedCompanies.includes(item));
        let filteredCompanies = data2.filter(function (company: { id: any; }) {
          for (let i = 0; i < uniqueCompanyIds.length; i++) {
            if (company.id === uniqueCompanyIds[i]) {
              return true;
            }
          }
          return false;
        });
        setAvailableCompanies(filteredCompanies);

      }else{
        setAvailableCompanies(availableCompanies);

      }
      console.log("avalible companys", availableCompanies)
    }
    fetchObjects();
  }, [props.id]);

  const handleCompanySubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const apiUrl = `/api/v1/users/companies/${props.id}`;
      const data = selectedCompanies.map(company => company.id);
      console.log('data', data)
      const response = await axios.post(apiUrl, data);
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

  const classes = useStyles();

  return (
    <Create {...props}>
      <SimpleForm>
        <Snackbar open={!!message} message={message} onClose={() => setMessage('')} />
        <Grid className={classes.fullWidth} container spacing={3}>
          <Grid item xs={12} sm={12} md={12} lg={6}>
            <TextInput disabled source="id" className={classes.textInput} />
            <TextInput fullWidth source="email" className={classes.textInput} />
            <TextInput fullWidth source="full_name" className={classes.textInput} />
            <NumberInput fullWidth source="age" className={classes.textInput} />
            <NumberInput fullWidth source="contact" className={classes.textInput} />
            <TextInput fullWidth source="gender" className={classes.textInput} />
            <TextInput fullWidth source="nationality" className={classes.textInput} />
            <TextInput fullWidth source="role" className={classes.textInput} />
            <PasswordInput fullWidth source="password" className={classes.textInput} />
            <BooleanInput fullWidth source="is_active" className={classes.textInput} />
            <BooleanInput fullWidth source="is_superuser" className={classes.textInput} />
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
              <Button variant="outlined" color="primary" onClick={handleCompanySubmit}>Update Companies</Button>
            </FormControl>
          </Grid>
        </Grid>
      </SimpleForm>
    </Create>
  );
};

export default UserCreate;    
