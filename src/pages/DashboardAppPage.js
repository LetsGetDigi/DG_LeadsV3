import { Helmet } from 'react-helmet-async';
import { useEffect, useState } from 'react';

import { useSession } from '@supabase/auth-helpers-react';

import { Grid, Container, Typography, Card } from '@mui/material';
import { Scheduler } from '@aldabil/react-scheduler';

import { useAuth } from './AuthContext';

import {
  AppTasks,
  AppWidgetSummary,
  AppConversionRates,
} from '../sections/@dashboard/app';
import CalendarService from '../services/calendar';




// ----------------------------------------------------------------------

export default function DashboardAppPage() {



  const session = useSession();
  const calendarId = "primary";

  const fetchRemote = async (query) => {
    try {
      const events = await CalendarService.listEvents(
        session.provider_token,
        calendarId,
        query.start,
        query.end
      );
      return events.map((event) => ({
        event_id: event.id,
        title: event.summary,
        start: new Date(event.start.date || event.start.dateTime),
        end: new Date(event.end.date || event.end.dateTime),
        description: event.description,
      }));
    } catch (error) {
      console.error(error);
      return [];
    }
  };
  const [currentData, setCurrentData] = useState({ booked: 0, blocked: 0, callLater: 0, emailMe: 0, interested: 0, answered: 0, voicemail: 0, noAnswer: 0, notInterested: 0 });
  const { token, setData, ip } = useAuth();


  const { booked, answered, blocked, emailMe, callLater, interested, voicemail, notInterested, noAnswer } = currentData;


  useEffect(() => {
    fetch(`${ip}/api/analytics`, {
      headers: {
        'x-access-token': token,
      },
      method: "GET",
    })
      .then((response) => response.json())
      .then((currentData) => {
        setData(currentData);
        console.log(currentData);
        setCurrentData(currentData)
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);









  return (
    <>
      <Helmet>
        <title> Dashboard | DigiLeads </title>
      </Helmet>

      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Hi! Welcome back {session.user.user_metadata.name}
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Total Bookings" total={booked} icon={'material-symbols:check-circle-outline-rounded'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Blocked Calls" total={blocked} color="error" icon={'fluent:presence-blocked-16-regular'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Total Calls" total={answered} color="info" icon={'ic:baseline-call'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="No Answeres" total={2} color="warning" icon={'ic:outline-question-answer'} />
          </Grid>
          {/* 
          <Grid item xs={12} md={6} lg={8}>
            <AppWebsiteVisits
              title="Analytics"
              subheader="(+43%) than last year"
              chartLabels={[
                '01/01/2003',
                '02/01/2003',
                '03/01/2003',
                '04/01/2003',
                '05/01/2003',
                '06/01/2003',
                '07/01/2003',
                '08/01/2003',
                '09/01/2003',
                '10/01/2003',
                '11/01/2003',
              ]}
              chartData={[
                {
                  name: 'Booked Calls',
                  type: 'column',
                  fill: 'solid',
                  data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30],
                },
                {
                  name: 'Voicemails Calls',
                  type: 'area',
                  fill: 'gradient',
                  data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43],
                },
                {
                  name: 'No Answers',
                  type: 'line',
                  fill: 'solid',
                  data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39],
                },
              ]}
            />
          </Grid> */}

          <Grid item xs={12} md={6} lg={6}>
            <AppConversionRates
              title="Calling Analytics"
              subheader="All the booking rates"
              chartData={[
                { label: 'Booked', value: booked },
                { label: 'Blocked', value: blocked },
                { label: 'Interested', value: interested },
                { label: 'Answered', value: answered },
                { label: 'Email Me', value: emailMe },
                { label: 'Call Later', value: callLater },
                { label: 'Voicemail', value: voicemail },
                { label: 'Not Interested', value: notInterested },
                { label: 'No Answer', value: noAnswer },


              ]}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={6}>
            <Card sx={{ px: 3, pb: 3 }}>
              <Typography>
                <h3>Calendar</h3>
              </Typography>
              <Scheduler getRemoteEvents={fetchRemote} />
            </Card>
          </Grid>
        </Grid>
      </Container >
    </>
  );
}
