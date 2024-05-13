import { useEffect, useState } from 'react';
import { faker } from '@faker-js/faker';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

// @mui
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography } from '@mui/material';
// components
import axios from 'axios';
import moment from 'moment';
import Page from '../components/Page';
import Iconify from '../components/Iconify';
import JSON_CONST from '../components/CONSTVALUE.json';
import Loader from './Loader/Loader';

// sections
import {
  AppTasks,
  AppNewsUpdate,
  AppOrderTimeline,
  AppCurrentVisits,
  AppWebsiteVisits,
  AppTrafficBySite,
  AppWidgetSummary,
  AppCurrentSubject,
  AppConversionRates,
} from '../sections/@dashboard/app';


// ----------------------------------------------------------------------

export default function DashboardApp() {
  const navigate = useNavigate()
  const theme = useTheme();
  const [ BP, setBP] = useState(0);
  const [ OP, setOP] = useState(0);
  const [ R, setR] = useState(0);
  const [ BT, setBT] = useState(0);
  const [ AL, setAL] = useState(0);
  const [ DOP, setDOP] = useState(0);
  const [ DATEArray, setDATEArray] = useState([]);


  // Loader
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Initialize count of responses received
    let responsesReceived = 0;

    const handleResponse = () => {
        // eslint-disable-next-line no-plusplus
        responsesReceived++;
        // Check if all responses have been received
        if (responsesReceived === 6) {
            // All responses received, set isLoading to false
            setIsLoading(false);
        }
    };

    // BP
    axios.get(`${JSON_CONST.DB_URL}builderPayment/list`)
     .then((response) => {
      setBP(response.data.length)
      handleResponse();
     })
     .catch((error) => {
       console.log(error);
       handleResponse(); // Handle error as a response received
     });
    
     // OP
     axios.get(`${JSON_CONST.DB_URL}option/list`)
      .then((response) => {
        setOP(response.data.length)
        handleResponse();
      })
      .catch((error) => {
        console.log(error);
        handleResponse(); // Handle error as a response received
      });
     // R
     axios.get(`${JSON_CONST.DB_URL}disbursal/registration/list`)
      .then((response) => {
        setR(response.data.length)
        handleResponse();
      })
      .catch((error) => {
        console.log(error);
        handleResponse(); // Handle error as a response received
      });
     // BT
     axios.get(`${JSON_CONST.DB_URL}disbursal/BT/list`)
      .then((response) => {
        setBT(response.data.length)
        handleResponse();
      })
      .catch((error) => {
        console.log(error);
        handleResponse(); // Handle error as a response received
      });
     
      // AL
     axios.get(`${JSON_CONST.DB_URL}authorityLetters/registration/list`)
      .then((response) => {
        setAL(response.data.length)
        handleResponse();
      })
      .catch((error) => {
        console.log(error);
        handleResponse(); // Handle error as a response received
      });
     
      // DOP
     axios.get(`${JSON_CONST.DB_URL}depositOfPayment/registration/list`)
      .then((response) => {
        setDOP(response.data.length)
        handleResponse();
      })
      .catch((error) => {
        console.log(error);
        handleResponse(); // Handle error as a response received
      });

      getLastmonthsDate();
 
 }, []);

 const getLastmonthsDate = () => {
   const data = [];
   data.push(moment().format('MM/01/YYYY')); // Current Month
   // eslint-disable-next-line no-plusplus
    for(let i=1; i<=5; i++) {
      const DATE = moment().subtract(i, 'months').format('MM/01/YYYY')
      data.push(DATE);
    }
    setDATEArray(data);
 }

 const redirectPage = async (url) => {
    navigate(`${url}`, { replace: true });
}

  return (
    <Page title="Dashboard">
      {isLoading ? (
        <Loader />
      ) : (
      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Hi, Welcome - Loan Information System (ILO)
        </Typography>

        <Grid container spacing={6}>
          {/* <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Builder Payment" total={BP} icon={'fluent:payment-28-filled'} />
          </Grid> */}

          <Grid className='zoom' item xs={12} sm={6} md={4}>
            <AppWidgetSummary onClick={() => redirectPage('/app/option/prepareReports')} title="Option" total={OP} color="info" icon={'fluent:payment-28-regular'} />
          </Grid>

          <Grid className='zoom' item xs={12} sm={6} md={4}>
            <AppWidgetSummary onClick={() => redirectPage('/app/disbursal/registration/list/')} title="Registration" total={R} color="warning" icon={'mdi:payment-on-delivery'} />
          </Grid>

          <Grid className='zoom' item xs={12} sm={6} md={4}>
            <AppWidgetSummary onClick={() => redirectPage('/app/disbursal/bt/list/')} title="BT" total={BT} color="error" icon={'mdi:account-payment-outline'} />
          </Grid>

          <Grid className='zoom' item xs={12} sm={6} md={4}>
            <AppWidgetSummary onClick={() => redirectPage('/app/format/AuthorityLetters/list')} title="Authority Letters" total={AL} color="warning" icon={'mdi:payment-on-delivery'} />
          </Grid>

          <Grid className='zoom' item xs={12} sm={6} md={4}>
            <AppWidgetSummary onClick={() => redirectPage('/app/disbursal/DepositOfPayment/list/')} title="Deposit Of Payment" total={DOP} color="error" icon={'mdi:account-payment-outline'} />
          </Grid>

          {/* <Grid item xs={12} md={6} lg={8}>
            <AppWebsiteVisits
              title="Monthly Data"
              subheader=""
              chartLabels={DATEArray}
              chartData={[
                {
                  name: 'Builder Payment',
                  type: 'column',
                  fill: 'solid',
                  // data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30],
                  data: [0],
                },
                {
                  name: 'BT',
                  type: 'area',
                  fill: 'gradient',
                  data: [0],
                },
                {
                  name: 'Option',
                  type: 'area',
                  fill: 'gradient',
                  data: [0],
                },
                {
                  name: 'Registration',
                  type: 'line',
                  fill: 'solid',
                  data: [0],
                },
              ]}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppCurrentVisits
              title="Total Count"
              chartData={[
                { label: 'Builder Payment', value: BP },
                { label: 'Option', value: OP },
                { label: 'Registration', value: R },
                { label: 'BT', value: BT },
              ]}
              chartColors={[
                theme.palette.primary.main,
                theme.palette.chart.blue[0],
                theme.palette.chart.violet[0],
                theme.palette.chart.yellow[0],
              ]}
            />
          </Grid> */}

          {/* <Grid item xs={12} md={6} lg={8}>
            <AppConversionRates
              title="Conversion Rates"
              subheader="(+43%) than last year"
              chartData={[
                { label: 'Italy', value: 400 },
                { label: 'Japan', value: 430 },
                { label: 'China', value: 448 },
                { label: 'Canada', value: 470 },
                { label: 'France', value: 540 },
                { label: 'Germany', value: 580 },
                { label: 'South Korea', value: 690 },
                { label: 'Netherlands', value: 1100 },
                { label: 'United States', value: 1200 },
                { label: 'United Kingdom', value: 1380 },
              ]}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppCurrentSubject
              title="Current Subject"
              chartLabels={['English', 'History', 'Physics', 'Geography', 'Chinese', 'Math']}
              chartData={[
                { name: 'Series 1', data: [80, 50, 30, 40, 100, 20] },
                { name: 'Series 2', data: [20, 30, 40, 80, 20, 80] },
                { name: 'Series 3', data: [44, 76, 78, 13, 43, 10] },
              ]}
              chartColors={[...Array(6)].map(() => theme.palette.text.secondary)}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppNewsUpdate
              title="News Update"
              list={[...Array(5)].map((_, index) => ({
                id: faker.datatype.uuid(),
                title: faker.name.jobTitle(),
                description: faker.name.jobTitle(),
                image: `/static/mock-images/covers/cover_${index + 1}.jpg`,
                postedAt: faker.date.recent(),
              }))}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppOrderTimeline
              title="Order Timeline"
              list={[...Array(5)].map((_, index) => ({
                id: faker.datatype.uuid(),
                title: [
                  '1983, orders, $4220',
                  '12 Invoices have been paid',
                  'Order #37745 from September',
                  'New order placed #XF-2356',
                  'New order placed #XF-2346',
                ][index],
                type: `order${index + 1}`,
                time: faker.date.past(),
              }))}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppTrafficBySite
              title="Traffic by Site"
              list={[
                {
                  name: 'FaceBook',
                  value: 323234,
                  icon: <Iconify icon={'eva:facebook-fill'} color="#1877F2" width={32} height={32} />,
                },
                {
                  name: 'Google',
                  value: 341212,
                  icon: <Iconify icon={'eva:google-fill'} color="#DF3E30" width={32} height={32} />,
                },
                {
                  name: 'Linkedin',
                  value: 411213,
                  icon: <Iconify icon={'eva:linkedin-fill'} color="#006097" width={32} height={32} />,
                },
                {
                  name: 'Twitter',
                  value: 443232,
                  icon: <Iconify icon={'eva:twitter-fill'} color="#1C9CEA" width={32} height={32} />,
                },
              ]}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppTasks
              title="Tasks"
              list={[
                { id: '1', label: 'Create FireStone Logo' },
                { id: '2', label: 'Add SCSS and JS files if required' },
                { id: '3', label: 'Stakeholder Meeting' },
                { id: '4', label: 'Scoping & Estimations' },
                { id: '5', label: 'Sprint Showcase' },
              ]}
            />
          </Grid> */}

        </Grid>
      </Container>
      )}
    </Page>
  );
}
