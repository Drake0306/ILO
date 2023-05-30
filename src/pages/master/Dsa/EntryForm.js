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

export default function EntryFormDSA(props) {

  const navigate = useNavigate()
  const params = useParams()
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [paramsData, setParamsData] = useState([]);
  const [fromData, setFromData] = useState({
    name: '',
    del: [],
    delValue: '',
    address: '',
    phone: '',
    id: '',
    status: true
  });

  const [fromDataAutoFill, setFromDataAutoFill] = useState({
    delList: [],
  });

  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    // Update the document title using the browser API
    setParamsData(JSON.parse(localStorage.getItem('editValue')))
    if (params.data !== '0') {
      setFromData({ 
        name: typeof paramsData.name !== 'undefined' ? paramsData.name : '',
        delValue: typeof paramsData.delValue !== 'undefined' ? paramsData.delValue : '',
        address: typeof paramsData.address !== 'undefined' ? paramsData.address : '',
        phone: typeof paramsData.phone !== 'undefined' ? paramsData.phone : '',
        status: paramsData.status === 'true' ? true : false,
        id: typeof paramsData.id !== 'undefined' ? paramsData.id : '',
      });
    }

    // ------------------------------ Load data from database------------------------------ //
    api();

  }, [params.data, paramsData.name, paramsData.delValue, paramsData.del, paramsData.address, paramsData.phone, paramsData.id, paramsData.status]);


  const api = async () => {
    let delList = []
    
    await axios.get(`${JSON_CONST.DB_URL}master/delTable/list`)
      .then((response) => {
        delList = arrageList(response);
      })
    
    setFromDataAutoFill({
      delList,
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
        delValue: fromElementsData.delValue.value,
        address: fromElementsData.address.value,
        phone: fromElementsData.phone.value,
        status: fromElementsData.status.value,
        id: fromData.id,
      }
        
      if(params.data !== '0') {
        try {
          await axios.post(`${JSON_CONST.DB_URL}master/DSA/update/${sendPost.id}`, sendPost)
            .then((response) => {
              console.log(response);
              setIsSubmitting(false);
              navigate(`/app/master/dsa`, { replace: true });
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
            await axios.post(`${JSON_CONST.DB_URL}master/DSA/create`, sendPost)
              .then((response) => {
                console.log(response);
                setIsSubmitting(false);
                navigate(`/app/master/dsa`, { replace: true });
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

  const onChangeAutocomplerte = (event) => {
    const id = fromData.delValue[event.target.dataset.optionIndex]?.id
    setFromData({
      ...fromData,
      delValue: id
    });
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
    console.log(fromData)
  };
  
  const redirectPage = async (url) => {
    navigate(`/app/master/${url}`, { replace: true });
  };

  return (
    <Page title="DSA">
      <Container maxWidth="xl">
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
          DSA
          </Typography>
          {/* <Button variant="contained" color="secondary" onClick={() => redirectPage('')} startIcon={<Iconify icon="carbon:list-boxes" />}>
            Home
          </Button> */}
        </Stack>
        {/* <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Button variant="outlined" color="info" onClick={() => redirectPage('dsa')} startIcon={<Iconify icon="akar-icons:arrow-back" />}>
            View List
          </Button>
        </Stack> */}
        <form methods="post" onSubmit={onSubmit}>
        <Card>
          <Grid container alignItems="center" paddingLeft={10} paddingBottom={10} paddingRight={10} paddingTop={5} spacing={3}>
            <Grid mt={2} mb={2} item xs={12} sm={12} md={12} lg={12}>
              <Typography variant="overline" gutterBottom>
              Enter Following DSA information <Iconify icon="bi:arrow-down" />
              </Typography>
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4}>
              <TextField
                onChange={onChangeFields}
                fullWidth
                value={fromData.name}
                required
                name="name" 
                label="DSA Name"
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4}>
              <TextField
                onChange={onChangeFields}
                fullWidth
                value={fromData.phone}
                name="phone" 
                label="Phone"
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4}>
              <FormControl fullWidth>
                <InputLabel id="delValue-select-label">DEL</InputLabel>
                <Select
                  labelId="delValue-select-label"
                  id="delValue-select"
                  value={fromData.delValue}
                  label="delValue"
                  name="delValue"  
                  fullWidth
                  onChange={onChangeFields}
                >
                  {fromDataAutoFill.delList.map((option) => (<MenuItem key={option.id} value={option.id}>{option.name}</MenuItem>))}
                </Select>
              </FormControl>
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
