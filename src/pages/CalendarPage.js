import { Scheduler } from '@aldabil/react-scheduler';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import { Container } from '@mui/system';
import { useSession } from '@supabase/auth-helpers-react';
import CalendarService from '../services/calendar';



export default function Calendar() {
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

  const handleConfirm = async (event, action) => {
    try {
      let updatedEvent;
      if (action === 'edit') {
        updatedEvent = await CalendarService.updateEvent(
          session.provider_token,
          calendarId,
          event.event_id,
          {
            summary: event.title,
            description: event.description,
            start: { dateTime: event.start.toISOString() },
            end: { dateTime: event.end.toISOString() },
          }
        );
      } else if (action === 'create') {
        updatedEvent = await CalendarService.createEvent(
          session.provider_token,
          calendarId,
          {
            summary: event.title,
            description: event.description,
            start: { dateTime: event.start.toISOString() },
            end: { dateTime: event.end.toISOString() },
          }
        );
      }

      return {
        ...event,
        event_id: updatedEvent.id,
        title: updatedEvent.summary,
        description: updatedEvent.description,
        start: new Date(updatedEvent.start.dateTime),
        end: new Date(updatedEvent.end.dateTime),
      };
    } catch (error) {
      console.error(error);
      return event;
    }
  };

  const handleDelete = async (deletedId) => {
    try {
      console.log("deleted");
      await CalendarService.deleteEvent(session.provider_token, calendarId, deletedId);
      return '';
    } catch (error) {
      console.error(error);
      return deletedId;
    }
  };

  return (
    <Container >
      <Typography variant="h4" sx={{ mb: 5 }}>
        Call Now
      </Typography>
      <Card>
        <Scheduler
          getRemoteEvents={fetchRemote}
          onConfirm={handleConfirm}
          onDelete={handleDelete}
          draggable={false}
        />
      </Card>
    </Container>
  );
}
