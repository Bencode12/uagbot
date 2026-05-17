# DemocracyCraft Discord Bot

A comprehensive Discord bot for managing the DemocracyCraft server with employee management, communications, real estate tracking, and economic analysis.

## Features

### 📝 HR & Applications
- **`/application`** - Start a private job application process
- **`/employees`** - View all employees in the company
- **`/wages`** - Check hourly wage information
- **`/salaries`** - View annual salary breakdowns

### 📢 Communications
- **`/news`** - Post company news (Staff only)
- **`/announcements`** - Post priority-based announcements (Staff only)

### 💼 Business Operations
- **`/clock`** - Clock in/out system for employees with time tracking
- **`/structure`** - View organizational hierarchy
- **`/realty`** - Check plot ownership and real estate information
- **`/econ-report`** - AI-powered economic analysis reports
- **`/sheets`** - View live Google Sheets accounting data

### 💬 Social Features
- **`/private-chat`** - Create secure one-on-one private channels

### 📋 Information
- **`/services`** - View company services and offerings
- **`/rules`** - Display server rules and guidelines
- **`/help`** - Complete command reference and navigation help

## Setup Instructions

### Prerequisites
- Node.js 16.9.0 or higher
- A Discord Bot Token
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   cd "DC bot"
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   - Copy `.env.example` to `.env`
   ```bash
   cp .env.example .env
   ```
   - Edit `.env` and fill in your credentials:
     - `DISCORD_TOKEN` - Your bot token from Discord Developer Portal
     - `CLIENT_ID` - Your application ID
     - `GUILD_ID` - Your server ID (optional, for faster testing)

4. **Get your Discord Bot Token**
   - Go to [Discord Developer Portal](https://discord.com/developers/applications)
   - Create a new application
   - Go to "Bot" section and create a bot
   - Copy the token and paste it in `.env`
   - Enable necessary Privileged Gateway Intents:
     - Server Members Intent
     - Message Content Intent

5. **Invite the bot to your server**
   - Go to OAuth2 > URL Generator in Discord Developer Portal
   - Select scopes: `bot`, `applications.commands`
   - Select bot permissions: Administrator (or specific permissions needed)
   - Copy the generated URL and open it in browser
   - Select your server and authorize

6. **Deploy slash commands**
   ```bash
   node deploy-commands.js
   ```

7. **Start the bot**
   ```bash
   npm start
   ```
   
   For development with auto-reload:
   ```bash
   npm run dev
   ```

## Project Structure

```
DC bot/
├── commands/              # All bot commands
│   ├── application.js    # Job application system
│   ├── news.js           # News posting
│   ├── announcements.js  # Announcements with priority
│   ├── employees.js      # Employee listing
│   ├── wages.js          # Wage information
│   ├── salaries.js       # Salary information
│   ├── structure.js      # Org structure
│   ├── help.js           # Help menu
│   ├── realty.js         # Plot ownership
│   ├── clock.js          # Time tracking
│   ├── private-chat.js   # Private channels
│   ├── econ-report.js    # Economic reports
│   ├── services.js       # Company services
│   └── rules.js          # Server rules
├── index.js              # Main bot entry point
├── deploy-commands.js    # Command deployment script
├── package.json          # Dependencies and scripts
├── .env.example          # Environment template
└── README.md            # This file
```

## Configuration

### Required Permissions

The bot needs the following Discord permissions:
- View Channels
- Send Messages
- Manage Channels (for private chat creation)
- Embed Links
- Read Message History
- Use Slash Commands

### Database Integration (TODO)

Currently, the bot uses template data. To integrate with your database:

1. Install your preferred database driver (e.g., `mysql2`, `pg`, `sqlite3`)
2. Create a `database.js` module for connection handling
3. Update commands to fetch real data:
   - Employee data from your HR database
   - Market data from your trading API
   - Realty information from your property system
   - Clock-in records for time tracking

### AI Integration for Econ Reports (TODO)

To enable AI-powered economic analysis:

1. Sign up for an AI service (OpenAI, Anthropic, etc.)
2. Add your API key to `.env`
3. Install the SDK: `npm install openai`
4. Update `econ-report.js` to call the AI API with market data
5. Implement automated daily reports using `node-cron`

## Development

### Adding New Commands

1. Create a new file in the `commands/` folder
2. Export an object with `data` and `execute` properties:
   ```javascript
   const { SlashCommandBuilder } = require('discord.js');
   
   module.exports = {
       data: new SlashCommandBuilder()
           .setName('command-name')
           .setDescription('Description here'),
       async execute(interaction) {
           // Your code here
           await interaction.reply('Response');
       }
   };
   ```
3. Run `node deploy-commands.js` to register the command

### Testing

- Test commands in your Discord server after deployment
- Check console logs for debugging information
- Use `/help` to verify all commands are registered

## Troubleshooting

### Bot not responding to commands
- Ensure you ran `node deploy-commands.js`
- Check that the bot is online in your server
- Verify the bot has proper permissions

### Commands not showing up
- Wait up to 1 hour for global commands to register
- For instant testing, add `GUILD_ID` to `.env` for guild-specific commands
- Re-run `node deploy-commands.js`

### Permission errors
- Ensure bot has "Manage Channels" permission for private chat creation
- Check role hierarchy - bot role should be above restricted roles
- Verify channel permissions allow bot to send messages

## Future Enhancements

- [ ] Database integration for persistent data
- [ ] AI-powered econ reports with real market data
- [ ] Automated daily/weekly economic reports
- [ ] Advanced employee management system
- [ ] Integration with Minecraft server APIs
- [ ] Web dashboard for administration
- [ ] Role-based access control refinement
- [ ] Analytics and reporting features

## Support

For issues or questions:
- Check the console logs for error messages
- Review Discord.js documentation: https://discord.js.org/
- Open an issue on GitHub

## License

ISC

---

**Built with ❤️ for DemocracyCraft**
