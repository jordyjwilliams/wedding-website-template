// ===== GOOGLE APPS SCRIPT FOR GOOGLE SHEETS INTEGRATION =====
//
// NOTE: this all needs testing. Placeholder.
//
// SETUP INSTRUCTIONS (mostly generated... Check and setup these properly.):
// 1. Open your Google Sheets document
// 2. Go to Extensions > Apps Script
// 3. Delete any existing code and paste this entire script
// 4. Click the disk icon to save
// 5. Click "Deploy" > "New deployment"
// 6. Select type: "Web app"
// 7. Set "Execute as": Me
// 8. Set "Who has access": Anyone
// 9. Click "Deploy"
// 10. Copy the Web App URL
// 11. Paste the URL into script.js where it says 'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE'
// 12. Authorize the script when prompted
//
// Your Google Sheet should have these column headers in the first row:
// Timestamp | First Name | Last Name | Email | Phone | Attendance | Guest Count | Friday Evening BBQ | Sunday Recovery Breakfast | Staying On Site | Dietary Restrictions | Message
//

function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

    // Parse the incoming data
    const data = JSON.parse(e.postData.contents);

    // Prepare the row data
    const rowData = [
      new Date(data.timestamp),
      data.firstName,
      data.lastName,
      data.email,
      data.phone,
      data.attendance,
      data.guestCount,
      data.fridayEveningBbq,
      data.sundayRecoveryBreakfast,
      data.stayingOnSite,
      data.dietaryRestrictions,
      data.message,
    ];

    // Append to sheet
    sheet.appendRow(rowData);

    // Optional: Send email notification to couple
    sendEmailNotification(data);

    return ContentService.createTextOutput(JSON.stringify({ status: 'success' })).setMimeType(
      ContentService.MimeType.JSON
    );
  } catch (error) {
    return ContentService.createTextOutput(
      JSON.stringify({ status: 'error', message: error.toString() })
    ).setMimeType(ContentService.MimeType.JSON);
  }
}

// Optional: Send email notification when someone RSVPs
function sendEmailNotification(data) {
  const emailAddress = process.env.GOOGLE_SCRIPT_ACCOUNT_EMAIL || '';
  const subject = '🎉 New Wedding RSVP from ' + data.firstName + ' ' + data.lastName;

  const body = `
    New RSVP Received!
    
    Name: ${data.firstName} ${data.lastName}
    Email: ${data.email}
    Phone: ${data.phone}
    Attendance: ${data.attendance}
    Number of Guests: ${data.guestCount}
    Friday Evening BBQ: ${data.fridayEveningBbq}
    Sunday Recovery Breakfast: ${data.sundayRecoveryBreakfast}
    Staying On Site: ${data.stayingOnSite}
    Dietary Restrictions: ${data.dietaryRestrictions}
    Message: ${data.message}
    
    Submitted: ${new Date(data.timestamp).toLocaleString()}
  `;

  try {
    MailApp.sendEmail(emailAddress, subject, body);
  } catch (error) {
    console.error('Failed to send email:', error);
  }
}

// TODO: Remove after testing/sheet setup...
// Test function - you can run this to test if the script works
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function testScript() {
  const testData = {
    timestamp: new Date().toISOString(),
    firstName: 'Test',
    lastName: 'User',
    email: 'test@example.com',
    phone: '123-456-7890',
    attendance: 'yes',
    guestCount: 2,
    fridayEveningBbq: true,
    sundayRecoveryBreakfast: true,
    stayingOnSite: false,
    dietaryRestrictions: 'None',
    message: 'Looking forward to it!',
  };

  const e = {
    postData: {
      contents: JSON.stringify(testData),
    },
  };

  doPost(e);
  Logger.log('Test completed - check your sheet!');
}
