const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { google } = require('googleapis');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('sheets')
        .setDescription('View accounting Google Sheets data')
        .addStringOption(option =>
            option.setName('sheet')
                .setDescription('Select which sheet to view')
                .setRequired(true)
                .addChoices(
                    { name: 'Main Accounting', value: 'main' },
                    { name: 'Balance Sheet', value: 'balance' },
                    { name: 'Income Statement', value: 'income' },
                    { name: 'Cash Flow', value: 'cashflow' },
                    { name: 'Summary', value: 'summary' }
                ))
        .addIntegerOption(option =>
            option.setName('rows')
                .setDescription('Number of rows to display (max 20)')
                .setMinValue(1)
                .setMaxValue(20)
                .setRequired(false)),
    async execute(interaction) {
        await interaction.deferReply();

        try {
            const sheetName = interaction.options.getString('sheet');
            const maxRows = interaction.options.getInteger('rows') || 10;

            // Google Sheets configuration
            const SPREADSHEET_ID = '1OzmtzLFMYmGaNoS3PmFA5gqKs4fhH3lOZDTGcA3axIc';
            
            // Map sheet names to GID or range
            const sheetRanges = {
                main: 'Main!A1:Z50',
                balance: 'Balance!A1:Z50',
                income: 'Income!A1:Z50',
                cashflow: 'CashFlow!A1:Z50',
                summary: 'Summary!A1:Z50'
            };

            const range = sheetRanges[sheetName] || 'Main!A1:Z50';

            // Initialize Google Sheets API
            // TODO: Configure with actual credentials
            // For now, using a template that shows how it would work
            
            let values = [];
            let sheetTitle = sheetName.charAt(0).toUpperCase() + sheetName.slice(1);

            // Check if credentials are configured
            if (process.env.GOOGLE_SHEETS_CREDENTIALS) {
                try {
                    const auth = new google.auth.GoogleAuth({
                        credentials: JSON.parse(process.env.GOOGLE_SHEETS_CREDENTIALS),
                        scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
                    });

                    const sheets = google.sheets({ version: 'v4', auth });
                    
                    const response = await sheets.spreadsheets.values.get({
                        spreadsheetId: SPREADSHEET_ID,
                        range: range,
                    });

                    values = response.data.values || [];
                } catch (error) {
                    console.error('Error fetching from Google Sheets:', error);
                    // Fallback to demo data if API fails
                    values = getDemoData(sheetName);
                }
            } else {
                // Demo mode - show sample data
                console.log('Google Sheets credentials not configured. Showing demo data.');
                values = getDemoData(sheetName);
            }

            // Format the data for Discord embed
            if (!values || values.length === 0) {
                return interaction.editReply({
                    content: '❌ No data found in this sheet.',
                    ephemeral: true
                });
            }

            // Limit rows
            const displayRows = values.slice(0, maxRows + 1); // +1 for header
            const headers = displayRows[0];
            const dataRows = displayRows.slice(1);

            // Create formatted table string
            let tableContent = '';
            
            // Add headers
            tableContent += `**${headers.join(' | ')}**\n`;
            tableContent += '─'.repeat(Math.min(headers.join(' | ').length, 50)) + '\n';
            
            // Add data rows
            dataRows.forEach((row, index) => {
                const paddedRow = row.map(cell => cell || '-');
                // Pad to match header length
                while (paddedRow.length < headers.length) {
                    paddedRow.push('-');
                }
                tableContent += `${paddedRow.join(' | ')}\n`;
            });

            // Truncate if too long for Discord (2000 char limit)
            if (tableContent.length > 1900) {
                tableContent = tableContent.substring(0, 1897) + '...';
            }

            const totalRows = values.length - 1; // Exclude header
            const showingRows = dataRows.length;

            const sheetsEmbed = new EmbedBuilder()
                .setColor('#0F9D58') // Google Sheets green
                .setTitle(`📊 ${sheetTitle} Sheet`)
                .setDescription(tableContent)
                .addFields(
                    { 
                        name: '📈 Sheet Info', 
                        value: `Showing: ${showingRows} of ${totalRows} rows\nSheet: ${sheetTitle}`, 
                        inline: true 
                    },
                    { 
                        name: '🔗 Quick Links', 
                        value: `[Open in Google Sheets](https://docs.google.com/spreadsheets/d/${SPREADSHEET_ID}/edit)\n[Direct Link](https://docs.google.com/spreadsheets/d/${SPREADSHEET_ID}/edit#gid=1010980774)`, 
                        inline: true 
                    }
                )
                .setFooter({ text: 'DemocracyCraft Accounting • Google Sheets Integration' })
                .setTimestamp();

            await interaction.editReply({
                embeds: [sheetsEmbed]
            });

            console.log(`Sheets viewed by ${interaction.user.tag}: ${sheetName}`);

        } catch (error) {
            console.error('Error in sheets command:', error);
            await interaction.editReply({
                content: '❌ Error loading sheet data. Please try again later.',
                ephemeral: true
            });
        }
    },
};

// Demo data for testing without API credentials
function getDemoData(sheetName) {
    const demoData = {
        main: [
            ['Date', 'Description', 'Category', 'Debit', 'Credit', 'Balance'],
            ['2024-01-15', 'Server Revenue', 'Income', '', '$5,000', '$45,000'],
            ['2024-01-16', 'Hosting Costs', 'Expense', '$800', '', '$44,200'],
            ['2024-01-17', 'Staff Payments', 'Payroll', '$3,500', '', '$40,700'],
            ['2024-01-18', 'Plot Sales', 'Income', '', '$2,200', '$42,900'],
            ['2024-01-19', 'Marketing', 'Expense', '$500', '', '$42,400'],
            ['2024-01-20', 'Donations', 'Income', '', '$1,500', '$43,900'],
            ['2024-01-21', 'Equipment', 'Assets', '$1,200', '', '$42,700'],
            ['2024-01-22', 'Service Fees', 'Income', '', '$800', '$43,500'],
            ['2024-01-23', 'Utilities', 'Expense', '$300', '', '$43,200'],
            ['2024-01-24', 'Consulting', 'Income', '', '$1,000', '$44,200'],
        ],
        balance: [
            ['Account', 'Type', 'Amount', '% of Total'],
            ['Cash & Equivalents', 'Asset', '$25,000', '45%'],
            ['Accounts Receivable', 'Asset', '$8,500', '15%'],
            ['Property & Equipment', 'Asset', '$15,000', '27%'],
            ['Total Assets', 'Asset', '$48,500', '100%'],
            ['Accounts Payable', 'Liability', '$5,200', ''],
            ['Accrued Expenses', 'Liability', '$2,800', ''],
            ['Total Liabilities', 'Liability', '$8,000', ''],
            ['Owner Equity', 'Equity', '$40,500', ''],
        ],
        income: [
            ['Period', 'Revenue', 'Expenses', 'Net Income'],
            ['Q1 2024', '$45,000', '$28,500', '$16,500'],
            ['Q2 2024', '$52,000', '$31,200', '$20,800'],
            ['Q3 2024', '$48,500', '$29,800', '$18,700'],
            ['Q4 2024', '$55,000', '$33,500', '$21,500'],
            ['Total 2024', '$200,500', '$123,000', '$77,500'],
        ],
        cashflow: [
            ['Activity', 'Inflow', 'Outflow', 'Net'],
            ['Operating Activities', '$45,000', '$28,500', '$16,500'],
            ['Investing Activities', '$5,000', '$12,000', '-$7,000'],
            ['Financing Activities', '$10,000', '$3,500', '$6,500'],
            ['Net Cash Flow', '', '', '$16,000'],
            ['Beginning Balance', '', '', '$29,000'],
            ['Ending Balance', '', '', '$45,000'],
        ],
        summary: [
            ['Metric', 'Current', 'Previous', 'Change'],
            ['Total Revenue', '$55,000', '$48,500', '+13.4%'],
            ['Total Expenses', '$33,500', '$29,800', '+12.4%'],
            ['Net Profit', '$21,500', '$18,700', '+15.0%'],
            ['Profit Margin', '39.1%', '38.6%', '+0.5%'],
            ['Cash Reserves', '$45,000', '$42,000', '+7.1%'],
            ['Employees', '47', '42', '+11.9%'],
        ]
    };

    return demoData[sheetName] || demoData.main;
}
