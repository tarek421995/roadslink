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

export const CompanyEdit: React.FC<Props> = (props) => {
  const [selectedUsers, setSelectedUsers] = useState<any[]>([]);
  const [availableUsers, setAvailableUsers] = useState<any[]>([]);
  const [selectedBranches, setSelectedBranches] = useState<any[]>([]);
  const [availableBranches, setAvailableBranches] = useState<any[]>([]);
  const [searchValue, setSearchValue] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchObjects = async () => {
      console.log(props.id)
      const apiUrlBranches = `/api/v1//branches/${props.id}/companies`;
      const token = localStorage.getItem('token')
      const responseBranches = await fetch(apiUrlBranches, {
        method: 'GET',
        headers: { 'Authorization': 'Bearer ' + token }
      });
      const dataBranches = await responseBranches.json();

      setSelectedBranches(dataBranches);

      const apiUrl2Branches = '/api/v1/branches';
      const response2Branches = await fetch(apiUrl2Branches, {
        method: 'GET',
        headers: { 'Authorization': 'Bearer ' + token }
      });
      const data2Branches = await response2Branches.json();

      let availableBranches = data2Branches.map((branch: { id: any; }) => branch.id)
      let selectedBranches = dataBranches.map((branch: { id: any; }) => branch.id)

      const uniqueBranchIds = availableBranches.filter((item: any) => !selectedBranches.includes(item));

      let filteredBranches = data2Branches.filter(function (branch: { id: any; }) {
        for (let i = 0; i < uniqueBranchIds.length; i++) {
          if (branch.id === uniqueBranchIds[i]) {
            return true;
          }
        }
        return false;
      });
      // console.log('filteredBranches', filteredBranches)
      setAvailableBranches(filteredBranches);


      // Retrieve the current associated users with the company
      const apiUrl = `/api/v1/companies/users-list/${props.id}`;
      const response = await fetch(apiUrl, {
        method: 'GET',
        headers: { 'Authorization': 'Bearer ' + token }
      });

      const data = await response.json();
      setSelectedUsers(data);

      // Retrieve the list of all available users
      const apiUrl2 = '/api/v1/users';
      const response2 = await fetch(apiUrl2, {
        method: 'GET',
        headers: { 'Authorization': 'Bearer ' + token }
      });
      const data2 = await response2.json();

      let availableUsers = data2.map((user: { id: any; }) => user.id)
      let selectedUsers = data.map((user: { id: any; }) => user.id)
      const uniqueUserIds = availableUsers.filter((item: any) => !selectedUsers.includes(item));
      let filteredUsers = data2.filter(function (user: { id: any; }) {
        for (let i = 0; i < uniqueUserIds.length; i++) {
          if (user.id === uniqueUserIds[i]) {
            return true;
          }
        }
        return false;
      });
      setAvailableUsers(filteredUsers);
      console.log("avalible users", availableUsers)
    }
    fetchObjects();
  }, [props.id]);

  const handleUserSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const token = localStorage.getItem('token')

      const apiUrl = `/api/v1/companies/users/${props.id}`;
      const data = selectedUsers.map(user => user.id);
      console.log('data', data)
      const response = await axios.post(apiUrl, data, {
        headers: {
          'Authorization': 'Bearer ' + token
        }
      })

      await setTimeout(() => {
        setMessage('Users updated successfully!');
      }, 500);
      console.log(response.data);

      // setSuccess(true);
    } catch (error) {
      console.log('Error:', error);
      setTimeout(() => {
        setMessage('Users Did not Added');
      }, 500);
      // setError(true);
    }
  };

  const handleBranchSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const token = localStorage.getItem('token')
      const apiUrl = `/api/v1/companies/branches/${props.id}`;
      const data1 = selectedBranches.map(branch => branch.id);
      console.log(data1)
      const response = await axios.post(apiUrl, data1, {
        headers: {
          'Authorization': 'Bearer ' + token
        }
      })
      console.log(response.data);
      await setTimeout(() => {
        setMessage('Branches updated successfully!');
      }, 500);
      console.log(response.data);

      // setSuccess(true);
    } catch (error) {
      console.log('Error:', error);
      setTimeout(() => {
        setMessage('Branches Did not Added');
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
            <TextInput disabled fullWidth source="id" className={classes.textInput} />
            <TextInput fullWidth source="name" className={classes.textInput} />
            <NumberInput fullWidth source="license_no" className={classes.textInput} />
            <TextInput fullWidth source="discription" className={classes.textInput} />
            <NumberInput fullWidth source="contact" className={classes.textInput} />
            <TextInput fullWidth source="location" className={classes.textInput} />
            <TextInput fullWidth source="type" className={classes.textInput} />
            <BooleanInput fullWidth source="is_active" className={classes.textInput} />
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={6}>
            <FormControl fullWidth className={classes.form}>
              <Autocomplete
                multiple
                getOptionSelected={(option, value) => option.email === value.email}
                options={availableUsers}
                getOptionLabel={(user) => user.email}
                filterSelectedOptions
                value={selectedUsers}
                onChange={(event, newValue) => {
                  setSelectedUsers(newValue);
                  console.log("New Selected Users: ", newValue);
                  let previousSelectedUsers = [...selectedUsers];
                  let deletedValues = previousSelectedUsers.filter(user => !selectedUsers.includes(newValue));
                  let uniqueUsers = Array.from(new Set(availableUsers.concat(deletedValues)));
                  setAvailableUsers(uniqueUsers);
                }}
                renderInput={(params) => (
                  <TextField {...params} variant="outlined" label="Select Users" placeholder="Search Users" />
                )}
              />
              <Button variant="outlined" color="primary" onClick={handleUserSubmit}>Update Users</Button>
            </FormControl>

            <FormControl fullWidth className={classes.form} >
              <Autocomplete
                multiple
                options={availableBranches}
                getOptionLabel={(branch) => branch.title}
                filterSelectedOptions
                value={selectedBranches}
                onChange={(event, newValue) => {
                  setSelectedBranches(newValue);
                  console.log("New Selected Branchs: ", newValue);
                  let previousSelectedBranchs = [...selectedBranches];
                  let deletedValues = previousSelectedBranchs.filter(branch => !selectedBranches.includes(newValue));
                  let uniqueBranchs = Array.from(new Set(availableBranches.concat(deletedValues)));
                  setAvailableBranches(uniqueBranchs);
                }}
                renderInput={(params) => (
                  <TextField {...params} variant="outlined" label="Select Branchs" placeholder="Search Branches" />
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

export default CompanyEdit;    
