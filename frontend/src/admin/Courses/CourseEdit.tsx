// import React, { FC } from 'react';
// import { NumberInput } from 'react-admin';
// import {
//   Edit,
//   SimpleForm,
//   TextInput,
//   PasswordInput,
//   BooleanInput,
// } from 'react-admin';

// export const CourseEdit: FC = (props) => (
//   <Edit {...props}>
//     <SimpleForm>
//       <TextInput disabled source="id" />
//       <TextInput source="title" />
//       <TextInput source="type" />
//       <NumberInput source="price" />
//       <TextInput source="description" />
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

export const CourseEdit: React.FC<Props> = (props) => {
  const [selectedPrograms, setSelectedPrograms] = useState<any[]>([]);
  const [availablePrograms, setAvailablePrograms] = useState<any[]>([]);
  const [selectedquizes, setSelectedquizes] = useState<any[]>([]);
  const [availablequizes, setAvailablequizes] = useState<any[]>([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchObjects = async () => {
      console.log(props.id)
      const apiUrlquizes = `/api/v1/courses/quizes-list/${props.id}`;
      const responsequizes = await fetch(apiUrlquizes);
      const dataquizes = await responsequizes.json();
      console.log('dataquizes',dataquizes)

      setSelectedquizes(dataquizes);

      const apiUrl2quizes = '/api/v1/quizes';
      const response2quizes = await fetch(apiUrl2quizes);
      const data2quizes = await response2quizes.json();
      console.log('data2quizes',data2quizes)

      let availablequizes = data2quizes.map((quiz: { id: any; }) => quiz.id)
      console.log('availablequizes',availablequizes)
      let selectedquizes = dataquizes.map((quiz: { id: any; }) => quiz.id)
      console.log(selectedquizes)
      
      const uniqueQuizzIds = availablequizes.filter((item: any) => !selectedquizes.includes(item));
      let filteredquizes = data2quizes.filter(function (quiz: { id: any; }) {
        for (let i = 0; i < uniqueQuizzIds.length; i++) {
          if (quiz.id === uniqueQuizzIds[i]) {
            return true;
          }
        }
        return false;
      });
      console.log('filteredquizes', filteredquizes)
      
      setAvailablequizes(filteredquizes);
      // Retrieve the current associated courses with the program
      const apiUrl = `/api/v1/courses/programs-list/${props.id}`;
      const response = await fetch(apiUrl);
      const data = await response.json();
      console.log('data',data)
      setSelectedPrograms(data);

      // Retrieve the list of all available courses
      const apiUrl2 = '/api/v1/programs';
      const response2 = await fetch(apiUrl2);
      const data2 = await response2.json();
      console.log(data2)
      let availablePrograms = data2.map((program: { id: any; }) => program.id)
      let selectedPrograms = data.map((program: { id: any; }) => program.id)
      const uniqueProgramsIds = availablePrograms.filter((item: any) => !selectedPrograms.includes(item));
      let filteredPrograms = data2.filter(function (program: { id: any; }) {
        for (let i = 0; i < uniqueProgramsIds.length; i++) {
          if (program.id === uniqueProgramsIds[i]) {
            return true;
          }
        }
        return false;
      });
      setAvailablePrograms(filteredPrograms);
      console.log("avalible programs", availablePrograms)
    }
    fetchObjects();
  }, [props.id]);

  const handleProgramsSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const apiUrl = `/api/v1/courses/${props.id}/programes/`;
      const data = selectedPrograms.map(program => program.id);
      console.log('data', data)
      const response = await axios.post(apiUrl, data);
      await setTimeout(() => {
        setMessage('Programs updated successfully!');
      }, 500);
      console.log(response.data);

      // setSuccess(true);
    } catch (error) {
      console.log('Error:', error);
      setTimeout(() => {
        setMessage('Programs Did not Added');
      }, 500);
      // setError(true);
    }
  };

  const handleQuizzSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const apiUrl = `/api/v1/courses/quizes/${props.id}`;
      const data1 = selectedquizes.map(quiz => quiz.id);
      console.log(data1)
      const response = await axios.post(apiUrl, data1);
      console.log(response.data);
      await setTimeout(() => {
        setMessage('quizes updated successfully!');
      }, 500);
      console.log(response.data);

      // setSuccess(true);
    } catch (error) {
      console.log('Error:', error);
      setTimeout(() => {
        setMessage('quizes Did not Added');
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
                options={availablePrograms}
                getOptionLabel={(program) => program.title}
                filterSelectedOptions
                value={selectedPrograms}
                onChange={(event, newValue) => {
                  setSelectedPrograms(newValue);
                  console.log("New Selected Programs: ", newValue);
                  let previousSelectedPrograms = [...selectedPrograms];
                  let deletedValues = previousSelectedPrograms.filter(program => !selectedPrograms.includes(newValue));
                  let uniquePrograms = Array.from(new Set(availablePrograms.concat(deletedValues)));
                  setAvailablePrograms(uniquePrograms);
                }}
                renderInput={(params) => (
                  <TextField {...params} variant="outlined" label="Select Programs" placeholder="Search Programs" />
                )}
              />
              <Button variant="outlined" color="primary" onClick={handleProgramsSubmit}>Update Programs</Button>
            </FormControl>
            <FormControl fullWidth className={classes.form} >
              <Autocomplete
                multiple
                getOptionSelected={(option, value) => option.title === value.title}
                options={availablequizes}
                getOptionLabel={(quiz) => quiz.title}
                filterSelectedOptions
                value={selectedquizes}
                onChange={(event, newValue) => {
                  setSelectedquizes(newValue);
                  console.log("New Selected quizes: ", newValue);
                  let previousSelectedquizes = [...selectedquizes];
                  let deletedValues = previousSelectedquizes.filter(quiz => !selectedquizes.includes(newValue));
                  let uniquequizes = Array.from(new Set(availablequizes.concat(deletedValues)));
                  setAvailablequizes(uniquequizes);
                }}
                renderInput={(params) => (
                  <TextField {...params} variant="outlined" label="Select quizes" placeholder="Search quizes" />
                )}
              />
              <Button variant="outlined" color="primary" onClick={handleQuizzSubmit}>Update Course</Button>
            </FormControl>
          </Grid>
        </Grid>
      </SimpleForm>
    </Edit>
  );
};

export default CourseEdit;    
