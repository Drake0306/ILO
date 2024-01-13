/* eslint-disable no-unneeded-ternary */
/* eslint-disable no-unused-vars */
import * as Yup from 'yup';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { faker } from '@faker-js/faker';
import axios from 'axios';
import { parseJSON } from 'date-fns';
// @mui
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography, Link, Stack, Button, Card, TextField, Checkbox, FormControlLabel, Autocomplete, InputLabel, MenuItem, FormControl } from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { LoadingButton } from '@mui/lab';

// components
import moment from 'moment';
import { FormProvider, RHFTextField, RHFCheckbox } from '../../../components/hook-form';
import Page from '../../../components/Page';
import Iconify from '../../../components/Iconify';
import JSON_CONST from '../../../components/CONSTVALUE.json';
import '../../../styles.css';
import Loader from '../../Loader/Loader';
// ----------------------------------------------------------------------

export default function EntryFormAL(props) {

  const navigate = useNavigate()
  const params = useParams()
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [paramsData, setParamsData] = useState([]);
  const [refBranch, setRefBranch] = useState([]);
  const [fromData, setFromData] = useState({
    reciptDate: moment().format('YYYY-MM-DD'),
    fileNo: '',
    bank: [],
    uid: '',
    branch: [],
    loanACNo: '',
    collectedBy: '',
    refNo: '',
    name: '',
    handledByName: '',
    customerBorrower: '',
    payOrderNo: '',
    forRs: '',
    dated: '',
    reciptNo: '',
    amount: '',
    documentsCollected: '',
    executiveName: '',
    builderName: '',
    recDate: '',
    remarks: '',
    favoring: '',
    phoneNo: '',
    dateDocCollect: '',
    documents: '',
    documentSentOn: '',
    CaseClosed: '',
    AckReceived: '',
    AckFiled: '',
    volNo: '',
    sn: '',
    address: '',
    statusValue: 'Pending',
    id: '',
    status: true
  });

  const [fromDataAutoFill, setFromDataAutoFill] = useState({
    bankList: [],
    branchList: [],
    userList: [],
    handledByList: [],
  });

  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    // Update the document title using the browser API
    setParamsData(JSON.parse(localStorage.getItem('editValue')))
    if (params.data !== '0') {
      console.log(paramsData)
      setFromData({ 
        bank: typeof paramsData.bank !== 'undefined' ? paramsData.bank : [],
        branch: typeof paramsData.branch !== 'undefined' ? paramsData.branch : [],
        reciptDate: typeof paramsData.reciptDate !== 'undefined' ? paramsData.reciptDate : '',
        refNo: typeof paramsData.refNo !== 'undefined' ? paramsData.refNo : '',
        customerBorrower: typeof paramsData.customerBorrower !== 'undefined' ? paramsData.customerBorrower : [],
        address: typeof paramsData.address !== 'undefined' ? paramsData.address : '',
        phoneNo: typeof paramsData.phoneNo !== 'undefined' ? paramsData.phoneNo : '',
        builderName: typeof paramsData.builderName !== 'undefined' ? paramsData.builderName : '',
        documents: typeof paramsData.documents !== 'undefined' ? paramsData.documents : '',
        documentsCollected: typeof paramsData.documentsCollected !== 'undefined' ? paramsData.documentsCollected : '',
        dateDocCollect: typeof paramsData.dateDocCollect !== 'undefined' ? paramsData.dateDocCollect : [],
        executiveName: typeof paramsData.executiveName !== 'undefined' ? paramsData.executiveName : [],
        documentSentOn: typeof paramsData.documentSentOn !== 'undefined' ? paramsData.documentSentOn : '',
        CaseClosed: typeof paramsData.CaseClosed !== 'undefined' ? paramsData.CaseClosed : '',
        AckReceived: typeof paramsData.AckReceived !== 'undefined' ? paramsData.AckReceived : '',
        AckFiled: typeof paramsData.AckFiled !== 'undefined' ? paramsData.AckFiled : '',
        volNo: typeof paramsData.volNo !== 'undefined' ? paramsData.volNo : '',
        sn: typeof paramsData.sn !== 'undefined' ? paramsData.sn : '',
        remarks: typeof paramsData.remarks !== 'undefined' ? paramsData.remarks : '',
        statusValue: typeof paramsData.statusValue !== 'undefined' ? paramsData.statusValue : '',
        status:   paramsData.status === 'true'? true: false,
        id: typeof paramsData.id !== 'undefined' ? paramsData.id : '',
      });
    }

    // ------------------------------ Load data from database------------------------------ //
    api();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[params, paramsData.id, paramsData.status, paramsData.remarks, paramsData.recDate, paramsData.refNo, paramsData.customerBorrower, paramsData.dated, paramsData.forRs, paramsData.address, paramsData.payOrderNo, paramsData.customerBorrower, paramsData.bank, paramsData.branch, paramsData.reciptDate, paramsData.fileNo, paramsData.loanACNo, paramsData.collectedBy, paramsData.handledByName,paramsData.refNo]);

  const api = async () => {
    let bankList = []
    let branchList = []
    let userList = []
    let handledByList = []
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
    
    await axios.get(`${JSON_CONST.DB_URL}master/handledBy/list`)
    .then((response) => {
      handledByList = arrageList(response);
    })
    
    setFromDataAutoFill({
      bankList,
      branchList,
      userList,
      handledByList,
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
    setIsSubmitting(true);
    const fromElementsData = event.target.elements
    const sendPost = {
      reciptDate: fromElementsData.reciptDate.value,
      refNo: fromElementsData.refNo.value,
      bank: fromElementsData.bank.value,
      branch: fromElementsData.branch.value,
      customerBorrower: fromElementsData.customerBorrower.value,
      phoneNo: fromElementsData.phoneNo.value,
      address: fromElementsData.address.value,
      builderName: fromElementsData.builderName.value,
      documents: fromElementsData.documents.value,
      documentsCollected: fromElementsData.documentsCollected.value,
      dateDocCollect: fromElementsData.dateDocCollect.value,
      executiveName: fromElementsData.executiveName.value,
      documentSentOn: fromElementsData.documentSentOn.value,
      CaseClosed: fromElementsData.CaseClosed.value,
      AckReceived: fromElementsData.AckReceived.value,
      AckFiled: fromElementsData.AckFiled.value,
      volNo: fromElementsData.volNo.value,
      sn: fromElementsData.sn.value,
      remarks: fromElementsData.remarks.value,
      statusValue: fromElementsData.statusValue.value,
      status: fromElementsData.status.value,
      id: fromData.id,
    }

    console.log(sendPost)
    
    if(params.data !== '0') {
      try {
        await axios.post(`${JSON_CONST.DB_URL}authorityLetters/registration/update/${sendPost.id}`, sendPost)
          .then((response) => {
            console.log(response);
            setIsSubmitting(false);
            navigate(`/app/format/AuthorityLetters/list/`, { replace: true });
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
          await axios.post(`${JSON_CONST.DB_URL}authorityLetters/registration/create`, sendPost)
            .then((response) => {
              console.log(response);
              setIsSubmitting(false);
              // navigate(`/app/format/AuthorityLetters/0`, { replace: true });
              navigate(`/app/format/AuthorityLetters/list/`, { replace: true });
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

    // Bank To Branch Change Logic
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
    else if(event.target.name === 'status') {
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
    navigate(`/app/${url}`, { replace: true });
  };

  // Loader
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulating data fetching or processing delay
    const delay = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(delay);
  }, [])

  return (
    <Page title="Authority Letters">
      {isLoading ? (
        <Loader />
      ) : (
      <Container maxWidth="xl" className="container-custom">
        {/* <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
          Builer Payment
          </Typography>
          <Button variant="contained" color="secondary" onClick={() => redirectPage('dashboard')} startIcon={<Iconify icon="carbon:list-boxes" />}>
            Dashboard
          </Button>
        </Stack> */}
        {/* <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Button variant="outlined" color="info" onClick={() => redirectPage('builerPayment')} startIcon={<Iconify icon="akar-icons:arrow-back" />}>
            View List
          </Button>
        </Stack> */}
        <form methods="post" onSubmit={onSubmit}>
        <Card>
          <Grid container alignItems="center" paddingLeft={10} paddingBottom={10} paddingRight={10} paddingTop={5} spacing={3}>
            <Grid mt={2} mb={0} item xs={12} sm={12} md={12} lg={12}>
              <Typography variant="h4" gutterBottom>
                Authority Letters |
                <Typography ml={1} variant="overline" gutterBottom>
                  Details <Iconify icon="bi:arrow-down" />
                </Typography>
              </Typography>
              
            </Grid>
            
            <Grid item xs={12} sm={12} md={3} lg={3}>
              <TextField
                onChange={onChangeFields}
                fullWidth
                value={fromData.reciptDate} 
                required
                name="reciptDate"
                label="Receipt Date"
                type="date"
                error
                InputLabelProps={{
                  shrink: true,
                }}
                autoFocus
              />
            </Grid>

            <Grid item xs={12} sm={12} md={3} lg={3}>
              <TextField
                onChange={onChangeFields}
                fullWidth
                value={fromData.refNo}
                name="refNo"  
                label="Bank APS/Appl/Ref No"
              />
            </Grid>

            <Grid item xs={12} sm={12} md={3} lg={3}>
              <FormControl fullWidth>
                <InputLabel id="Bank-select-label">Bank</InputLabel>
                <Select
                  labelId="Bank-select-label"
                  id="Bank-select"
                  value={fromData.bank}
                  label="bank"
                  name="bank"  
                  fullWidth
                  error
                  required
                  onChange={onChangeFields}
                >
                  {fromDataAutoFill.bankList.map((option) => (<MenuItem key={option.id} value={option.id}>{option.name}</MenuItem>))}
                </Select>
              </FormControl>
            </Grid>


            <Grid item xs={12} sm={12} md={3} lg={3}>
              <FormControl fullWidth>
                <InputLabel id="Branch-select-label">Branch</InputLabel>
                <Select
                  labelId="Branch-select-label"
                  id="Branch-select"
                  value={fromData.branch}
                  label="branch"
                  name="branch"  
                  fullWidth
                  error
                  required
                  onChange={onChangeFields}
                >
                  {fromDataAutoFill.branchList.map((option) => (<MenuItem key={option.id} value={option.id}>{option.name}</MenuItem>))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={12} md={4} lg={4}>
              <TextField
                onChange={onChangeFields}
                fullWidth
                value={fromData.customerBorrower}
                name="customerBorrower" 
                rows={1}
                multiline
                error
                label="Customer Name"
                required
              />
            </Grid>

            <Grid item xs={12} sm={12} md={2} lg={2}>
              <TextField
                onChange={onChangeFields}
                fullWidth
                value={fromData.phoneNo}
                name="phoneNo" 
                label="phone No"
              />
            </Grid>

            <Grid item xs={12} sm={12} md={6} lg={6}>
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

            <Grid item xs={12} sm={12} md={6} lg={6}>
              <TextField
                onChange={onChangeFields}
                fullWidth
                value={fromData.builderName}
                name="builderName" 
                required
                error
                label="Builder Name"
              />
            </Grid>

            <Grid item xs={12} sm={12} md={6} lg={6}>
              <TextField
                onChange={onChangeFields}
                fullWidth
                value={fromData.documents}
                name="documents" 
                label="Documents to be collected"
                multiline
                rows={2}
              />
            </Grid>

            <Grid item xs={12} sm={12} md={3} lg={3}>
              <FormControl fullWidth>
                <InputLabel id="handledByName-select-label">Documents Collected</InputLabel>
                <Select
                  labelId="handledByName-select-label"
                  id="handledByName-select"
                  value={fromData.documentsCollected}
                  label="Documents Collected"
                  name="documentsCollected"  
                  fullWidth
                  onChange={onChangeFields}
                >
                  <MenuItem value="YES">YES</MenuItem>
                  <MenuItem value="NO">NO</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            {/* <Grid item xs={12} sm={12} md={3} lg={3}>
              <TextField
                onChange={onChangeFields}
                fullWidth
                value={fromData.executiveName}
                name="executiveName" 
                label="Executive Name"
              />
            </Grid> */}

            <Grid item xs={12} sm={12} md={3} lg={3}>
              <FormControl fullWidth>
                <InputLabel id="Bank-select-label">Executive Name</InputLabel>
                <Select
                  labelId="Bank-select-label"
                  id="Bank-select"
                  value={fromData.executiveName}
                  label="executiveName"
                  name="executiveName"  
                  fullWidth
                  error
                  required
                  onChange={onChangeFields}
                >
                  {fromDataAutoFill.handledByList.map((option) => (<MenuItem key={option.id} value={option.id}>{option.name}</MenuItem>))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={12} md={3} lg={3}>
              <TextField
                onChange={onChangeFields}
                fullWidth
                value={fromData.dateDocCollect}
                name="dateDocCollect"
                label="Date of Document collected"
                type="date"
                InputLabelProps={{
                  shrink: true,
                }}
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={12} md={3} lg={3}>
              <TextField
                onChange={onChangeFields}
                fullWidth
                value={fromData.documentSentOn}
                name="documentSentOn"
                label="Document Sent"
                type="date"
                InputLabelProps={{
                  shrink: true,
                }}
                autoFocus
              />
            </Grid>

            <Grid item xs={12} sm={12} md={3} lg={3}>
              <FormControl fullWidth>
                <InputLabel id="handledByName-select-label">Case Closed</InputLabel>
                <Select
                  labelId="handledByName-select-label"
                  id="handledByName-select"
                  value={fromData.CaseClosed}
                  label="Case Closed"
                  name="CaseClosed"  
                  fullWidth
                  onChange={onChangeFields}
                >
                  <MenuItem value="YES">YES</MenuItem>
                  <MenuItem value="NO">NO</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            
            <Grid item xs={12} sm={12} md={3} lg={3}>
              <FormControl fullWidth>
                <InputLabel id="handledByName-select-label">Ack Received</InputLabel>
                <Select
                  labelId="handledByName-select-label"
                  id="handledByName-select"
                  value={fromData.AckReceived}
                  label="Ack Received"
                  name="AckReceived"  
                  fullWidth
                  onChange={onChangeFields}
                >
                  <MenuItem value="YES">YES</MenuItem>
                  <MenuItem value="NO">NO</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={12} md={6} lg={6}>
              <TextField
                onChange={onChangeFields}
                fullWidth
                value={fromData.AckFiled }
                name="AckFiled" 
                label="Ack Filed"
              />
            </Grid>

            <Grid item xs={12} sm={12} md={3} lg={3}>
                <FormControl fullWidth>
                  <InputLabel id="statusValue-select-label">Status</InputLabel>
                  <Select
                    labelId="statusValue-select-label"
                    id="statusValue-select"
                    value={fromData.statusValue}
                    label="statusValue"
                    name="statusValue"  
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
            
            <Grid item xs={12} sm={12} md={4} lg={4}>
              <TextField
                onChange={onChangeFields}
                fullWidth
                value={fromData.volNo }
                name="volNo" 
                label="Vol No"
              />
            </Grid>
            
            <Grid item xs={12} sm={12} md={5} lg={5}>
              <TextField
                onChange={onChangeFields}
                fullWidth
                value={fromData.sn}
                name="sn" 
                label="SN"
              />
            </Grid>

            <Grid item xs={12} sm={12} md={12} lg={12}>
              <TextField
                onChange={onChangeFields}
                fullWidth
                value={fromData.remarks }
                name="remarks" 
                label="Remarks"
                multiline
                rows={3}

              />
            </Grid>

            


            <Grid item xs={12} sm={1} md={1} lg={1}>
              <LoadingButton fullWidth size="large" type="submit" variant="outlined" color="info" loading={isSubmitting}>
                Save
              </LoadingButton>
            </Grid>
            
            <Grid item xs={12} sm={12} md={12} lg={12} style={{display: 'none'}}>
              <FormControlLabel
                control={
                  <Checkbox
                    name="status"
                    checked={fromData.status}
                    value={fromData.status}
                    onChange={onChangeFields}
                  />
                }
                label="Pending"
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
      )}
    </Page>
  );
}
