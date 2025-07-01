const { onDocumentCreated } = require('firebase-functions/v2/firestore');
const admin = require('firebase-admin');
const { google } = require('googleapis');
const serviceAccount = require('./service-account.json');

admin.initializeApp();

// Replace with your actual Google Sheet ID
const SHEET_ID = '12rHD0l9wdc15zu-iOvkjv2rQlOXseeTCNUOV7fgVwt0';

// Set up Google Sheets API auth
const auth = new google.auth.GoogleAuth({
  credentials: serviceAccount,
  scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});

exports.syncAppointmentToSheet = onDocumentCreated('appointments/{docId}', async (event) => {
  const snap = event.data;
  if (!snap) return;
  const data = snap.data();
  const sheets = google.sheets({ version: 'v4', auth: await auth.getClient() });
  // Prepare the row to append (customize columns as needed)
  const row = [
    data.journeyId || '',
    new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata', year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false }),
    data.cta || '',
    data.persona || '',
    data.typeOfCourse || '',
    data.year || '',
    data.appointment?.name || '',
    data.appointment?.phone || '',
    data.appointment?.email || '',
    data.goal || '',
    data.courseName || '',
    data.mainLine || '',
    data.appointment?.date || '',
    data.batchSize || '',
    data.duration || '',
    data.live1on1 || '',
    data.liveBatch || '',
    data.originalPrice || '',
    data.price || ''
  ];
  try {
    await sheets.spreadsheets.values.append({
      spreadsheetId: SHEET_ID,
      range: 'Firebase DUMP!A1', // Changed to match your sheet/tab name
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [row],
      },
    });
    console.log('Appointment synced to Google Sheet');
  } catch (err) {
    console.error('Failed to sync appointment to Google Sheet:', err);
  }
});

// No-op change to force redeploy
