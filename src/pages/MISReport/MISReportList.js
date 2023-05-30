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

export default function MISReportList() {
  const theme = useTheme();
  const navigate = useNavigate()

  const redirectPage = async (url) => {
    navigate(`/app/reportOpinion/${url}`, { replace: true });
  };

  return (
    <Page title="Report Opinion List">
      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
         MIS Report List
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary onClick={() => redirectPage('bankWiseMISReport/0')} className="zoom" title="Bank Wise MIS Report" total={0} icon={'ant-design:android-filled'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary onClick={() => redirectPage('statusWiseMISReport/0')} className="zoom" title="Status Wise MIS Report" total={0} color="info" icon={'ant-design:apple-filled'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary onClick={() => redirectPage('executiveWiseMisReport/0')} className="zoom" title="Executive Wise MIS Report" total={0} color="info" icon={'ant-design:apple-filled'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary onClick={() => redirectPage('typeWiseMISReport/0')} className="zoom" title="Type Wise MIS Report" total={0} color="info" icon={'ant-design:apple-filled'} />
          </Grid>

        </Grid>
      </Container>
    </Page>
  );
}
