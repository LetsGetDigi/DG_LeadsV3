const GOOGLE_CALENDAR_API_BASE_URL = 'https://www.googleapis.com/calendar/v3';

export default class CalendarService {

    static async createEvent(accessToken, calendarId, event) {
        const response = await fetch(`${GOOGLE_CALENDAR_API_BASE_URL}/calendars/${calendarId}/events`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(event),
        });

        console.log("http", response);
        if (response.ok) {
            return response.json();
        }
        throw new Error('Failed to create event');

    }

    static async updateEvent(accessToken, calendarId, eventId, event) {
        const response = await fetch(`${GOOGLE_CALENDAR_API_BASE_URL}/calendars/${calendarId}/events/${eventId}`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(event),
        });

        if (response.ok) {
            return response.json();
        }
        throw new Error('Failed to update event');

    }

    static async deleteEvent(accessToken, calendarId, eventId) {
        const response = await fetch(`${GOOGLE_CALENDAR_API_BASE_URL}/calendars/${calendarId}/events/${eventId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
            },
        });

        if (response.ok) {
            return true;
        }
        throw new Error('Failed to delete event');

    }

    static async listEvents(accessToken, calendarId, timeMin, timeMax) {
        try {
            const response = await fetch(
                `${GOOGLE_CALENDAR_API_BASE_URL}/calendars/${calendarId}/events?timeMin=${new Date(timeMin).toISOString() }&timeMax=${new Date(timeMax).toISOString()}&singleEvents=true&orderBy=startTime`,
                {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            );

            console.log(response, "r");

            if (response.ok) {
                const data = await response.json();
                console.log(data);
                return data.items;
            }
            throw new Error('Failed to fetch events');
        } catch (error) {
            console.error('Error fetching events:', error);
            throw error;
        }
    }

}