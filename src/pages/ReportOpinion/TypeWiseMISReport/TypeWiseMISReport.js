/* eslint-disable no-unneeded-ternary */
/* eslint-disable no-unused-vars */
import * as Yup from 'yup';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { faker } from '@faker-js/faker';
// @mui
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography, Link, Stack, Button, Card, TextField, Checkbox, FormControlLabel, Autocomplete, Radio, RadioGroup, FormControl, FormLabel, InputLabel, MenuItem } from '@mui/material';
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

export default function TypeWiseMISReport(props) {

  const navigate = useNavigate()
  const params = useParams()
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [paramsData, setParamsData] = useState([]);
  const [refBranch, setRefBranch] = useState([]);

  const [fromData, setFromData] = useState({
    name: '',
    address: '',
    bankName: [],
    path: '',
    id: '',
    status: ''
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
    // ------------------------------ Load data from database------------------------------ //
    api();
  }, []);

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
      branchList: [],
      userList,
      dsaList,
      regOffList,
      handlledByList,
      remarksList,
    })

    setRefBranch(branchList)

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
    const fromElementsData = event.target.elements
    let sendPost = {
      bank: fromElementsData.bank.value,
      branch: fromElementsData.branch.value,
      from: fromElementsData.from.value,
      to: fromElementsData.to.value,
      reportType: fromElementsData.reportType.value,
      status: fromElementsData.status.value,
    }

    sendPost = JSON.stringify(sendPost);
    sendPost = encodeURI(sendPost);

    navigate(`/app/reportOpinion/typeWiseMISReport/PDFRenderTypeWiseMISReport/${sendPost}`, { replace: true,  });

  };
  
  const onChangeFields = async (event) => {
    if(event.target.name === 'bank') {
      setFromData({
        ...fromData,
        [event.target.name]: event.target.value
      });

      const branchList = [];
      refBranch.forEach((values,keys)=>{
        if(values.bankName.id === event.target.value) {
          branchList.push(values);
        }
      });

      setFromDataAutoFill({...fromDataAutoFill,branchList})
    }
    else {
      setFromData({
        ...fromData,
        [event.target.name]: event.target.value
      });
    }
  };
  
  const redirectPage = async (url) => {
    navigate(`/app/reportOpinion/${url}`, { replace: true });
  };

  return (
    <Page title="Type Wise MIS Report">
      <Container maxWidth="xl">
        {/* <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
          Type Wise MIS Report
          </Typography>
          <Button variant="contained" color="secondary" onClick={() => redirectPage('')} startIcon={<Iconify icon="carbon:list-boxes" />}>
            Home
          </Button>
        </Stack>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Button variant="outlined" color="info" onClick={() => redirectPage('branch')} startIcon={<Iconify icon="akar-icons:arrow-back" />}>
            View List
          </Button>
        </Stack> */}
        <form methods="post" onSubmit={onSubmit}>
        <Card>
          <Grid container alignItems="center" paddingLeft={10} paddingBottom={10} paddingRight={10} paddingTop={5} spacing={3}>
            <Grid mt={2} mb={0} item xs={12} sm={12} md={12} lg={12}>
              <Typography variant="h4" gutterBottom>
                Type Wise MIS Report |
                <Typography ml={1} variant="overline" gutterBottom>
                  Search <Iconify icon="bi:arrow-down" />
                </Typography>
              </Typography>
              
            </Grid>
            
            <Grid item xs={12} sm={12} md={4} lg={4}>
              <FormControl fullWidth>
                <InputLabel id="bank-select-label">Bank</InputLabel>
                <Select
                  labelId="bank-select-label"
                  id="bank-select"
                  value={fromData.bank}
                  label="bank"
                  name="bank"  
                  fullWidth
                  onChange={onChangeFields}
                >
                  {fromDataAutoFill.bankList.map((option) => (<MenuItem key={option.id} value={option.id}>{option.name}</MenuItem>))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4}>
              <FormControl fullWidth>
                <InputLabel id="branch-select-label">Branch</InputLabel>
                <Select
                  labelId="branch-select-label"
                  id="branch-select"
                  value={fromData.branch}
                  label="branch"
                  name="branch"  
                  fullWidth
                  onChange={onChangeFields}
                >
                  {fromDataAutoFill.branchList.map((option) => (<MenuItem key={option.id} value={option.id}>{option.name}</MenuItem>))}
                </Select>
              </FormControl>
            </Grid>
            <Grid mt={0} mb={0} item xs={12} sm={12} md={12} lg={12}>
              {/* <Typography variant="overline" gutterBottom>
               Select The Date Criteria<Iconify icon="bi:arrow-down" />
              </Typography> */}
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4}>
              <TextField
                onChange={onChangeFields}
                fullWidth
                value={fromData.from}
                name="from" 
                label="From"
                required
                type="date"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4}>
              <TextField
                onChange={onChangeFields}
                fullWidth
                value={fromData.to}
                name="to" 
                label="To"
                required
                type="date"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4} />
            <Grid item xs={12} sm={12} md={4} lg={4}>
              <FormControl fullWidth>
                <InputLabel id="reportType-select-label">Report Type</InputLabel>
                <Select
                  labelId="reportType-select-label"
                  id="reportType-select"
                  value={fromData.reportType}
                  label="reportType"
                  name="reportType"  
                  fullWidth
                  onChange={onChangeFields}
                >
                  <MenuItem value='ODV'>ODV</MenuItem>
                  <MenuItem value='Vetting Report'>Vetting</MenuItem>
                  <MenuItem value='Others'>Others</MenuItem>
                  {/* <MenuItem value='Leagal Report'>Leagal Report</MenuItem>
                  <MenuItem value='TSR'>TSR</MenuItem>
                  <MenuItem value='Opinion'>Opinion</MenuItem>
                  <MenuItem value='Project'>Project</MenuItem>
                  <MenuItem value='Certified Copy'>Certified Copy</MenuItem>
                  <MenuItem value='ROC Search'>ROC Search</MenuItem> */}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4}>
              <FormControl fullWidth>
                <InputLabel id="status-select-label">Status</InputLabel>
                <Select
                  labelId="status-select-label"
                  id="status-select"
                  value={fromData.status}
                  label="status"
                  name="status"  
                  fullWidth
                  onChange={onChangeFields}
                >
                  <MenuItem value='Pending'>Pending</MenuItem>
                  <MenuItem value='Positive'>Positive</MenuItem>
                  <MenuItem value='Negative'>Negative</MenuItem>
                  <MenuItem value='Returned'>Returned</MenuItem>
                  <MenuItem value='Hold'>Hold</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            
            <Grid item xs={12} sm={12} md={4} lg={4} />

            <Grid item xs={12} sm={1} md={3} lg={3}>
              <LoadingButton fullWidth size="large" type="submit" variant="outlined" color="info" loading={isSubmitting}>
                Generate Report
              </LoadingButton>
            </Grid>

            <Grid mt={2} item xs={12} sm={12} md={12} lg={12}>
              <Typography variant="caption" gutterBottom>
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
