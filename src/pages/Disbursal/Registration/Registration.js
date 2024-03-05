/* eslint-disable no-unneeded-ternary */
/* eslint-disable no-unused-vars */
import * as Yup from 'yup';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { faker } from '@faker-js/faker';
// @mui
import { useTheme } from '@mui/material/styles';
import {
  Grid,
  Container,
  Typography,
  Link,
  Stack,
  Button,
  Card,
  TextField,
  Checkbox,
  FormControlLabel,
  Autocomplete,
  InputLabel,
  MenuItem,
  FormControl,
} from '@mui/material';
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

export default function Registration(props) {
  const navigate = useNavigate();
  const params = useParams();
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
    phoneMobile: '',
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
    caseCloseVal: '',
    remarks: '',
    otherRemarkIfAny: '',
    checqueDate: '',
    amount: '',
    chequeRecivedDate: '',
    ackRecived: '',
    nextDate: '',
    ack: '',
    volNo: '',
    slNo: '',
    id: '',
    statusValue: 'Pending',
    status: true,
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
      paramsData.bankName = paramsData?.bankName?.id;
      paramsData.branchName = paramsData?.branchName?.id;
      paramsData.transNo = paramsData?.id;
      setFromData(paramsData);
    }
  }, [params.data, paramsData]);

  useEffect(() => {
    setParamsData(JSON.parse(localStorage.getItem('editValue')));

    const api = async () => {
      let bankList = [];
      let branchList = [];
      let userList = [];
      let dsaList = [];
      let regOffList = [];
      let handlledByList = [];
      let remarksList = [];

      await axios.get(`${JSON_CONST.DB_URL}master/bank/list`).then((response) => {
        bankList = arrageList(response);
      });

      await axios.get(`${JSON_CONST.DB_URL}master/branch/list`).then((response) => {
        branchList = arrageList(response);
      });

      await axios.get(`${JSON_CONST.DB_URL}auth/userList`).then((response) => {
        console.log(response);
        userList = arrageList(response);
      });

      await axios.get(`${JSON_CONST.DB_URL}master/DSA/list`).then((response) => {
        dsaList = arrageList(response);
      });

      await axios.get(`${JSON_CONST.DB_URL}master/registrarOffice/list`).then((response) => {
        regOffList = arrageList(response);
      });

      await axios.get(`${JSON_CONST.DB_URL}master/handledBy/list`).then((response) => {
        handlledByList = arrageList(response);
      });

      await axios.get(`${JSON_CONST.DB_URL}master/differentRemarks/list`).then((response) => {
        remarksList = arrageList(response);
      });

      setFromDataAutoFill({
        bankList,
        branchList,
        userList,
        dsaList,
        regOffList,
        handlledByList,
        remarksList,
      });

      setRefBranch(branchList);
    };

    const arrageList = (response) => {
      const list = [];
      response.data.forEach((row) => {
        if (row.status === 'true') {
          list.push(row);
        }
      });

      return list;
    };

    api();
  }, []);

  const onSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    const fromElementsData = event.target.elements;
    const sendPost = {
      bankName: fromElementsData.bankName.value,
      branchName: fromElementsData.branchName.value,
      registrationDate: fromElementsData.registrationDate.value,
      transNo: fromData.id,
      address: fromElementsData.address.value,
      dsa: fromElementsData.dsa.value,
      phone: fromElementsData.phone.value,
      seller: fromElementsData.seller.value,
      phoneMobile: fromElementsData.phoneMobile.value,
      registrarOff: fromElementsData.registrarOff.value,
      purchaser: fromElementsData.purchaser.value,
      uid: fromElementsData.uid.value,
      reciptNo: fromElementsData.reciptNo.value,
      rdSentOn: fromElementsData.rdSentOn.value,
      sdSentOn: fromElementsData.sdSentOn.value,
      tdSentOn: fromElementsData.tdSentOn.value,
      sentAt: fromElementsData.sentAt.value,
      caseClosed: fromElementsData.caseClosed.value,
      courierDate: moment().format('YYYY-DD-MM'),
      propertyDetails: fromElementsData.propertyDetails.value,
      deedWriterAdv: fromElementsData.deedWriterAdv.value,
      handledBy: fromElementsData.handledBy.value,
      applicationNo: fromElementsData.applicationNo.value,
      pageNo: fromElementsData.pageNo.value,
      remarks: fromElementsData.remarks.value,
      otherRemarkIfAny: fromElementsData.otherRemarkIfAny.value,
      checqueDate: fromElementsData.checqueDate.value,
      caseCloseVal: fromElementsData.caseCloseVal.value,
      amount: fromElementsData.amount.value,
      chequeRecivedDate: fromElementsData.chequeRecivedDate.value,
      chequeReturnDate: fromElementsData.chequeReturnDate.value,
      nextDate: fromElementsData.nextDate.value,
      ackRecived: fromElementsData.ackRecived.value,
      ack: fromElementsData.ack.value,
      volNo: fromElementsData.volNo.value,
      slNo: fromElementsData.slNo.value,
      statusValue: fromElementsData.statusValue.value,
      status: fromElementsData.status.value,
      id: fromData.id,
    };

    console.log(sendPost);

    const config = {
      headers: {
        'content-type': 'multipart/form-data',
      },
    };
    if (params.data !== '0') {
      try {
        await axios
          .post(`${JSON_CONST.DB_URL}disbursal/registration/update/${sendPost.id}`, sendPost)
          .then((response) => {
            console.log(response);
            setIsSubmitting(false);
            navigate(`/app/disbursal/registration/list/`, { replace: true });
          })
          .catch((error) => {
            setIsSubmitting(false);
            console.log(error);
          });
      } catch (err) {
        console.log(err);
      }
    } else {
      try {
        await axios
          .post(`${JSON_CONST.DB_URL}disbursal/registration/create`, sendPost)
          .then((response) => {
            console.log(response);
            setIsSubmitting(false);
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
              ackRecived: '',
              chequeReturnDate: '',
              nextDate: '',
              ack: '',
              volNo: '',
              slNo: '',
              statusValue: 'Pending',
              status: true,
              id: '',
            });
            navigate(`/app/disbursal/registration/list/`, { replace: true });
          })
          .catch((error) => {
            setIsSubmitting(false);
            console.log(error);
          });
      } catch (err) {
        console.log(err);
      }
    }
  };

  const onChangeFields = async (event) => {
    if (event.target.name === 'bankName') {
      setFromData({
        ...fromData,
        [event.target.name]: event.target.value,
      });

      const branchList = [];
      refBranch.forEach((values, keys) => {
        if (values.bankName.id === event.target.value) {
          branchList.push(values);
        }
      });

      setFromDataAutoFill({ ...fromDataAutoFill, branchList });
    } else if (event.target.name === 'status') {
      setFromData({
        ...fromData,
        [event.target.name]: !fromData.status,
      });
    } else {
      setFromData({
        ...fromData,
        [event.target.name]: event.target.value,
      });
    }
  };

  const redirectPage = async (url) => {
    navigate(`/app/disbursal/${url}`, { replace: true });
  };

  // Loader
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulating data fetching or processing delay
    const delay = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(delay);
  }, []);

  return (
    <Page title="Registration">
      {isLoading ? (
        <Loader />
      ) : (
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
              <Grid
                container
                alignItems="center"
                paddingLeft={10}
                paddingBottom={10}
                paddingRight={10}
                paddingTop={5}
                spacing={3}
              >
                <Grid mt={2} mb={0} item xs={12} sm={12} md={12} lg={12}>
                  <Typography variant="h4" gutterBottom>
                    Registration |
                    <Typography ml={1} variant="overline" gutterBottom>
                      Details <Iconify icon="bi:arrow-down" />
                    </Typography>
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={12} md={3} lg={3}>
                  <TextField
                    onChange={onChangeFields}
                    fullWidth
                    value={fromData.registrationDate}
                    name="registrationDate"
                    label="Registration Date"
                    required
                    error
                    type="date"
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
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
                      error
                    >
                      {fromDataAutoFill.bankList.map((option) => (
                        <MenuItem key={option.id} value={option.id}>
                          {option.name}
                        </MenuItem>
                      ))}
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
                      error
                      onChange={onChangeFields}
                    >
                      {fromDataAutoFill.branchList.map((option) => (
                        <MenuItem key={option.id} value={option.id}>
                          {option.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={12} md={2} lg={2}>
                  <TextField
                    onChange={onChangeFields}
                    fullWidth
                    value={fromData.applicationNo}
                    name="applicationNo"
                    label="Application No"
                  />
                </Grid>

                {/* <Grid container item xs={12} sm={12} md={6}lg={6} alignItems="center" paddingLeft={10} paddingBottom={0} paddingRight={0} paddingTop={0} spacing={3}>
                  

              </Grid> */}

                


                <Grid item mt={0} xs={12} sm={12} md={3} lg={3}>
                  <TextField onChange={onChangeFields} fullWidth value={fromData.seller} name="seller" label="Seller" />
                </Grid>

                <Grid item mt={0} xs={12} sm={12} md={3} lg={3}>
                  <TextField onChange={onChangeFields} fullWidth value={fromData.phone} name="phone" label="Phone" />
                </Grid>

                <Grid item xs={12} sm={12} md={3} lg={3}>
                  <TextField
                    onChange={onChangeFields}
                    fullWidth
                    value={fromData.purchaser}
                    name="purchaser"
                    label="Purchaser"
                    required
                    error
                  />
                </Grid>

                <Grid item mt={0} xs={12} sm={12} md={3} lg={3}>
                  <TextField onChange={onChangeFields} fullWidth value={fromData.phoneMobile} name="phoneMobile" label="Phone" />
                </Grid>

                <Grid item xs={12} sm={12} md={12} lg={12}>
                  <TextField
                    onChange={onChangeFields}
                    fullWidth
                    value={fromData.propertyDetails}
                    name="propertyDetails"
                    label="Property Details"
                    multiline
                    rows={4}
                  />
                </Grid>
                

                <Grid item mt={0} xs={12} sm={12} md={3} lg={3}>
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
                      {fromDataAutoFill.regOffList.map((option) => (
                        <MenuItem key={option.id} value={option.id}>
                          {option.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={12} md={2} lg={2}>
                  <TextField
                    onChange={onChangeFields}
                    fullWidth
                    value={fromData.deedWriterAdv}
                    name="deedWriterAdv"
                    label="Deed Writer/Adv"
                  />
                </Grid>

                <Grid item xs={12} sm={12} md={7} lg={7}>
                  <TextField
                    onChange={onChangeFields}
                    fullWidth
                    value={fromData.address}
                    name="address"
                    label="Builder office"
                    multiline
                    rows={2}
                  />
                </Grid>

                <Grid item xs={12} sm={12} md={2} lg={2}>
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
                      {fromDataAutoFill.handlledByList.map((option) => (
                        <MenuItem key={option.id} value={option.id}>
                          {option.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={12} md={2} lg={2}>
                  <TextField
                    onChange={onChangeFields}
                    fullWidth
                    value={fromData.transNo}
                    name="transNo"
                    label="Trans No"
                    disabled
                  />
                </Grid>

                <Grid item xs={12} sm={12} md={3} lg={3}>
                  <TextField
                    onChange={onChangeFields}
                    fullWidth
                    value={fromData.rdSentOn}
                    name="rdSentOn"
                    label="R.D. Sent on"
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
                    value={fromData.sentAt}
                    name="sentAt"
                    label="Sent At"
                  />
                </Grid>

                <Grid item xs={12} sm={12} md={3} lg={3}>
                  <FormControl fullWidth>
                    <InputLabel id="caseCloseVal-select-label">Case Close</InputLabel>
                    <Select
                      labelId="caseCloseVal-select-label"
                      id="caseCloseVal-select"
                      value={fromData.caseCloseVal}
                      label="caseCloseVal"
                      name="caseCloseVal"
                      fullWidth
                      onChange={onChangeFields}
                    >
                        <MenuItem value="YES">YES</MenuItem>
                        <MenuItem value="NO">NO</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={12} md={2} lg={2}>
                  <TextField
                    onChange={onChangeFields}
                    fullWidth
                    value={fromData.caseClosed}
                    name="caseClosed"
                    label="Case Closed Date"
                    type="date"
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>

                <Grid item xs={12} sm={12} md={2} lg={2}>
                  <FormControl fullWidth>
                    <InputLabel id="handledBy-select-label">Acknowledgement </InputLabel>
                    <Select
                      labelId="handledBy-select-label"
                      id="handledBy-select"
                      value={fromData.ackRecived}
                      label="ackRecived"
                      name="ackRecived"
                      fullWidth
                      onChange={onChangeFields}
                    >
                      <MenuItem value="YES">YES</MenuItem>
                      <MenuItem value="NO">NO</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={12} md={2} lg={2}>
                  <TextField
                    onChange={onChangeFields}
                    fullWidth
                    value={fromData.volNo}
                    name="volNo"
                    label="Volume No"
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={3} lg={3}>
                  <TextField onChange={onChangeFields} fullWidth value={fromData.slNo} name="slNo" label="Sl No" />
                </Grid>
                

                <Grid item xs={12} sm={12} md={3} lg={3} style={{display: 'none'}}>
                  <TextField onChange={onChangeFields} fullWidth value={fromData.uid} name="uid" label="UID No" />
                </Grid>

                <Grid item xs={12} sm={12} md={3} lg={3} style={{display: 'none'}}>
                  <TextField
                    onChange={onChangeFields}
                    fullWidth
                    value={fromData.reciptNo}
                    name="reciptNo"
                    label="Recipt No"
                  />
                </Grid>

                {/* <Grid container item xs={12} sm={12} md={6}lg={6} alignItems="center" paddingLeft={10} paddingBottom={0} paddingRight={0} paddingTop={0} spacing={3}>
                
              </Grid> */}

                <Grid item mt={0} xs={12} sm={12} md={3} lg={3} style={{display: 'none'}}>
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
                      error
                    >
                      {fromDataAutoFill.dsaList.map((option) => (
                        <MenuItem key={option.id} value={option.id}>
                          {option.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>

                

                

                {/* <Grid mt={0} mb={0} item xs={12} sm={12} md={12} lg={12}>
                <Typography variant="overline" gutterBottom>
                <Iconify icon="bi:arrow-down" />
                </Typography>
              </Grid> */}

                
                

                
                {/* <Grid item xs={12} sm={12} md={3} lg={3}>
                <TextField
                  onChange={onChangeFields}
                  fullWidth
                  value={fromData.courierDate}
                  name="courierDate" 
                  label="Courier Date"
                  
                  type="date"
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid> */}

                {/* <Grid mt={0} mb={0} item xs={12} sm={12} md={12} lg={12}>
                <Typography variant="overline" gutterBottom>
                <Iconify icon="bi:arrow-down" />
                </Typography>
              </Grid> */}

                

                {/* <Grid container item xs={12} sm={12} md={6}lg={6} alignItems="center" paddingLeft={10} paddingBottom={0} paddingRight={0} paddingTop={0} spacing={3}>
                  
              </Grid> */}

                <Grid item xs={12} sm={12} md={2} lg={2} style={{display: 'none'}}>
                  <TextField
                    onChange={onChangeFields}
                    fullWidth
                    value={fromData.tdSentOn}
                    name="tdSentOn"
                    label="T.D. Sent on"
                    type="date"
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>

                

                

                

                <Grid item xs={12} sm={12} md={2} lg={2} style={{display: 'none'}}>
                  <TextField
                    onChange={onChangeFields}
                    fullWidth
                    value={fromData.pageNo}
                    name="pageNo"
                    label="Page No"
                  />
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
                      required
                      error
                      onChange={onChangeFields}
                    >
                      {fromDataAutoFill.remarksList.map((option) => (
                        <MenuItem key={option.id} value={option.id}>
                          {option.name}
                        </MenuItem>
                      ))}
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

                {/* <Grid mt={0} mb={0} item xs={12} sm={12} md={12} lg={12}>
                <Typography variant="overline" gutterBottom>
                Cheque Details<Iconify icon="bi:arrow-down" />
                </Typography>
              </Grid> */}

                <Grid item xs={12} sm={12} md={3} lg={3}>
                  <TextField
                    onChange={onChangeFields}
                    fullWidth
                    value={fromData.checqueDate}
                    name="checqueDate"
                    label="Checque Date"
                    type="date"
                    style={{ display: 'none' }}
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
                    style={{ display: 'none' }}
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
                    style={{ display: 'none' }}
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
                    style={{ display: 'none' }}
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
                    value={fromData.ack}
                    name="ack"
                    label="Acknowledgement "
                  />
                </Grid>
                
                

                <Grid item xs={12} sm={12} md={3} lg={3}>
                  <TextField
                    onChange={onChangeFields}
                    fullWidth
                    value={fromData.nextDate}
                    name="nextDate"
                    label="Next Follow Up Date"
                    type="date"
                    InputLabelProps={{
                      shrink: true,
                    }}
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
                      <MenuItem value="Pending">Pending</MenuItem>
                      <MenuItem value="Positive">Positive</MenuItem>
                      <MenuItem value="Negative">Negative</MenuItem>
                      <MenuItem value="Returned">Returned</MenuItem>
                      <MenuItem value="Hold">Hold</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                

                <Grid item xs={12} sm={1} md={1} lg={1}>
                  <LoadingButton
                    fullWidth
                    size="large"
                    type="submit"
                    variant="outlined"
                    color="info"
                    loading={isSubmitting}
                  >
                    Save
                  </LoadingButton>
                </Grid>

                <Grid item xs={12} sm={12} md={12} lg={12} style={{ display: 'none' }}>
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
                    * To go back to page click on view list
                    <br />
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
