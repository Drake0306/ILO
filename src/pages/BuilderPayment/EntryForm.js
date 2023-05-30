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
import { FormProvider, RHFTextField, RHFCheckbox } from '../../components/hook-form';
import Page from '../../components/Page';
import Iconify from '../../components/Iconify';
import JSON_CONST from '../../components/CONSTVALUE.json';
import '../../styles.css';
// ----------------------------------------------------------------------

export default function EntryFormBF(props) {

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
    recDate: '',
    remarks: '',
    favoring: '',
    address: '',
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
        fileNo: typeof paramsData.fileNo !== 'undefined' ? paramsData.fileNo : '',
        loanACNo: typeof paramsData.loanACNo !== 'undefined' ? paramsData.loanACNo : '',
        collectedBy: typeof paramsData.collectedBy !== 'undefined' ? paramsData.collectedBy : '',
        handledByName: typeof paramsData.handledByName !== 'undefined' ? paramsData.handledByName : [],
        refNo: typeof paramsData.refNo !== 'undefined' ? paramsData.refNo : '',
        customerBorrower: typeof paramsData.customerBorrower !== 'undefined' ? paramsData.customerBorrower : [],
        address: typeof paramsData.address !== 'undefined' ? paramsData.address : '',
        payOrderNo: typeof paramsData.payOrderNo !== 'undefined' ? paramsData.payOrderNo : '',
        dated: typeof paramsData.dated !== 'undefined' ? paramsData.dated : '',
        forRs: typeof paramsData.forRs !== 'undefined' ? paramsData.forRs : '',
        favoring: typeof paramsData.favoring !== 'undefined' ? paramsData.favoring : '',
        reciptNo: typeof paramsData.reciptNo !== 'undefined' ? paramsData.reciptNo : '',
        amount: typeof paramsData.amount !== 'undefined' ? paramsData.amount : '',
        recDate: typeof paramsData.recDate !== 'undefined' ? paramsData.recDate : '',
        remarks: typeof paramsData.remarks !== 'undefined' ? paramsData.remarks : '',
        status:   paramsData.status === 'true'? true: false,
        id: typeof paramsData.id !== 'undefined' ? paramsData.id : '',
      });
    }

    // ------------------------------ Load data from database------------------------------ //
    api();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[params, paramsData.id, paramsData.status, paramsData.remarks, paramsData.recDate, paramsData.amount, paramsData.reciptNo, paramsData.favoring, paramsData.dated, paramsData.forRs, paramsData.address, paramsData.payOrderNo, paramsData.customerBorrower, paramsData.bank, paramsData.branch, paramsData.reciptDate, paramsData.fileNo, paramsData.loanACNo, paramsData.collectedBy, paramsData.handledByName,paramsData.refNo]);

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
      fileNo: fromElementsData.fileNo.value,
      bank: fromElementsData.bank.value,
      branch: fromElementsData.branch.value,
      loanACNo: fromElementsData.loanACNo.value,
      uid: fromElementsData.uid.value,
      collectedBy: fromElementsData.collectedBy.value,
      handledByName: fromElementsData.handledByName.value,
      refNo: fromElementsData.refNo.value,
      customerBorrower: fromElementsData.customerBorrower.value,
      address: fromElementsData.address.value,
      payOrderNo: fromElementsData.payOrderNo.value,
      dated: fromElementsData.dated.value,
      forRs: fromElementsData.forRs.value,
      favoring: fromElementsData.favoring.value,
      reciptNo: fromElementsData.reciptNo.value,
      amount: fromElementsData.amount.value,
      recDate: fromElementsData.recDate.value,
      remarks: fromElementsData.remarks.value,
      status: fromElementsData.status.value,
      id: fromData.id,
    }

    console.log(sendPost)
    
    if(params.data !== '0') {
      try {
        await axios.post(`${JSON_CONST.DB_URL}builderPayment/update/${sendPost.id}`, sendPost)
          .then((response) => {
            console.log(response);
            setIsSubmitting(false);
            navigate(`/app/builerPayment`, { replace: true });
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
          await axios.post(`${JSON_CONST.DB_URL}builderPayment/create`, sendPost)
            .then((response) => {
              console.log(response);
              setIsSubmitting(false);
              navigate(`/app/builerPayment`, { replace: true });
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

  return (
    <Page title="Builer Payment">
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
                 Builder  Payment |
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
                InputLabelProps={{
                  shrink: true,
                }}
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={12} md={2} lg={2}>
              <TextField
                onChange={onChangeFields}
                fullWidth
                value={fromData.fileNo}
                name="fileNo" 
                required
                label="File No"
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
                  required
                  onChange={onChangeFields}
                >
                  {fromDataAutoFill.bankList.map((option) => (<MenuItem key={option.id} value={option.id}>{option.name}</MenuItem>))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4}>
              <FormControl fullWidth>
                <InputLabel id="Branch-select-label">Branch</InputLabel>
                <Select
                  labelId="Branch-select-label"
                  id="Branch-select"
                  value={fromData.branch}
                  label="branch"
                  name="branch"  
                  fullWidth
                  required
                  onChange={onChangeFields}
                >
                  {fromDataAutoFill.branchList.map((option) => (<MenuItem key={option.id} value={option.id}>{option.name}</MenuItem>))}
                </Select>
              </FormControl>
            </Grid>
            
            <Grid item xs={12} sm={12} md={3} lg={3}>
              <TextField
                onChange={onChangeFields}
                fullWidth
                value={fromData.loanACNo}
                name="loanACNo"  
                label="Loan A/C No"
                required
              />
            </Grid>
            <Grid item xs={12} sm={12} md={3} lg={3}>
              <FormControl fullWidth>
                <InputLabel id="collectedBy-select-label">Collected By</InputLabel>
                <Select
                  labelId="collectedBy-select-label"
                  id="collectedBy-select"
                  value={fromData.collectedBy}
                  label="collectedBy"
                  name="collectedBy"  
                  fullWidth
                  required
                  onChange={onChangeFields}
                >
                  {fromDataAutoFill.handledByList.map((option) => (<MenuItem key={option.id} value={option.id}>{option.name}</MenuItem>))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={12} md={3} lg={3}>
              <FormControl fullWidth>
                <InputLabel id="handledByName-select-label">Handled By</InputLabel>
                <Select
                  labelId="handledByName-select-label"
                  id="handledByName-select"
                  value={fromData.handledByName}
                  label="handledByName"
                  name="handledByName"  
                  fullWidth
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
                value={fromData.refNo}
                name="refNo"  
                label="Ref No"
                required
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4}>
              <TextField
                onChange={onChangeFields}
                fullWidth
                value={fromData.customerBorrower}
                name="customerBorrower" 
                rows={2}
                multiline
                label="Customer Borrower"
                required
              />
            </Grid>
            <Grid item xs={12} sm={12} md={3} lg={3}>
              <TextField
                onChange={onChangeFields}
                fullWidth
                value={fromData.uid}
                name="uid"  
                label="UID No"
                required
              />
            </Grid>
            <Grid item xs={12} sm={12} md={5} lg={5}>
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

            {/* <Grid mt={0} mb={0} item xs={12} sm={12} md={12} lg={12}>
              <Typography variant="overline" gutterBottom>
              Payment Details <Iconify icon="bi:arrow-down" />
              </Typography>
            </Grid> */}
            
            <Grid item xs={12} sm={12} md={3} lg={3}>
              <TextField
                onChange={onChangeFields}
                fullWidth
                value={fromData.payOrderNo}
                name="payOrderNo" 
                label="Pay order No"
                required
              />
            </Grid>
            <Grid item xs={12} sm={12} md={3} lg={3}>
              <TextField
                onChange={onChangeFields}
                fullWidth
                value={fromData.dated}
                name="dated" 
                label="Dated"
                type="date"
                required
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={3} lg={3}>
              <TextField
                onChange={onChangeFields}
                fullWidth
                value={fromData.forRs}
                name="forRs" 
                label="For Rs"
                required
              />
            </Grid>
            
            <Grid item xs={12} sm={12} md={3} lg={3}>
              <TextField
                onChange={onChangeFields}
                fullWidth
                value={fromData.reciptNo}
                name="reciptNo" 
                label="Recipt No"
                type=""
                required
              />
            </Grid>
            <Grid item xs={12} sm={12} md={3} lg={3}>
              <TextField
                onChange={onChangeFields}
                fullWidth
                value={fromData.amount}
                name="amount" 
                label="Amount"
                type=""
                required
              />
            </Grid>
            <Grid item xs={12} sm={12} md={3} lg={3}>
              <TextField
                onChange={onChangeFields}
                fullWidth
                value={fromData.recDate}
                name="recDate" 
                label="Rec Date"
                type="date"
                required
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6}>
              <TextField
                onChange={onChangeFields}
                fullWidth
                value={fromData.favoring}
                name="favoring" 
                label="Favoring"
                multiline
                rows={2}  
                required
              />
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <TextField
                onChange={onChangeFields}
                fullWidth
                value={fromData.remarks}
                name="remarks" 
                label="Remarks"
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
