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

export default function Registration(props) {

  const navigate = useNavigate()
  const params = useParams()
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [paramsData, setParamsData] = useState([]);
  const [refBranch, setRefBranch] = useState([]);
  const [fromData, setFromData] = useState({
    bankName: '',
    branchName: '',
    uid: '',
    registrationDate: moment().format('YYYY-MM-DD'),
    transNo: '',
    address: '',
    dsa: '',
    phone: '',
    seller: '',
    registrarOff: '',
    purchaser: '',
    reciptNo: '',
    rdSentOn: '',
    sdSentOn: '',
    tdSentOn: '',
    sentAt: '',
    caseClosed: '',
    courierDate: '',
    propertyDetails: '',
    deedWriterAdv: '',
    handledBy: '',
    applicationNo: '',
    pageNo: '',
    remarks: '',
    otherRemarkIfAny: '',
    checqueDate: '',
    amount: '',
    chequeRecivedDate: '',
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
      setFromData(paramsData);
    }
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

    api()
  }, [])

  
  

    const onSubmit = async (event) => {
      event.preventDefault()
      setIsSubmitting(true);
      const fromElementsData = event.target.elements
      const sendPost = {
        bankName: fromElementsData.bankName.value,
        branchName: fromElementsData.branchName.value,
        registrationDate: fromElementsData.registrationDate.value,
        transNo: fromElementsData.transNo.value,
        address: fromElementsData.address.value,
        dsa: fromElementsData.dsa.value,
        phone: fromElementsData.phone.value,
        seller: fromElementsData.seller.value,
        registrarOff: fromElementsData.registrarOff.value,
        purchaser: fromElementsData.purchaser.value,
        uid: fromElementsData.uid.value,
        reciptNo: fromElementsData.reciptNo.value,
        rdSentOn: fromElementsData.rdSentOn.value,
        sdSentOn: fromElementsData.sdSentOn.value,
        tdSentOn: fromElementsData.tdSentOn.value,
        sentAt: fromElementsData.sentAt.value,
        caseClosed: fromElementsData.caseClosed.value,
        courierDate: fromElementsData.courierDate.value,
        propertyDetails: fromElementsData.propertyDetails.value,
        deedWriterAdv: fromElementsData.deedWriterAdv.value,
        handledBy: fromElementsData.handledBy.value,
        applicationNo: fromElementsData.applicationNo.value,
        pageNo: fromElementsData.pageNo.value,
        remarks: fromElementsData.remarks.value,
        otherRemarkIfAny: fromElementsData.otherRemarkIfAny.value,
        checqueDate: fromElementsData.checqueDate.value,
        amount: fromElementsData.amount.value,
        chequeRecivedDate: fromElementsData.chequeRecivedDate.value,
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
          await axios.post(`${JSON_CONST.DB_URL}disbursal/registration/update/${sendPost.id}`, sendPost)
            .then((response) => {
              console.log(response);
              setIsSubmitting(false);
              navigate(`/app/disbursal/registration/prepareReports`, { replace: true });
            })
            .catch((error) => {
              setIsSubmitting(false);
              console.log(error);
            });
        }
        catch (err) {
          console.log(err)
        }

      }else {

        try {
          await axios.post(`${JSON_CONST.DB_URL}disbursal/registration/create`, sendPost)
            .then((response) => {
              console.log(response);
              setIsSubmitting(false);
              // navigate(`/app/disbursal/registration/prepareReports`, { replace: true });
              setFromData({
                bankName: '',
                branchName: '',
                registrationDate: '',
                transNo: '',
                address: '',
                dsa: '',
                phone: '',
                seller: '',
                registrarOff: '',
                purchaser: '',
                reciptNo: '',
                rdSentOn: '',
                sdSentOn: '',
                tdSentOn: '',
                sentAt: '',
                caseClosed: '',
                courierDate: '',
                propertyDetails: '',
                deedWriterAdv: '',
                handledBy: '',
                applicationNo: '',
                pageNo: '',
                remarks: '',
                otherRemarkIfAny: '',
                checqueDate: '',
                amount: '',
                chequeRecivedDate: '',
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
    <Page title="Registration">
      <Container maxWidth="xl">
        {/* <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
          Registration
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
            <Grid mt={2} mb={0} item xs={12} sm={12} md={12} lg={12}>
              <Typography variant="h4" gutterBottom>
                Registration |
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
                value={fromData.registrationDate}
                name="registrationDate" 
                label="Registration Date"
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
            <Grid container item xs={12} sm={12} md={6}lg={6} alignItems="center" paddingLeft={10} paddingBottom={0} paddingRight={0} paddingTop={0} spacing={3}>
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
                    value={fromData.purchaser}
                    name="purchaser" 
                    label="Purchaser"
                  />
                </Grid>

                <Grid item xs={12} sm={12} md={4} lg={4}>
                  <TextField
                    onChange={onChangeFields}
                    fullWidth
                    value={fromData.uid}
                    name="uid"  
                    label="UID No"
                    required
                  />
                </Grid>
                
                <Grid item xs={12} sm={12} md={4} lg={4}>
                  <TextField
                    onChange={onChangeFields}
                    fullWidth
                    value={fromData.reciptNo}
                    name="reciptNo" 
                    label="Recipt No"
                  />
                </Grid>

            </Grid>

            <Grid container item xs={12} sm={12} md={6}lg={6} alignItems="center" paddingLeft={10} paddingBottom={0} paddingRight={0} paddingTop={0} spacing={3}>
              <Grid item mt={0} xs={12} sm={12} md={6} lg={6}>
                <FormControl fullWidth>
                  <InputLabel id="dsa-select-label">DSA</InputLabel>
                  <Select
                    labelId="dsa-select-label"
                    id="dsa-select"
                    value={fromData.dsa}
                    label="dsa"
                    name="dsa"  
                    fullWidth
                    onChange={onChangeFields}
                  >
                    {fromDataAutoFill.dsaList.map((option) => (<MenuItem key={option.id} value={option.id}>{option.name}</MenuItem>))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item mt={0} xs={12} sm={12} md={6} lg={6}>
                <TextField
                  onChange={onChangeFields}
                  fullWidth
                  value={fromData.phone}
                  name="phone" 
                  label="Phone"
                />
              </Grid>
              
              <Grid item mt={3} xs={12} sm={12} md={6} lg={6}>
                <TextField
                  onChange={onChangeFields}
                  fullWidth
                  value={fromData.seller}
                  name="seller" 
                  label="Seller"
                />
              </Grid>

              <Grid item mt={3} xs={12} sm={12} md={6} lg={6}>
                <FormControl fullWidth>
                  <InputLabel id="registrarOff-select-label">Registrar Off</InputLabel>
                  <Select
                    labelId="registrarOff-select-label"
                    id="registrarOff-select"
                    value={fromData.registrarOff}
                    label="registrarOff"
                    name="registrarOff"  
                    fullWidth
                    onChange={onChangeFields}
                  >
                    {fromDataAutoFill.regOffList.map((option) => (<MenuItem key={option.id} value={option.id}>{option.name}</MenuItem>))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>

            {/* <Grid mt={0} mb={0} item xs={12} sm={12} md={12} lg={12}>
              <Typography variant="overline" gutterBottom>
               <Iconify icon="bi:arrow-down" />
              </Typography>
            </Grid> */}

            <Grid item xs={12} sm={12} md={3} lg={3}>
              <TextField
                onChange={onChangeFields}
                fullWidth
                value={fromData.rdSentOn}
                name="rdSentOn" 
                label="R.D. Sent on"
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
                value={fromData.sdSentOn}
                name="sdSentOn" 
                label="S.D. Sent on"
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
                value={fromData.caseClosed}
                name="caseClosed" 
                label="Case Closed"
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
                value={fromData.courierDate}
                name="courierDate" 
                label="Courier Date"
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

            <Grid item xs={12} sm={12} md={6} lg={6}>
              <TextField
                onChange={onChangeFields}
                fullWidth
                value={fromData.propertyDetails}
                name="propertyDetails" 
                label="Property Details"
                multiline
                rows={8}
                required
              />
            </Grid>
            
            <Grid container item xs={12} sm={12} md={6}lg={6} alignItems="center" paddingLeft={10} paddingBottom={0} paddingRight={0} paddingTop={0} spacing={3}>
                <Grid item xs={12} sm={12} md={6} lg={6}>
                  <TextField
                    onChange={onChangeFields}
                    fullWidth
                    value={fromData.tdSentOn}
                    name="tdSentOn" 
                    label="T.D. Sent on"
                    required
                    type="date"
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>

                <Grid item xs={12} sm={12} md={6} lg={6}>
                  <TextField
                    onChange={onChangeFields}
                    fullWidth
                    value={fromData.sentAt}
                    name="sentAt" 
                    label="Send At"
                  />
                </Grid>
                
                <Grid item xs={12} sm={12} md={6} lg={6}>
                  <TextField
                    onChange={onChangeFields}
                    fullWidth
                    value={fromData.deedWriterAdv}
                    name="deedWriterAdv" 
                    label="Deed Writer/Adv"
                  />
                </Grid>

                <Grid item xs={12} sm={12} md={6} lg={6}>
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

                <Grid item xs={12} sm={12} md={6} lg={6}>
                  <TextField
                    onChange={onChangeFields}
                    fullWidth
                    value={fromData.applicationNo}
                    name="applicationNo" 
                    label="Application No"
                  />
                </Grid>
                
                <Grid item xs={12} sm={12} md={6} lg={6}>
                  <TextField
                    onChange={onChangeFields}
                    fullWidth
                    value={fromData.pageNo}
                    name="pageNo" 
                    label="Page No"
                  />
                </Grid>
            </Grid>
            
            
            <Grid item xs={12} sm={12} md={12} lg={12}>
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
            <Grid item xs={12} sm={12} md={12} lg={12}>
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
               Cheque Details<Iconify icon="bi:arrow-down" />
              </Typography>
            </Grid>

            <Grid item xs={12} sm={12} md={3} lg={3}>
              <TextField
                onChange={onChangeFields}
                fullWidth
                value={fromData.checqueDate}
                name="checqueDate" 
                label="Checque Date"
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
                value={fromData.chequeRecivedDate}
                name="chequeRecivedDate" 
                label="Cheque Recived Date"
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
                * Purchaser is required <br />
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
