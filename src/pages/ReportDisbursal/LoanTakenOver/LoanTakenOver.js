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

export default function LoanTakenOver(props) {

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
    // const fromElementsData = event.target.elements
    // const sendPost = {
    //   name: fromElementsData.name.value,
    //   id: fromData.id,
    // }
    
    // try {
    //   console.log(fromData)
    //   setIsSubmitting(true);
    // }
    // catch (err) {
    //   console.log(err)
    // }

    navigate(`/app/reportDisbursal/loanTakenOver/PDFRenderLoanTakenOver/${0}`, { replace: true,  });

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
    navigate(`/app/reportBuilderPay/${url}`, { replace: true });
  };

  return (
    <Page title="Loan Taken Over">
      <Container maxWidth="xl">
        {/* <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
          Loan Taken Over
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
            
            {/* <Grid mt={2} mb={2} item xs={12} sm={12} md={12} lg={12}>
              <Typography variant="overline" gutterBottom>
               Select The Date Criteria<Iconify icon="bi:arrow-down" />
              </Typography>
            </Grid> */}
            <Grid mt={2} mb={0} item xs={12} sm={12} md={12} lg={12}>
              <Typography variant="h4" gutterBottom>
              Loan Taken Over |
                <Typography ml={1} variant="overline" gutterBottom>
                  Search <Iconify icon="bi:arrow-down" />
                </Typography>
              </Typography>
              
            </Grid>
            
            <Grid item xs={12} sm={12} md={4} lg={4}>
              <FormControl fullWidth>
                <InputLabel id="loanTakenOver-select-label">Loan Taken Over</InputLabel>
                <Select
                  labelId="loanTakenOver-select-label"
                  id="loanTakenOver-select"
                  value={fromData.loanTakenOver}
                  label="loanTakenOver"
                  name="loanTakenOver"  
                  fullWidth
                  onChange={onChangeFields}
                >
                  <MenuItem value=''>Select</MenuItem>
                </Select>
              </FormControl>
              
            </Grid>

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
