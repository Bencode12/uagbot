# Google Sheets API Setup Guide

## Quick Setup for `/sheets` Command

The `/sheets` command is ready to use in **demo mode** immediately. To connect it to your actual Google Sheet, follow these steps:

---

## Option 1: Demo Mode (No Setup Required) ✅

The command works out of the box with sample accounting data. Just deploy and test!

```bash
npm install
node deploy-commands.js
npm start
```

Then use: `/sheets sheet:main`

---

## Option 2: Connect to Real Google Sheet

### Step 1: Create Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Click "Select a project" → "New Project"
3. Name it "DemocracyCraft Bot" → Create
4. Wait for project creation

### Step 2: Enable Google Sheets API

1. In the Cloud Console, go to "APIs & Services" → "Library"
2. Search for "Google Sheets API"
3. Click on it → "Enable"
4. Also enable "Google Drive API" (for file access)

### Step 3: Create Service Account

1. Go to "APIs & Services" → "Credentials"
2. Click "+ CREATE CREDENTIALS" → "Service account"
3. Fill in:
   - **Service account name:** `democracycraft-bot`
   - **Service account ID:** auto-generated
   - **Description:** `Bot for accessing accounting sheets`
4. Click "Create and Continue"
5. Skip role assignment (click "Continue")
6. Skip users (click "Done")

### Step 4: Generate Credentials JSON

1. Find your service account in the list
2. Click on it → Go to "KEYS" tab
3. Click "ADD KEY" → "Create new key"
4. Select **JSON** format
5. Click "Create"
6. **Save the downloaded JSON file securely!**

### Step 5: Share Your Google Sheet

1. Open your Google Sheet: https://docs.google.com/spreadsheets/d/1OzmtzLFMYmGaNoS3PmFA5gqKs4fhH3lOZDTGcA3axIc/edit
2. Click "Share" button (top right)
3. In "Add people and groups", paste the **client_email** from your JSON file
   - Looks like: `democracycraft-bot@your-project.iam.gserviceaccount.com`
4. Set permission to **"Viewer"** (read-only)
5. **Uncheck** "Notify people"
6. Click "Share"

### Step 6: Configure Environment

1. Open the downloaded JSON file in a text editor
2. Copy the entire contents
3. Open your `.env` file
4. Replace the `GOOGLE_SHEETS_CREDENTIALS` value:

```env
GOOGLE_SHEETS_CREDENTIALS='{"type":"service_account","project_id":"your-actual-project",...}'
```

**Important:** Keep the single quotes around the JSON!

### Step 7: Test It

```bash
npm install
node deploy-commands.js
npm start
```

Try: `/sheets sheet:main rows:10`

---

## Customizing Sheet Names

The command currently looks for these sheet tabs:
- `Main` - Main accounting ledger
- `Balance` - Balance sheet
- `Income` - Income statement
- `CashFlow` - Cash flow statement
- `Summary` - Summary dashboard

To change these, edit `commands/sheets.js`:

```javascript
const sheetRanges = {
    main: 'YourSheetName!A1:Z50',  // Change 'YourSheetName'
    balance: 'BalanceSheet!A1:Z50',
    // ... etc
};
```

---

## Troubleshooting

### "No data found" error
- Check that sheet names match exactly (case-sensitive)
- Verify the service account has Viewer access
- Ensure the spreadsheet ID in the code matches your sheet

### "Permission denied" error
- Re-check that you shared the sheet with the service account email
- Make sure you gave at least "Viewer" permissions
- Wait 5 minutes for permissions to propagate

### "Invalid credentials" error
- Verify the JSON in `.env` is properly formatted
- Make sure there are no line breaks in the private key
- Check that the service account is active

### Command shows demo data
- This is normal if `GOOGLE_SHEETS_CREDENTIALS` is not set
- Check that your `.env` file exists and has the credentials
- Restart the bot after adding credentials

---

## Security Notes

⚠️ **NEVER commit your `.env` file to GitHub!**

The `.gitignore` file already excludes it, but always double-check before pushing.

If you accidentally expose credentials:
1. Delete the service account in Google Cloud Console
2. Create a new one
3. Update your `.env` file
4. Re-share the sheet with the new service account

---

## Advanced Configuration

### Different Spreadsheet

To use a different Google Sheet, change the `SPREADSHEET_ID` in `commands/sheets.js`:

```javascript
const SPREADSHEET_ID = 'your-new-spreadsheet-id';
```

The ID is the long string in the URL:
`https://docs.google.com/spreadsheets/d/THIS_IS_THE_ID/edit`

### More Rows

Default is 10 rows, max is 20. To change:

```javascript
.addIntegerOption(option =>
    option.setName('rows')
        .setMinValue(1)
        .setMaxValue(50)  // Increase max
        ...)
```

### Custom Formatting

Edit the table formatting in the `execute` function to customize how data appears in Discord.

---

## Support

For Google Sheets API issues:
- [Google Sheets API Docs](https://developers.google.com/sheets/api)
- [Service Account Guide](https://cloud.google.com/iam/docs/service-accounts)

For bot issues:
- Check console logs
- Review README.md
- Verify all environment variables are set

---

**Ready to go!** 🚀
