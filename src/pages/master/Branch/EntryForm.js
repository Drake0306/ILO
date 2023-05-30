/* eslint-disable no-unneeded-ternary */
/* eslint-disable no-unused-vars */
import * as Yup from 'yup';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { faker } from '@faker-js/faker';
// @mui
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography, Link, Stack, Button, Card, TextField, Checkbox, FormControlLabel, Autocomplete,InputLabel, MenuItem, FormControl  } from '@mui/material';
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

export default function EntryFormBR(props) {

  const navigate = useNavigate()
  const params = useParams()
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [paramsData, setParamsData] = useState([]);
  const [fromData, setFromData] = useState({
    name: '',
    address: '',
    bankName: [],
    path: '',
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
    if (params.data !== '0') {
      setFromData({ 
        name: typeof paramsData.name !== 'undefined' ? paramsData?.name : '',
        bankName: typeof paramsData.bankName !== 'undefined' ? paramsData?.bankName?.id : [],
        address: typeof paramsData.address !== 'undefined' ? paramsData?.address : '',
        path: typeof paramsData.path !== 'undefined' ? paramsData?.path : '',
        status: typeof paramsData.status !== 'undefined' ? paramsData?.status : 'true',
        id: typeof paramsData.id !== 'undefined' ? paramsData?.id : '',
      });
    }

    // ------------------------------ Load data from database------------------------------ //
  }, [params.data, 
      paramsData.name, 
      paramsData.bankName, 
      paramsData.address, 
      paramsData.path, 
      paramsData.id,
      paramsData.status,
    ]);

    useEffect(() => {
      setParamsData(JSON.parse(localStorage.getItem('editValue')))

      const arrageList = (response) => {
        const list = []
        response.data.forEach((row) => {
          if(row.status === 'true') {
            list.push(row)
          }
        })
    
        return list
      }

      const api = async () => {
        let bankList = []
        const branchList = []
        const userList = []
        const dsaList = []
        const regOffList = []
        const handlledByList = []
        const remarksList = []
    
        await axios.get(`${JSON_CONST.DB_URL}master/bank/list`)
          .then((response) => {
            bankList = arrageList(response);
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

      api()
    },[])
  

    const onSubmit = async (event) => {
      event.preventDefault()
      setIsSubmitting(true);
      const fromElementsData = event.target.elements
      const sendPost = {
        name: fromElementsData.name.value,
        bankName: fromElementsData.bankName.value,
        address: fromElementsData.address.value,
        path: fromElementsData.path.value,
        status: fromElementsData.status.value,
        id: fromData.id,
      }
        
      if(params.data !== '0') {
        try {
          await axios.post(`${JSON_CONST.DB_URL}master/branch/update/${sendPost.id}`, sendPost)
            .then((response) => {
              console.log(response);
              setIsSubmitting(false);
              navigate(`/app/master/branch`, { replace: true });
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
            await axios.post(`${JSON_CONST.DB_URL}master/branch/create`, sendPost)
              .then((response) => {
                console.log(response);
                setIsSubmitting(false);
                navigate(`/app/master/branch`, { replace: true });
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
    <Page title="Branch">
      <Container maxWidth="xl">
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
          Branch
          </Typography>
          {/* <Button variant="contained" color="secondary" onClick={() => redirectPage('')} startIcon={<Iconify icon="carbon:list-boxes" />}>
            Home
          </Button> */}
        </Stack>
        {/* <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Button variant="outlined" color="info" onClick={() => redirectPage('branch')} startIcon={<Iconify icon="akar-icons:arrow-back" />}>
            View List
          </Button>
        </Stack> */}
        <form methods="post" onSubmit={onSubmit}>
        <Card>
          <Grid container alignItems="center" paddingLeft={10} paddingBottom={10} paddingRight={10} paddingTop={5} spacing={3}>
            <Grid mt={1} mb={1} item xs={12} sm={12} md={12} lg={12}>
              <Typography variant="overline" gutterBottom>
              Branch Details <Iconify icon="bi:arrow-down" />
              </Typography>
            </Grid>
            <Grid item xs={12} sm={12} md={3} lg={3}>
              <FormControl fullWidth>
                <InputLabel id="bankName-select-label">Bank</InputLabel>
                <Select
                  labelId="bankName-select-label"
                  id="bankName-select"
                  value={fromData.bankName}
                  label="bankName"
                  name="bankName"  
                  fullWidth
                  onChange={onChangeFields}
                  autoFocus
                >
                  {fromDataAutoFill.bankList.map((option) => (<MenuItem key={option.id} value={option.id}>{option.name}</MenuItem>))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={12} md={5} lg={5}>
              <TextField
                onChange={onChangeFields}
                fullWidth
                value={fromData.name}
                name="name" 
                label="Branch Name"
                required
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4}>
              <TextField
                onChange={onChangeFields}
                fullWidth
                value={fromData.path}
                name="path" 
                label="Path"
              />
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <TextField
                onChange={onChangeFields}
                fullWidth
                value={fromData.address}
                name="address" 
                label="Address"
                multiline
                rows={2}
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
