import React, { FC, useEffect, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import { FormControl, Select, MenuItem, Button } from '@material-ui/core';

import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import { Snackbar } from '@material-ui/core';

import axios from 'axios';
import {
  Edit,
  SimpleForm,
  TextInput,
  NumberInput,
  BooleanInput,
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

export const ProgramEdit: React.FC<Props> = (props) => {
  const [selectedBranches, setSelectedBranches] = useState<any[]>([]);
  const [availableBranches, setAvailableBranches] = useState<any[]>([]);
  const [selectedCourses, setSelectedCourses] = useState<any[]>([]);
  const [availableCourses, setAvailableCourses] = useState<any[]>([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchObjects = async () => {
      console.log(props.id)
      const apiUrlCourses = `/api/v1/programs/courses-list/${props.id}`;
      console.log(apiUrlCourses)
      const responseCourses = await fetch(apiUrlCourses);
      const dataCourses = await responseCourses.json();
      setSelectedCourses(dataCourses);

      const apiUrl2Courses = '/api/v1/courses';
      const response2Courses = await fetch(apiUrl2Courses);
      const data2Courses = await response2Courses.json();

      let availableCourses = data2Courses.map((course: { id: any; }) => course.id)
      let selectedCourses = dataCourses.map((course: { id: any; }) => course.id)

      const uniqueCourseIds = availableCourses.filter((item: any) => !selectedCourses.includes(item));

      let filteredCourses = data2Courses.filter(function (course: { id: any; }) {
        for (let i = 0; i < uniqueCourseIds.length; i++) {
          if (course.id === uniqueCourseIds[i]) {
            return true;
          }
        }
        return false;
      });
      // console.log('filteredCourses', filteredCourses)
      setAvailableCourses(filteredCourses);


      // Retrieve the current associated programs with the branch
      const apiUrl = `/api/v1/programs/branches-list/${props.id}`;
      const response = await fetch(apiUrl);
      const data = await response.json();
      console.log('data',data)
      setSelectedBranches(data);

      // Retrieve the list of all available programs
      const apiUrl2 = '/api/v1/branches';
      const response2 = await fetch(apiUrl2);
      const data2 = await response2.json();
      console.log(data2)
      let availableBranches = data2.map((branch: { id: any; }) => branch.id)
      let selectedBranches = data.map((branch: { id: any; }) => branch.id)
      const uniqueBranchesIds = availableBranches.filter((item: any) => !selectedBranches.includes(item));
      let filteredBranches = data2.filter(function (branch: { id: any; }) {
        for (let i = 0; i < uniqueBranchesIds.length; i++) {
          if (branch.id === uniqueBranchesIds[i]) {
            return true;
          }
        }
        return false;
      });
      setAvailableBranches(filteredBranches);
      console.log("avalible branches", availableBranches)
    }
    fetchObjects();
  }, [props.id]);

  const handleBranchesSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const apiUrl = `/api/v1/programs/branches/${props.id}`;
      const data = selectedBranches.map(branch => branch.id);
      console.log('data', data)
      const response = await axios.post(apiUrl, data);
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
      // setError(true);
    }
  };

  const handleCourseSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const apiUrl = `/api/v1/programs/courses/${props.id}`;
      const data1 = selectedCourses.map(course => course.id);
      console.log(data1)
      const response = await axios.post(apiUrl, data1);
      console.log(response.data);
      await setTimeout(() => {
        setMessage('Courses updated successfully!');
      }, 500);
      console.log(response.data);

      // setSuccess(true);
    } catch (error) {
      console.log('Error:', error);
      setTimeout(() => {
        setMessage('Courses Did not Added');
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
            <NumberInput disabled source="id" className={classes.textInput} />
            <TextInput source="title" className={classes.textInput} />
            <NumberInput source="price" className={classes.textInput}  />
            <TextInput source="location" className={classes.textInput} />
            <TextInput source="type" className={classes.textInput}  />
            <BooleanInput source="is_active" className={classes.textInput} />
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={6}>
            <FormControl fullWidth className={classes.form}>
              <Autocomplete
                multiple
                getOptionSelected={(option, value) => option.title === value.title}
                options={availableBranches}
                getOptionLabel={(branch) => branch.title}
                filterSelectedOptions
                value={selectedBranches}
                onChange={(event, newValue) => {
                  setSelectedBranches(newValue);
                  console.log("New Selected Branches: ", newValue);
                  let previousSelectedBranches = [...selectedBranches];
                  let deletedValues = previousSelectedBranches.filter(branch => !selectedBranches.includes(newValue));
                  let uniqueBranches = Array.from(new Set(availableBranches.concat(deletedValues)));
                  setAvailableBranches(uniqueBranches);
                }}
                renderInput={(params) => (
                  <TextField {...params} variant="outlined" label="Select Branches" placeholder="Search Branches" />
                )}
              />
              <Button variant="outlined" color="primary" onClick={handleBranchesSubmit}>Update Branches</Button>
            </FormControl>
            <FormControl fullWidth className={classes.form} >
              <Autocomplete
                multiple
                options={availableCourses}
                getOptionLabel={(course) => course.title}
                filterSelectedOptions
                value={selectedCourses}
                onChange={(event, newValue) => {
                  setSelectedCourses(newValue);
                  console.log("New Selected Courses: ", newValue);
                  let previousSelectedCourses = [...selectedCourses];
                  let deletedValues = previousSelectedCourses.filter(course => !selectedCourses.includes(newValue));
                  let uniqueCourses = Array.from(new Set(availableCourses.concat(deletedValues)));
                  setAvailableCourses(uniqueCourses);
                }}
                renderInput={(params) => (
                  <TextField {...params} variant="outlined" label="Select Courses" placeholder="Search Courses" />
                )}
              />
              <Button variant="outlined" color="primary" onClick={handleCourseSubmit}>Update Program</Button>
            </FormControl>
          </Grid>
        </Grid>
      </SimpleForm>
    </Edit>
  );
};

export default ProgramEdit;    
