/* eslint-disable no-unneeded-ternary */
/* eslint-disable no-unused-vars */
import * as Yup from 'yup';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { faker } from '@faker-js/faker';
// @mui
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography, Link, Stack, Button, Card, TextField, Checkbox, FormControlLabel, Autocomplete, InputLabel, MenuItem, FormControl  } from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select';

// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { LoadingButton } from '@mui/lab';
import axios from 'axios';


// components
import { FormProvider, RHFTextField, RHFCheckbox } from '../../../components/hook-form';
import Page from '../../../components/Page';
import Iconify from '../../../components/Iconify';
import JSON_CONST from '../../../components/CONSTVALUE.json'; 

// ----------------------------------------------------------------------

export default function EntryFormFEE(props) {

  const navigate = useNavigate()
  const params = useParams()
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [paramsData, setParamsData] = useState([]);
  const [fromData, setFromData] = useState({
    name: [],
    particulars: [
      {id: 1, label: 'Legal Report'},
      {id: 2, label: 'Vetting Report'},
      {id: 3, label: 'TSR Report'},
      {id: 4, label: 'Opinion'},
      {id: 5, label: 'OVD'},
      {id: 6, label: 'Project'},
      {id: 7, label: 'Certified Copy'},
      {id: 8, label: 'Disturbed'},
      {id: 9, label: 'ROC Search'},
      {id: 10, label: 'Bulder Payment'},
      {id: 11, label: 'Others'},
    ],
    FeeinRs: '',
    id: '',
    status: true
  });

  const [fromDataAutoFill, setFromDataAutoFill] = useState({
    bankList: [],
    branchList: [],
    userList: [],
    dsaList: [],
    regOffList: [],
    handlledByList: [],
    remarksList: [],
  });

  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    // Update the document title using the browser API
    setParamsData(JSON.parse(localStorage.getItem('editValue')))
    if (params.data !== '0') {
      setFromData({ 
        name: typeof paramsData.name !== 'undefined' ? paramsData.name : [],
        particulars: typeof paramsData.particulars !== 'undefined' ? paramsData.particulars : [],
        FeeinRs: typeof paramsData.FeeinRs !== 'undefined' ? paramsData.FeeinRs : '',
        status: paramsData.status === 'true' ? true : false,
        id: typeof paramsData.id !== 'undefined' ? paramsData.id : '',
      });
    }

    // ------------------------------ Load data from database------------------------------ //
    api();
  }, [params.data, 
      paramsData.name, 
      paramsData.particulars, 
      paramsData.FeeinRs, 
      paramsData.id,
      paramsData.status,
    ]);

    const api = async () => {
      let bankList = []
      let branchList = []
      let userList = []
      let dsaList = []
      let regOffList = []
      let handlledByList = []
      let remarksList = []
  
      await axios.get(`${JSON_CONST.DB_URL}master/bank/list`)
        .then((response) => {
          bankList = arrageList(response);
        })
  
      await axios.get(`${JSON_CONST.DB_URL}master/branch/list`)
        .then((response) => {
          branchList = arrageList(response);
        })
      
      await axios.get(`${JSON_CONST.DB_URL}auth/userList`)
        .then((response) => {
          console.log(response)
          userList = arrageList(response);
        })
      
      await axios.get(`${JSON_CONST.DB_URL}master/DSA/list`)
        .then((response) => {
          dsaList = arrageList(response);
        })
      
      await axios.get(`${JSON_CONST.DB_URL}master/registrarOffice/list`)
        .then((response) => {
          regOffList = arrageList(response);
        })
      
      await axios.get(`${JSON_CONST.DB_URL}master/handledBy/list`)
        .then((response) => {
          handlledByList = arrageList(response);
        })
      
      await axios.get(`${JSON_CONST.DB_URL}master/differentRemarks/list`)
        .then((response) => {
          remarksList = arrageList(response);
        })
      
      setFromDataAutoFill({
        bankList,
        branchList,
        userList,
        dsaList,
        regOffList,
        handlledByList,
        remarksList,
      })
    }
  
    const arrageList = (response) => {
      const list = []
      response.data.forEach((row) => {
        if(row.status === 'true') {
          list.push(row)
        }
      })
  
      return list
    }
  

    const onSubmit = async (event) => {
      event.preventDefault()
      setIsSubmitting(true);
      const fromElementsData = event.target.elements
      const sendPost = {
        name: fromElementsData.name.value,
        particulars: fromElementsData.particulars.value,
        FeeinRs: fromElementsData.FeeinRs.value,
        status: fromElementsData.status.value,
        id: fromData.id,
      }
        
      if(params.data !== '0') {
        try {
          await axios.post(`${JSON_CONST.DB_URL}master/fee/update/${sendPost.id}`, sendPost)
            .then((response) => {
              console.log(response);
              setIsSubmitting(false);
              navigate(`/app/master/fee`, { replace: true });
            })
            .catch((error) => {
              setIsSubmitting(false);
              console.log(error);
            });
        }
        catch (err) {
          console.log(err)
        }
      } else {
          try {
            await axios.post(`${JSON_CONST.DB_URL}master/fee/create`, sendPost)
              .then((response) => {
                console.log(response);
                setIsSubmitting(false);
                navigate(`/app/master/fee`, { replace: true });
              })
              .catch((error) => {
                setIsSubmitting(false);
                console.log(error);
              });
          }
          catch (err) {
            console.log(err)
          }
        };
      }
  
  const onChangeFields = async (event) => {
    if(event.target.name === 'status') {
      setFromData({
        ...fromData,
        [event.target.name]: !fromData.status
      });
    } else {
      setFromData({
        ...fromData,
        [event.target.name]: event.target.value
      });
    }
  };
  
  const redirectPage = async (url) => {
    navigate(`/app/master/${url}`, { replace: true });
  };

  return (
    <Page title="Fee">
      <Container maxWidth="xl">
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
          Fee
          </Typography>
          {/* <Button variant="contained" color="secondary" onClick={() => redirectPage('')} startIcon={<Iconify icon="carbon:list-boxes" />}>
            Home
          </Button> */}
        </Stack>
        {/* <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Button variant="outlined" color="info" onClick={() => redirectPage('fee')} startIcon={<Iconify icon="akar-icons:arrow-back" />}>
            View List
          </Button>
        </Stack> */}
        <form methods="post" onSubmit={onSubmit}>
        <Card>
          <Grid container alignItems="center" paddingLeft={10} paddingBottom={10} paddingRight={10} paddingTop={5} spacing={3}>
            <Grid mt={2} mb={2} item xs={12} sm={12} md={12} lg={12}>
              <Typography variant="overline" gutterBottom>
              Fee Details <Iconify icon="bi:arrow-down" />
              </Typography>
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4}>
              <FormControl fullWidth>
                <InputLabel id="name-select-label">Bank</InputLabel>
                <Select
                  labelId="name-select-label"
                  id="name-select"
                  value={fromData.name}
                  label="name"
                  name="name"  
                  fullWidth
                  onChange={onChangeFields}
                >
                  {fromDataAutoFill.bankList.map((option) => (<MenuItem key={option.id} value={option.id}>{option.name}</MenuItem>))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4}>
              <FormControl fullWidth>
                <InputLabel id="particulars-select-label">Particulars</InputLabel>
                <Select
                  labelId="particulars-select-label"
                  id="particulars-select"
                  value={fromData.particulars}
                  label="particulars"
                  name="particulars"  
                  fullWidth
                  onChange={onChangeFields}
                >
                  <MenuItem value='Leagal Report'>Leagal Report</MenuItem>
                  <MenuItem value='Vetting Report'>Vetting Report</MenuItem>
                  <MenuItem value='TSR'>TSR</MenuItem>
                  <MenuItem value='Opinion'>Opinion</MenuItem>
                  <MenuItem value='ODV'>ODV</MenuItem>
                  <MenuItem value='Project'>Project</MenuItem>
                  <MenuItem value='Certified Copy'>Certified Copy</MenuItem>
                  <MenuItem value='ROC Search'>ROC Search</MenuItem>
                  <MenuItem value='Others'>Others</MenuItem>
                </Select>
              </FormControl>
              {/* <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={fromData.particulars}
                sx={{ width: 300 }}
                renderInput={(params) => <TextField required name='particulars' onChange={onChangeFields} value={fromData.particulars} {...params} label="Select Particulars" />}
              /> */}
            </Grid> 
            <Grid item xs={12} sm={12} md={4} lg={4}>
              <TextField
                onChange={onChangeFields}
                fullWidth
                value={fromData.FeeinRs}
                name="FeeinRs" 
                label="Fee in Rs"
                required
              />
            </Grid>


            <Grid item xs={12} sm={1} md={1} lg={1}>
              <LoadingButton fullWidth size="large" type="submit" variant="outlined" color="info" loading={isSubmitting}>
                Save
              </LoadingButton>
            </Grid>
            
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    name="status"
                    checked={fromData.status}
                    value={fromData.status}
                    onChange={onChangeFields}
                  />
                }
                label="Status"
              />
            </Grid>

            <Grid mt={2} item xs={12} sm={12} md={12} lg={12}>
              <Typography variant="caption" gutterBottom>
                * Bank Name is required <br />
                * Select Branch is required <br />
                * Only Text - numbers are not allowed in required fields<br />
                * To go back to page click on view list<br />
              </Typography>
            </Grid>

          </Grid>
        </Card>
        </form>
      </Container>
    </Page>
  );
}
