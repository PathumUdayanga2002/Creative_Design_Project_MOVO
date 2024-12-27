const { google } = require("googleapis");

// OAuth2 client
const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI
);

// Get Google Calendar API instance
const calendar = google.calendar({ version: "v3", auth: oauth2Client });

const googleCalendarUtils = {
  getAuthUrl: () => {
    return oauth2Client.generateAuthUrl({
      access_type: "offline",
      scope: ["https://www.googleapis.com/auth/calendar.events"],
    });
  },

  setCredentials: (tokens) => {
    oauth2Client.setCredentials(tokens);
  },

  createEvent: async (event) => {
    try {
      const response = await calendar.events.insert({
        calendarId: "primary",
        resource: {
          summary: event.summary,
          description: event.description,
          start: { dateTime: event.start },
          end: { dateTime: event.end },
          conferenceData: {
            createRequest: {
              requestId: "sample123",
              conferenceSolutionKey: { type: "hangoutsMeet" },
            },
          },
        },
        conferenceDataVersion: 1,
      });

      return response.data;
    } catch (error) {
      console.error("Error creating event:", error);
      throw new Error("Unable to create event");
    }
  },
};

module.exports = googleCalendarUtils;
