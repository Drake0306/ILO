import { useNavigate } from 'react-router-dom';
import { faker } from '@faker-js/faker';
// @mui
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography } from '@mui/material';
// components
import Page from '../../components/Page';
import Iconify from '../../components/Iconify';
import './style.css';
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
} from '../../sections/@dashboard/app';

// ----------------------------------------------------------------------

export default function DisbursalList() {
  const theme = useTheme();
  const navigate = useNavigate()

  const redirectPage = async (url) => {
    navigate(`/app/disbursal/${url}`, { replace: true });
  };

  return (
    <Page title="Dashboard">
      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
        Disbursal List (List, Create, Update, Delete)
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary onClick={() => redirectPage('registration/0')} className="zoom" title="Registration" total={0} icon={'ant-design:android-filled'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary onClick={() => redirectPage('bt/0')} className="zoom" title="BT" total={0} color="info" icon={'ant-design:apple-filled'} />
          </Grid>

        </Grid>
      </Container>
    </Page>
  );
}
