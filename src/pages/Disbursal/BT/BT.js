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
import moment from 'moment';


// components
import { FormProvider, RHFTextField, RHFCheckbox } from '../../../components/hook-form';
import Page from '../../../components/Page';
import Iconify from '../../../components/Iconify';
import JSON_CONST from '../../../components/CONSTVALUE.json';

// ----------------------------------------------------------------------

export default function BT(props) {

  const navigate = useNavigate()
  const params = useParams()
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [paramsData, setParamsData] = useState([]);
  const [refBranch, setRefBranch] = useState([]);
  const [fromData, setFromData] = useState({
    bankName: '',
    branchName: '',
    uid: '',
    date: moment().format('YYYY-MM-DD'),
    transNo: '',
    customerName: '',
    phoneNo: '',
    address: '',
    collectionDate: '',
    docSentToBankDate: '',
    sentAt: '',
    caseClose: '',
    loanTakenFrom: '',
    propertyDetails: '',
    handledBy: '',
    remarks: '',
    otherRemarkIfAny: '',
    chequeDate: '',
    amount: '',
    chequeReceivedDate: '',
    chequeReturnDate: '',
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
      paramsData.bankName = paramsData?.bankName?.id
      paramsData.branchName = paramsData?.branchName?.id
      setFromData(paramsData)
    }
    // ------------------------------ Load data from database------------------------------ //
    
  }, [params.data, paramsData]);


  useEffect(() => {
    setParamsData(JSON.parse(localStorage.getItem('editValue')))
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

    api();
  },[])
  
  

    const onSubmit = async (event) => {
      event.preventDefault()
      setIsSubmitting(true);
      const fromElementsData = event.target.elements
      const sendPost = {
        bankName: fromElementsData.bankName.value,
        branchName: fromElementsData.branchName.value,
        date: fromElementsData.date.value,
        transNo: fromElementsData.transNo.value,
        customerName: fromElementsData.customerName.value,
        uid: fromElementsData.uid.value,
        phoneNo: fromElementsData.phoneNo.value,
        address: fromElementsData.address.value,
        collectionDate: fromElementsData.collectionDate.value,
        docSentToBankDate: fromElementsData.docSentToBankDate.value,
        sentAt: fromElementsData.sentAt.value,
        caseClose: fromElementsData.caseClose.value,
        applicationNo: fromElementsData.applicationNo.value,
        loanTakenFrom: fromElementsData.loanTakenFrom.value,
        propertyDetails: fromElementsData.propertyDetails.value,
        handledBy: fromElementsData.handledBy.value,
        remarks: fromElementsData.remarks.value,
        otherRemarkIfAny: fromElementsData.otherRemarkIfAny.value,
        chequeDate: fromElementsData.chequeDate.value,
        amount: fromElementsData.amount.value,
        chequeReceivedDate: fromElementsData.chequeReceivedDate.value,
        chequeReturnDate: fromElementsData.chequeReturnDate.value,
        status: fromElementsData.status.value,
        id: fromData.id,
      }
  
      console.log(sendPost)

      const config = {
        headers: {
          'content-type': 'multipart/form-data',
        },
      };
      if(params.data !== '0') {
        try {
          await axios.post(`${JSON_CONST.DB_URL}disbursal/BT/update/${sendPost.id}`, sendPost)
            .then((response) => {
              console.log(response);
              setIsSubmitting(false);
              navigate(`/app/disbursal/registration/prepareReports`, { replace: true });
              // setFromData({
              //   bankName: '',
              //   branchName: '',
              //   date: '',
              //   transNo: '',
              //   customerName: '',
              //   uid: '',
              //   phoneNo: '',
              //   address: '',
              //   collectionDate: '',
              //   docSentToBankDate: '',
              //   sentAt: '',
              //   caseClose: '',
              //   loanTakenFrom: '',
              //   propertyDetails: '',
              //   handledBy: '',
              //   remarks: '',
              //   otherRemarkIfAny: '',
              //   chequeDate: '',
              //   amount: '',
              //   chequeReceivedDate: '',
              //   chequeReturnDate: '',
              //   status: true,
              //   id: '',
              // })
            })
            .catch((error) => {
              setIsSubmitting(false);
              console.log(error);
            });
        }
        catch (err) {
          console.log(err)
        }
      }
      else {
        try {
          await axios.post(`${JSON_CONST.DB_URL}disbursal/BT/create`, sendPost)
            .then((response) => {
              console.log(response);
              setIsSubmitting(false);
              // navigate(`/app/disbursal/registration/prepareReports`, { replace: true });
              setFromData({
                bankName: '',
                branchName: '',
                date: '',
                transNo: '',
                uid: '',
                phoneNo: '',
                address: '',
                collectionDate: '',
                docSentToBankDate: '',
                sentAt: '',
                caseClose: '',
                loanTakenFrom: '',
                propertyDetails: '',
                handledBy: '',
                remarks: '',
                otherRemarkIfAny: '',
                chequeDate: '',
                amount: '',
                chequeReceivedDate: '',
                chequeReturnDate: '',
                status: true,
                id: '',
              })
            })
            .catch((error) => {
              setIsSubmitting(false);
              console.log(error);
            });
        }
        catch (err) {
          console.log(err)
        }

      }
      

  }
  
  const onChangeFields = async (event) => {
    if(event.target.name === 'bankName') {
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
    navigate(`/app/disbursal/${url}`, { replace: true });
  };

  return (
    <Page title="BT ( Loan Take Over )">
      <Container maxWidth="xl">
        {/* <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
          BT ( Loan Take Over )
          </Typography>
          <Button variant="contained" color="secondary" onClick={() => redirectPage('')} startIcon={<Iconify icon="carbon:list-boxes" />}>
            Home
          </Button>
        </Stack> */}
        {/* <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Button variant="outlined" color="info" onClick={() => redirectPage('branch')} startIcon={<Iconify icon="akar-icons:arrow-back" />}>
            View List
          </Button>
        </Stack> */}
        <form methods="post" onSubmit={onSubmit}>
        <Card>
          <Grid container alignItems="center" paddingLeft={10} paddingBottom={10} paddingRight={10} paddingTop={5} spacing={3}>
            <Grid mt={2} mb={2} item xs={12} sm={12} md={12} lg={12}>
              <Typography variant="h4" gutterBottom>
              BT ( Loan Take Over ) |
                <Typography ml={1} variant="overline" gutterBottom>
                  Details <Iconify icon="bi:arrow-down" />
                </Typography>
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
                  required
                >
                  {fromDataAutoFill.bankList.map((option) => (<MenuItem key={option.id} value={option.id}>{option.name}</MenuItem>))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4}>
              <FormControl fullWidth>
                <InputLabel id="branchName-select-label">Branch</InputLabel>
                <Select
                  labelId="branchName-select-label"
                  id="branchName-select"
                  value={fromData.branchName}
                  label="branchName"
                  name="branchName"  
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
                value={fromData.date}
                name="date" 
                label="Date"
                required
                type="date"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>

            <Grid item xs={12} sm={12} md={2} lg={2}>
              <TextField
                onChange={onChangeFields}
                fullWidth
                value={fromData.transNo}
                name="transNo" 
                label="Trans No"
              />
            </Grid>

            {/* <Grid mt={0} mb={0} item xs={12} sm={12} md={12} lg={12}>
              <Typography variant="overline" gutterBottom>
              Customer Details <Iconify icon="bi:arrow-down" />
              </Typography>
            </Grid> */}

            <Grid item xs={12} sm={12} md={3} lg={3}>
              <TextField
                onChange={onChangeFields}
                fullWidth
                value={fromData.customerName}
                name="customerName" 
                label="Customer Name"
              />
            </Grid>

            <Grid item xs={12} sm={12} md={2} lg={2}>
              <TextField
                onChange={onChangeFields}
                fullWidth
                value={fromData.uid}
                name="uid"  
                label="UID No"
                required
              />
            </Grid>

            <Grid item xs={12} sm={12} md={2} lg={2}>
              <TextField
                onChange={onChangeFields}
                fullWidth
                value={fromData.phoneNo}
                name="phoneNo" 
                label="Phone No"
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
              Document Details <Iconify icon="bi:arrow-down" />
              </Typography>
            </Grid> */}

            <Grid item xs={12} sm={12} md={3} lg={3}>
              <TextField
                onChange={onChangeFields}
                fullWidth
                value={fromData.collectionDate}
                name="collectionDate" 
                label="Collection Date"
                required
                type="date"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>

            <Grid item xs={12} sm={12} md={3} lg={3}>
              <TextField
                onChange={onChangeFields}
                fullWidth
                value={fromData.docSentToBankDate}
                name="docSentToBankDate" 
                label="Doc Sent To Bank Date"
                required
                type="date"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>

            <Grid item xs={12} sm={12} md={3} lg={3}>
              <TextField
                onChange={onChangeFields}
                fullWidth
                value={fromData.sentAt}
                name="sentAt" 
                label="Sent At"
              />
            </Grid>

            <Grid item xs={12} sm={12} md={3} lg={3}>
              <TextField
                onChange={onChangeFields}
                fullWidth
                value={fromData.caseClose}
                name="caseClose" 
                label="Case Close"
                required
                type="date"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>

            {/* <Grid mt={0} mb={0} item xs={12} sm={12} md={12} lg={12}>
              <Typography variant="overline" gutterBottom>
               <Iconify icon="bi:arrow-down" />
              </Typography>
            </Grid> */}

            <Grid item xs={12} sm={12} md={4} lg={4}>
              <TextField
                onChange={onChangeFields}
                fullWidth
                value={fromData.loanTakenFrom}
                name="loanTakenFrom" 
                label="Loan Taken From"
              />
            </Grid>

            <Grid item xs={12} sm={12} md={8} lg={8}>
              <TextField
                onChange={onChangeFields}
                fullWidth
                value={fromData.propertyDetails}
                name="propertyDetails" 
                label="Property Details"
                multiline
                rows={2}
                required
              />
            </Grid>

            <Grid item xs={12} sm={12} md={3} lg={3}>
              <FormControl fullWidth>
                <InputLabel id="handledBy-select-label">Handled By</InputLabel>
                <Select
                  labelId="handledBy-select-label"
                  id="handledBy-select"
                  value={fromData.handledBy}
                  label="handledBy"
                  name="handledBy"  
                  fullWidth
                  onChange={onChangeFields}
                >
                  {fromDataAutoFill.handlledByList.map((option) => (<MenuItem key={option.id} value={option.id}>{option.name}</MenuItem>))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={12} md={3} lg={3}>
              <TextField
                onChange={onChangeFields}
                fullWidth
                value={fromData.applicationNo}
                required
                name="applicationNo" 
                label="Application No"
              />
            </Grid>

            <Grid item xs={12} sm={12} md={3} lg={3}>
              <FormControl fullWidth>
                <InputLabel id="remarks-select-label">Remarks</InputLabel>
                <Select
                  labelId="remarks-select-label"
                  id="remarks-select"
                  value={fromData.remarks}
                  label="remarks"
                  name="remarks"  
                  fullWidth
                  onChange={onChangeFields}
                >
                  {fromDataAutoFill.remarksList.map((option) => (<MenuItem key={option.id} value={option.id}>{option.name}</MenuItem>))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={12} md={3} lg={3}>
              <TextField
                onChange={onChangeFields}
                fullWidth
                value={fromData.otherRemarkIfAny}
                name="otherRemarkIfAny" 
                label="Other Remark If Any"
              />
            </Grid>

            <Grid mt={0} mb={0} item xs={12} sm={12} md={12} lg={12}>
              <Typography variant="overline" gutterBottom>
               Cheque Detail<Iconify icon="bi:arrow-down" />
              </Typography>
            </Grid>

            <Grid item xs={12} sm={12} md={3} lg={3}>
              <TextField
                onChange={onChangeFields}
                fullWidth
                value={fromData.chequeDate}
                name="chequeDate" 
                label="Cheque Close"
                required
                type="date"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>

            <Grid item xs={12} sm={12} md={3} lg={3}>
              <TextField
                onChange={onChangeFields}
                fullWidth
                value={fromData.amount}
                name="amount" 
                label="Amount"
              />
            </Grid>

            <Grid item xs={12} sm={12} md={3} lg={3}>
              <TextField
                onChange={onChangeFields}
                fullWidth
                value={fromData.chequeReceivedDate}
                name="chequeReceivedDate" 
                label="Cheque Received Date"
                required
                type="date"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={3} lg={3}>
              <TextField
                onChange={onChangeFields}
                fullWidth
                value={fromData.chequeReturnDate}
                name="chequeReturnDate" 
                label="Cheque Return Date"
                required
                type="date"
                InputLabelProps={{
                  shrink: true,
                }}
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
                * Date is required <br />
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
