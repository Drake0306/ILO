/* eslint-disable no-unneeded-ternary */
/* eslint-disable no-unused-vars */
import * as Yup from 'yup';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { faker } from '@faker-js/faker';
// @mui
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography, Link, Stack, Button, Card, TextField, Checkbox, FormControlLabel, Autocomplete, Radio, RadioGroup, FormControl, FormLabel } from '@mui/material';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { LoadingButton } from '@mui/lab';

// components
import { FormProvider, RHFTextField, RHFCheckbox } from '../../../components/hook-form';
import Page from '../../../components/Page';
import Iconify from '../../../components/Iconify';
import PDFRenderDsaList from './PDFRenderDsaList';
// ----------------------------------------------------------------------

export default function DsaList(props) {

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

  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    // Update the document title using the browser API
    setParamsData(JSON.parse(params.data));
    if (params.data !== '0') {
      setFromData({ 
        name: typeof paramsData.name !== 'undefined' ? paramsData.name : '',
        bankName: typeof paramsData.bankName !== 'undefined' ? paramsData.bankName : [],
        address: typeof paramsData.address !== 'undefined' ? paramsData.address : '',
        path: typeof paramsData.path !== 'undefined' ? paramsData.path : '',
        status: typeof paramsData.status !== 'undefined' ? paramsData.status : true,
        id: typeof paramsData.id !== 'undefined' ? paramsData.id : '',
      });
    }
  }, [params.data, 
      paramsData.name, 
      paramsData.bankName, 
      paramsData.address, 
      paramsData.path, 
      paramsData.id,
      paramsData.status,
    ]);
  

  const onSubmit = async (event) => {
    event.preventDefault()
    const fromElementsData = event.target.elements
    const sendPost = {
      name: fromElementsData.name.value,
      id: fromData.id,
    }
    
    try {
      console.log(fromData)
      setIsSubmitting(true);
    }
    catch (err) {
      console.log(err)
    }
  };
  
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
    navigate(`/app/reportOpinion/${url}`, { replace: true });
  };

  return (
    // <Page title="Case By Remarks Wise">
    //   Generate PDF
    // </Page>
    <PDFRenderDsaList />
  );
}
