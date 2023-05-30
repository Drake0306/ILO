/* eslint-disable no-unneeded-ternary */
/* eslint-disable no-unused-vars */
import * as Yup from 'yup';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { faker } from '@faker-js/faker';
// @mui
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography, Link, Stack, Button, Card, TextField, Checkbox, FormControlLabel, Divider  } from '@mui/material';
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

export default function EntryFormB(props) {

  const navigate = useNavigate()
  const params = useParams()
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [paramsData, setParamsData] = useState([]);
  const [fromData, setFromData] = useState({
    name: '',
    branch: '',
    contactPerson: '',
    address: '',
    std: '',
    phoneOne: '',
    phoneTwo: '',
    email: '',
    fax: '',
    website: '',
    id: '',
    status: true
  });

  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    // Update the document title using the browser API
    setParamsData(JSON.parse(localStorage.getItem('editValue')))
    if (params.data !== '0') {
      setFromData({ 
        name: typeof paramsData.name !== 'undefined' ? paramsData.name : '',
        branch: typeof paramsData.branch !== 'undefined' ? paramsData.branch : '',
        contactPerson: typeof paramsData.contactPerson !== 'undefined' ? paramsData.contactPerson : '',
        address: typeof paramsData.address !== 'undefined' ? paramsData.address : '',
        std: typeof paramsData.std !== 'undefined' ? paramsData.std : '',
        phoneOne: typeof paramsData.phoneOne !== 'undefined' ? paramsData.phoneOne : '',
        phoneTwo: typeof paramsData.phoneTwo !== 'undefined' ? paramsData.phoneTwo : '',
        email: typeof paramsData.email !== 'undefined' ? paramsData.email : '',
        fax: typeof paramsData.fax !== 'undefined' ? paramsData.fax : '',
        website: typeof paramsData.website !== 'undefined' ? paramsData.website : '',
        status: typeof paramsData.status !== 'undefined' ? paramsData.status : 'true',
        id: typeof paramsData.id !== 'undefined' ? paramsData.id : '',
      });
    }
  }, [params.data, 
      paramsData.name, 
      paramsData.branch, 
      paramsData.contactPerson, 
      paramsData.address, 
      paramsData.std, 
      paramsData.phoneOne, 
      paramsData.phoneTwo, 
      paramsData.email, 
      paramsData.fax, 
      paramsData.website, 
      paramsData.id,
      paramsData.status,
    ]);
  

    const onSubmit = async (event) => {
      event.preventDefault()
      setIsSubmitting(true);
      const fromElementsData = event.target.elements
      const sendPost = {
        name: fromElementsData.name.value,
        branch: fromElementsData.branch.value,
        contactPerson: fromElementsData.contactPerson.value,
        address: fromElementsData.address.value,
        std: fromElementsData.std.value,
        phoneOne: fromElementsData.phoneOne.value,
        phoneTwo: fromElementsData.phoneTwo.value,
        email: fromElementsData.email.value,
        fax: fromElementsData.fax.value,
        website: fromElementsData.website.value,
        status: fromElementsData.status.value,
        id: fromData.id,
      }
        
      if(params.data !== '0') {
        try {
          await axios.post(`${JSON_CONST.DB_URL}master/bank/update/${sendPost.id}`, sendPost)
            .then((response) => {
              console.log(response);
              setIsSubmitting(false);
              navigate(`/app/master/bank`, { replace: true });
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
            await axios.post(`${JSON_CONST.DB_URL}master/bank/create`, sendPost)
              .then((response) => {
                console.log(response);
                setIsSubmitting(false);
                navigate(`/app/master/bank`, { replace: true });
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
    <Page title="Bank">
      <Container maxWidth="xl">
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
          Bank
          </Typography>
          {/* <Button variant="contained" color="secondary" onClick={() => redirectPage('')} startIcon={<Iconify icon="carbon:list-boxes" />}>
            Home
          </Button> */}
        </Stack>
        {/* <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Button variant="outlined" color="info" onClick={() => redirectPage('bank')} startIcon={<Iconify icon="akar-icons:arrow-back" />}>
            View List
          </Button>
        </Stack> */}
        <form methods="post" onSubmit={onSubmit}>
        <Card>
          <Grid container alignItems="center" paddingLeft={10} paddingBottom={10} paddingRight={10} paddingTop={5} spacing={3}>
            <Grid mt={1} mb={1} item xs={12} sm={12} md={12} lg={12}>
              <Typography variant="overline" gutterBottom>
              Bank Details <Iconify icon="bi:arrow-down" />
              </Typography>
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4}>
              <TextField
                onChange={onChangeFields}
                fullWidth
                value={fromData.name}
                required
                name="name" 
                label="Bank Name"
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4}>
              <TextField
                onChange={onChangeFields}
                fullWidth
                value={fromData.branch}
                name="branch" 
                label="Branch Name"
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4}>
              <TextField
                onChange={onChangeFields}
                fullWidth
                value={fromData.contactPerson}
                name="contactPerson" 
                label="Contact Person"
              />
            </Grid>
            <Grid mt={0} mb={0} item xs={12} sm={12} md={12} lg={12}>
              <Typography variant="overline" gutterBottom>
              Address and Phone Detail <Iconify icon="bi:arrow-down" />
              </Typography>
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
            <Grid item xs={12} sm={12} md={4} lg={4}>
              <TextField
                onChange={onChangeFields}
                fullWidth
                value={fromData.std}
                name="std" 
                label="STD"
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4}>
              <TextField
                onChange={onChangeFields}
                fullWidth
                value={fromData.phoneOne}
                name="phoneOne" 
                label="Phone 1"
                type=""
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4}>
              <TextField
                onChange={onChangeFields}
                fullWidth
                value={fromData.phoneTwo}
                name="phoneTwo" 
                label="Phone 2"
                type=""
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4}>
              <TextField
                onChange={onChangeFields}
                fullWidth
                value={fromData.fax}
                name="fax" 
                label="Fax"
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4}>
              <TextField
                onChange={onChangeFields}
                fullWidth
                value={fromData.email}
                name="email" 
                label="Email"
                type=""
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4}>
              <TextField
                onChange={onChangeFields}
                fullWidth
                value={fromData.website}
                name="website" 
                label="Website"
                type=""
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
                * Address is required <br />
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
