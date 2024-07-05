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
import moment from 'moment';


// components
import { FormProvider, RHFTextField, RHFCheckbox } from '../../../components/hook-form';
import Page from '../../../components/Page';
import Iconify from '../../../components/Iconify';
import JSON_CONST from '../../../components/CONSTVALUE.json';
import Loader from '../../Loader/Loader';

// ----------------------------------------------------------------------

export default function EntryFormPR(props) {

  const navigate = useNavigate()
  const params = useParams()
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [paramsData, setParamsData] = useState([]);
  const [refBranch, setRefBranch] = useState([]);
  const [fromData, setFromData] = useState({
    reciptDate: moment().format('YYYY-MM-DD'),
    bankRefNo: '',
    bank: '',
    branch: '',
    uid: '',
    apsNo: '',
    report: 'ODV',
    customerBorrower: '',
    repNo: '',
    profCharges: '',
    inspectionReceipt: '',
    outOfPocketExp: '',
    searchExp: '',
    flatHousePlotNo: '',
    roofRight: '',
    floor: '',
    RepRefNo: '',
    streetSectorLocal: '',
    referBy: '',
    city: '',
    reportDate: '',
    phoneNo: '',
    reportSentThru: '',
    email: '',
    reportSentOn: '',
    receivedBy: '',
    location: '',
    collectedBy: '',
    preparedBy: '',
    nature: 'Purchase',
    statusValue: 'Pending',
    remarks: '',
    fallowUp: '',
    netFallowUpDate: '',
    fileUpload: '',
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
      setFromData({ 
        reciptDate: typeof paramsData.reciptDate !== 'undefined' ? paramsData.reciptDate : '',
        bankRefNo: typeof paramsData.bankRefNo !== 'undefined' ? paramsData.bankRefNo : '',
        bank: typeof paramsData.bank !== 'undefined' ? paramsData.bank : '',
        branch: typeof paramsData.branch !== 'undefined' ? paramsData.branch : '',
        apsNo: typeof paramsData.apsNo !== 'undefined' ? paramsData.apsNo : '',
        report: typeof paramsData.report !== 'undefined' ? paramsData.report : '',
        customerBorrower: typeof paramsData.customerBorrower !== 'undefined' ? paramsData.customerBorrower : '',
        repNo: typeof paramsData.repNo !== 'undefined' ? paramsData.id : '',
        profCharges: typeof paramsData.profCharges !== 'undefined' ? paramsData.profCharges : '',
        inspectionReceipt: typeof paramsData.inspectionReceipt !== 'undefined' ? paramsData.inspectionReceipt : '',
        outOfPocketExp: typeof paramsData.outOfPocketExp !== 'undefined' ? paramsData.outOfPocketExp : '',
        searchExp: typeof paramsData.searchExp !== 'undefined' ? paramsData.searchExp : '',
        flatHousePlotNo: typeof paramsData.flatHousePlotNo !== 'undefined' ? paramsData.flatHousePlotNo : '',
        roofRight: typeof paramsData.roofRight !== 'undefined' ? paramsData.roofRight : '',
        floor: typeof paramsData.floor !== 'undefined' ? paramsData.floor : '',
        RepRefNo: typeof paramsData.RepRefNo !== 'undefined' ? paramsData.RepRefNo : '',
        streetSectorLocal: typeof paramsData.streetSectorLocal !== 'undefined' ? paramsData.streetSectorLocal : '',
        referBy: typeof paramsData.referBy !== 'undefined' ? paramsData.referBy : '',
        city: typeof paramsData.city !== 'undefined' ? paramsData.city : '',
        reportDate: typeof paramsData.reportDate !== 'undefined' ? paramsData.reportDate : '',
        phoneNo: typeof paramsData.phoneNo !== 'undefined' ? paramsData.phoneNo : '',
        reportSentThru: typeof paramsData.reportSentThru !== 'undefined' ? paramsData.reportSentThru : '',
        email: typeof paramsData.email !== 'undefined' ? paramsData.email : '',
        reportSentOn: typeof paramsData.reportSentOn !== 'undefined' ? paramsData.reportSentOn : '',
        receivedBy: typeof paramsData.receivedBy !== 'undefined' ? paramsData.receivedBy : '',
        location: typeof paramsData.location !== 'undefined' ? paramsData.location : '',
        collectedBy: typeof paramsData.collectedBy !== 'undefined' ? paramsData.collectedBy : '',
        preparedBy: typeof paramsData.preparedBy !== 'undefined' ? paramsData.preparedBy : '',
        nature: typeof paramsData.nature !== 'undefined' ? paramsData.nature : '',
        statusValue: typeof paramsData.statusValue !== 'undefined' ? paramsData.statusValue : '',
        remarks: typeof paramsData.remarks !== 'undefined' ? paramsData.remarks : '',
        fallowUp: typeof paramsData.fallowUp !== 'undefined' ? paramsData.fallowUp : '',
        netFallowUpDate: typeof paramsData.netFallowUpDate !== 'undefined' ? paramsData.netFallowUpDate : '',
        fileUpload: typeof paramsData.fileUpload !== 'undefined' ? paramsData.fileUpload : '',
        status: paramsData.status === 'true'? true : false,
        id: typeof paramsData.id !== 'undefined' ? paramsData.id : '',
      });
    }

    // ------------------------------ Load data from database------------------------------ //
    api();

  }, [params.data, paramsData.name, paramsData.branch, paramsData.contactPerson, paramsData.address, paramsData.std, paramsData.phoneOne, paramsData.phoneTwo, paramsData.email, paramsData.fax, paramsData.website, paramsData.id, paramsData.status, paramsData.reciptDate, paramsData.bankRefNo, paramsData.bank, paramsData.apsNo, paramsData.report, paramsData.customerBorrower, paramsData.repNo, paramsData.profCharges, paramsData.inspectionReceipt, paramsData.outOfPocketExp, paramsData.searchExp, paramsData.flatHousePlotNo, paramsData.roofRight, paramsData.floor, paramsData.RepRefNo, paramsData.streetSectorLocal, paramsData.referBy, paramsData.city, paramsData.reportDate, paramsData.phoneNo, paramsData.reportSentThru, paramsData.reportSentOn, paramsData.receivedBy, paramsData.location, paramsData.collectedBy, paramsData.preparedBy, paramsData.nature, paramsData.statusValue, paramsData.remarks, paramsData.fallowUp, paramsData.fileUpload]);
  


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
      handledByList
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
        bankRefNo: fromElementsData.bankRefNo.value,
        bank: fromElementsData.bank.value,
        branch: fromElementsData.branch.value,
        apsNo: fromElementsData.apsNo.value,
        report: fromElementsData.report.value,
        customerBorrower: fromElementsData.customerBorrower.value,
        uid: fromElementsData.uid.value,
        repNo: '',
        profCharges: fromElementsData.profCharges.value,
        inspectionReceipt: fromElementsData.inspectionReceipt.value,
        outOfPocketExp: fromElementsData.outOfPocketExp.value,
        searchExp: fromElementsData.searchExp.value,
        flatHousePlotNo: fromElementsData.flatHousePlotNo.value,
        roofRight: fromElementsData.roofRight.value,
        floor: fromElementsData.floor.value,
        RepRefNo: fromElementsData.RepRefNo.value,
        streetSectorLocal: fromElementsData.streetSectorLocal.value,
        referBy: fromElementsData.referBy.value,
        city: fromElementsData.city.value,
        reportDate: fromElementsData.reportDate.value,
        phoneNo: fromElementsData.phoneNo.value,
        reportSentThru: fromElementsData.reportSentThru.value,
        email: fromElementsData.email.value,
        reportSentOn: fromElementsData.reportSentOn.value,
        receivedBy: fromElementsData.receivedBy.value,
        location: fromElementsData.location.value,
        collectedBy: fromElementsData.collectedBy.value,
        preparedBy: fromElementsData.preparedBy.value,
        nature: fromElementsData.nature.value,
        statusValue: fromElementsData.statusValue.value,
        remarks: fromElementsData.remarks.value,
        fallowUp: fromElementsData.fallowUp.value,
        netFallowUpDate: fromElementsData.netFallowUpDate.value,
        fileUpload: fromElementsData.fileUpload.value,
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
          await axios.post(`${JSON_CONST.DB_URL}option/update/${sendPost.id}`, sendPost)
            .then((response) => {
              console.log(response);
              setIsSubmitting(false);
              navigate(`/app/option/prepareReports`, { replace: true });
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
            await axios.post(`${JSON_CONST.DB_URL}option/create`, sendPost)
              .then((response) => {
                console.log(response);
                setIsSubmitting(false);
                navigate(`/app/option/prepareReports`, { replace: true });
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
    else if (event.target.name === 'status') {
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
    navigate(`/app/option/${url}`, { replace: true });
  };

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulating data fetching or processing delay
    const delay = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(delay);
  }, [])

  return (
    <Page title="Vetting Reports">
      {isLoading ? (
        <Loader />
      ) : (
        <Container maxWidth="xl">
          {/* <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
            <Typography variant="h4" gutterBottom>
            Vetting Reports
            </Typography>
            <Button variant="contained" color="secondary" onClick={() => redirectPage('')} startIcon={<Iconify icon="carbon:list-boxes" />}>
              Home
            </Button>
          </Stack> */}
          {/* <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
            <Button variant="outlined" color="info" onClick={() => redirectPage('prepareReports')} startIcon={<Iconify icon="akar-icons:arrow-back" />}>
              View List
            </Button>
          </Stack> */}
          <form methods="post" onSubmit={onSubmit}>
          <Card>
            <Grid container alignItems="center" paddingLeft={10} paddingBottom={10} paddingRight={10} paddingTop={5} spacing={3}>
              <Grid mt={2} mb={2} item xs={12} sm={12} md={12} lg={12}>
                <Typography variant="h4" gutterBottom>
                  Vetting Reports |
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
                  error
                  autoFocus
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
                    required
                    fullWidth
                    error 
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
                    InputLabelProps={{
                      shrink: true,
                    }}
                    required
                    error 
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
                  value={fromData.customerBorrower}
                  name="customerBorrower" 
                  label="Customer Borrower"
                  required
                  error 
                />
              </Grid>

              <Grid item xs={12} sm={12} md={3} lg={3}>
                <TextField
                  onChange={onChangeFields}
                  fullWidth
                  value={fromData.apsNo}
                  name="apsNo"  
                  label="APS No"
                />
              </Grid>

              

              <Grid item xs={12} sm={12} md={3} lg={3}>
                <TextField
                  onChange={onChangeFields}
                  fullWidth
                  value={fromData.bankRefNo}
                  name="bankRefNo" 
                  label="Our Legal Ref No"
                />
              </Grid>

              <Grid item xs={12} sm={12} md={3} lg={3}>
                <TextField
                  onChange={onChangeFields}
                  fullWidth
                  value={fromData.uid}
                  name="uid"  
                  label="Seller Name"
                  
                />
              </Grid>

              <Grid item xs={12} sm={12} md={3} lg={3}>
                <TextField
                  onChange={onChangeFields}
                  fullWidth
                  value={fromData.phoneNo}
                  name="phoneNo" 
                  label="Phone No"
                />
              </Grid>

              <Grid item xs={12} sm={12} md={3} lg={3}>
                <FormControl fullWidth>
                  <InputLabel id="searchExp-select-label">ODV Done By</InputLabel>
                  <Select
                    labelId="searchExp-select-label"
                    id="searchExp-select"
                    value={fromData.searchExp}
                    label="searchExp"
                    name="searchExp"  
                    fullWidth
                    
                    onChange={onChangeFields}
                  >
                    {fromDataAutoFill.handledByList.map((option) => (<MenuItem key={option.id} value={option.id}>{option.name}</MenuItem>))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={12} md={3} lg={3}>
                <FormControl fullWidth>
                  <InputLabel id="preparedBy-select-label">Prepared By</InputLabel>
                  <Select
                    labelId="preparedBy-select-label"
                    id="preparedBy-select"
                    value={fromData.preparedBy}
                    label="preparedBy"
                    name="preparedBy"  
                    fullWidth
                    
                    onChange={onChangeFields}
                  >
                    {fromDataAutoFill.handledByList.map((option) => (<MenuItem key={option.id} value={option.id}>{option.name}</MenuItem>))}
                  </Select>
                </FormControl>
              </Grid>
              
              
              
              <Grid item xs={12} sm={12} md={3} lg={3}>
                <FormControl fullWidth>
                  <InputLabel id="report-select-label">Report</InputLabel>
                  <Select
                    labelId="report-select-label"
                    id="report-select"
                    value={fromData.report}
                    label="report"
                    name="report"  
                    fullWidth
                    required
                    error 
                    onChange={onChangeFields}
                  >
                    {/* <MenuItem value='Leagal Report'>Leagal Report</MenuItem>
                    <MenuItem value='Vetting Report'>Vetting Report</MenuItem> */}
                    <MenuItem value='ODV'>ODV</MenuItem>
                    <MenuItem value='TSR'>Vetting</MenuItem>
                    <MenuItem value='Others'>Others</MenuItem>
                    {/* <MenuItem value='TSR'>TSR</MenuItem>
                    <MenuItem value='Opinion'>Opinion</MenuItem>
                    <MenuItem value='Project'>Project</MenuItem>
                    <MenuItem value='Certified Copy'>Certified Copy</MenuItem>
                    <MenuItem value='ROC Search'>ROC Search</MenuItem> */}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={12} md={3} lg={3}>
                <TextField
                  onChange={onChangeFields}
                  fullWidth
                  value={fromData.repNo}
                  name="repNo" 
                  label="Rep No (Autofilled)"
                  disabled
                />
              </Grid>
              
              

              

              <Grid item xs={12} sm={12} md={3} lg={3} style={{display: 'none'}}>
                <TextField
                  onChange={onChangeFields}
                  fullWidth
                  value={fromData.email}
                  name="email" 
                  label="Email"
                />
              </Grid>
              
              
              <Grid item xs={12} sm={12} md={3} lg={3} style={{display: 'none'}}>
                <TextField
                  onChange={onChangeFields}
                  fullWidth
                  value={fromData.profCharges}
                  name="profCharges" 
                  label="Prof Charges"
                />
              </Grid>
              <Grid item xs={12} sm={12} md={3} lg={3} style={{display: 'none'}}>
                <TextField
                  onChange={onChangeFields}
                  fullWidth
                  value={fromData.inspectionReceipt}
                  name="inspectionReceipt" 
                  label="Inspection Receipt"
                />
              </Grid>
              <Grid item xs={12} sm={12} md={3} lg={3} style={{display: 'none'}}>
                <TextField
                  onChange={onChangeFields}
                  fullWidth
                  value={fromData.outOfPocketExp}
                  name="outOfPocketExp" 
                  label="Out Of Pocket Exp"
                />
              </Grid>
              {/* <Grid item xs={12} sm={12} md={4} lg={4}>
                <TextField
                  onChange={onChangeFields}
                  fullWidth
                  value={fromData.searchExp}
                  name="searchExp" 
                  label="Search Exp"
                />
              </Grid> */}

              

              <Grid mt={0} mb={0} item xs={12} sm={12} md={12} lg={12}>
                <Typography variant="overline" gutterBottom>
                Property Address <Iconify icon="bi:arrow-down" />
                </Typography>
              </Grid>

              <Grid item xs={12} sm={12} md={3} lg={3}>
                <TextField
                  onChange={onChangeFields}
                  fullWidth
                  value={fromData.flatHousePlotNo}
                  name="flatHousePlotNo" 
                  label="Flat/House/Plot No"
                />
              </Grid>

              <Grid item xs={12} sm={12} md={3} lg={3}>
                <TextField
                  onChange={onChangeFields}
                  fullWidth
                  value={fromData.floor}
                  name="floor" 
                  label="Floor"
                />
              </Grid>

              <Grid item xs={12} sm={12} md={3} lg={3}>
                <TextField
                  onChange={onChangeFields}
                  fullWidth
                  value={fromData.streetSectorLocal}
                  name="streetSectorLocal" 
                  label="Street/Sector/Locality"
                />
              </Grid>

              <Grid item xs={12} sm={12} md={3} lg={3}>
                <TextField
                  onChange={onChangeFields}
                  fullWidth
                  value={fromData.city}
                  name="city" 
                  label="City"
                />
              </Grid>


              <Grid item xs={12} sm={12} md={3} lg={3}>
                <FormControl fullWidth>
                  <InputLabel id="roofRight-select-label">Roof Right</InputLabel>
                  <Select
                    labelId="roofRight-select-label"
                    id="roofRight-select"
                    value={fromData.roofRight}
                    label="roofRight"
                    name="roofRight"  
                    fullWidth
                    onChange={onChangeFields}
                  >
                    <MenuItem value='With Roof Right'>With Roof Right</MenuItem>
                    <MenuItem value='Without Roof Right'>Without Roof Right</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              

              <Grid item xs={12} sm={12} md={3} lg={3} style={{display: 'none'}}>
                <TextField
                  onChange={onChangeFields}
                  fullWidth
                  value={fromData.referBy}
                  name="referBy" 
                  label="ReferBy"
                />
              </Grid>

              <Grid item xs={12} sm={12} md={3} lg={3}>
                <TextField
                  onChange={onChangeFields}
                  fullWidth
                  value={fromData.reportDate}
                  name="reportDate" 
                  label="Report Date"
                  type="date"
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>

              
              <Grid item xs={12} sm={12} md={3} lg={3} style={{display: 'none'}}>
                <TextField
                  onChange={onChangeFields}
                  fullWidth
                  value={fromData.RepRefNo}
                  name="RepRefNo" 
                  label="Rep Ref No"
                />
              </Grid>

              <Grid item xs={12} sm={12} md={3} lg={3}>
                <TextField
                  onChange={onChangeFields}
                  fullWidth
                  value={fromData.reportSentOn}
                  name="reportSentOn" 
                  label="Report Sent On"
                  type="date"
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>

              <Grid item xs={12} sm={12} md={3} lg={3} style={{display: 'none'}}>
                <TextField
                  onChange={onChangeFields}
                  fullWidth
                  value={fromData.receivedBy}
                  name="receivedBy" 
                  label="Received By"
                />
              </Grid>

              <Grid item xs={12} sm={12} md={3} lg={3} style={{display: 'none'}}>
                <FormControl fullWidth>
                  <InputLabel id="collectedBy-select-label">Collected By</InputLabel>
                  <Select
                    labelId="collectedBy-select-label"
                    id="collectedBy-select"
                    value={fromData.collectedBy}
                    label="collectedBy"
                    name="collectedBy"  
                    fullWidth
                    
                    onChange={onChangeFields}
                  >
                    {fromDataAutoFill.handledByList.map((option) => (<MenuItem key={option.id} value={option.id}>{option.name}</MenuItem>))}
                  </Select>
                </FormControl>
              </Grid>
              
              
              
              

              <Grid item xs={12} sm={12} md={3} lg={3} style={{display: 'none'}}>
                <FormControl fullWidth>
                  <InputLabel id="reportSentThru-select-label">Report Sent Through</InputLabel>
                  <Select
                    labelId="reportSentThru-select-label"
                    id="reportSentThru-select"
                    value={fromData.reportSentThru}
                    label="reportSentThru"
                    name="reportSentThru"  
                    fullWidth
                    
                    onChange={onChangeFields}
                  >
                    {fromDataAutoFill.handledByList.map((option) => (<MenuItem key={option.id} value={option.id}>{option.name}</MenuItem>))}
                  </Select>
                </FormControl>
              </Grid>


              <Grid item xs={12} sm={12} md={3} lg={3} style={{display: 'none'}}>
                <FormControl fullWidth>
                  <InputLabel id="nature-select-label">Nature</InputLabel>
                  <Select
                    labelId="nature-select-label"
                    id="nature-select"
                    value={fromData.nature}
                    label="nature"
                    name="nature"  
                    fullWidth
                    error 
                    onChange={onChangeFields}
                  >
                    <MenuItem value='Purchase'>Purchase</MenuItem>
                    <MenuItem value='BT'>BT</MenuItem>
                    <MenuItem value='Non BT'>Non BT</MenuItem>
                    <MenuItem value='LAP'>LAP</MenuItem>
                    <MenuItem value='Re-Finance'>Re-Finance</MenuItem>
                    <MenuItem value='Collateral'>Collateral</MenuItem>
                    <MenuItem value='Lease'>Lease</MenuItem>
                    <MenuItem value='Online'>Online</MenuItem>
                  </Select>
                </FormControl>
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

              

              
              
              

              <Grid item xs={12} sm={12} md={3} lg={3} style={{display: 'none'}}>
                <FormControl fullWidth>
                  <InputLabel id="location-select-label">Location</InputLabel>
                  <Select
                    labelId="location-select-label"
                    id="location-select"
                    value={fromData.location}
                    label="location"
                    name="location"  
                    fullWidth
                    onChange={onChangeFields}
                  >
                    <MenuItem value='Delhi'>Delhi</MenuItem>
                    <MenuItem value='Delhi-NC'>Delhi-NC</MenuItem>
                    <MenuItem value='NCR'>NCR</MenuItem>
                    <MenuItem value='Bahadurgarh'>Bahadurgarh</MenuItem>
                    <MenuItem value='Sohna'>Sohna</MenuItem>
                    <MenuItem value='Faridabad'>Faridabad</MenuItem>
                    <MenuItem value='Gurgaon'>Gurgaon</MenuItem>
                    <MenuItem value='Dadri'>Dadri</MenuItem>
                    <MenuItem value='Noida'>Noida</MenuItem>
                    <MenuItem value='Greater Noida'>Greater Noida</MenuItem>
                    <MenuItem value='Others'>Others</MenuItem>
                  </Select>
                </FormControl>
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
                  
                />
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12} style={{display: 'none'}}>
                <TextField
                  onChange={onChangeFields}
                  fullWidth
                  value={fromData.fallowUp}
                  name="fallowUp" 
                  label="Fallow UP"
                  multiline
                  rows={2}  
                  
                />
              </Grid>

              <Grid item xs={12} sm={12} md={3} lg={3} style={{display: 'none'}}>
                <TextField
                  onChange={onChangeFields}
                  fullWidth
                  value={fromData.netFallowUpDate}
                  name="netFallowUpDate" 
                  label="Next Fallow Up Date"
                  type="date"
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>

              <Grid item xs={12} sm={12} md={6} lg={6} style={{display: 'none'}}>
                <TextField
                  onChange={onChangeFields}
                  fullWidth
                  value={fromData.fileUpload}
                  name="fileUpload" 
                  label="file Upload"
                  type="file"
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
                  label="Status"
                />
              </Grid>

              <Grid mt={2} item xs={12} sm={12} md={12} lg={12}>
                <Typography variant="caption" gutterBottom>
                  * Red Marked Fields are required <br />
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
