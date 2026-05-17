# 🚀 DemocracyCraft Bot - Quick Reference Card

## Essential Commands (One-Liners)

```bash
# Install dependencies
npm install

# Configure (copy example to .env)
cp .env.example .env

# Deploy slash commands to Discord
node deploy-commands.js

# Start the bot
npm start

# Development mode (auto-reload)
npm run dev
```

## All 14 Bot Commands

### HR & Applications
- `/application` - Start job application
- `/employees` - View employee list
- `/wages` - Check hourly wages
- `/salaries` - Check annual salaries

### Communications (Staff Only)
- `/news title:"X" content:"Y"` - Post news
- `/announcements title:"X" content:"Y" priority:high` - Post announcement

### Business Operations
- `/clock action:in` - Clock in
- `/clock action:out` - Clock out
- `/clock action:status` - Check status
- `/structure` - View org chart
- `/realty` - Plot ownership
- `/econ-report` - Market analysis

### Social
- `/private-chat user:@someone` - Create private chat

### Information
- `/services` - Company services
- `/rules` - Server rules
- `/help` - Command reference

## File Structure

```
DC bot/
├── index.js              # Main bot file
├── deploy-commands.js    # Register commands
├── package.json          # Dependencies
├── .env                  # Your config (create from .env.example)
│
├── README.md             # Full documentation
├── QUICKSTART.md         # 5-min setup guide
├── COMMANDS.md           # Command details
├── CHECKLIST.md          # Setup checklist
├── PROJECT_SUMMARY.md    # Project overview
│
└── commands/             # 14 command files
    ├── application.js
    ├── news.js
    ├── announcements.js
    ├── employees.js
    ├── wages.js
    ├── salaries.js
    ├── structure.js
    ├── help.js
    ├── realty.js
    ├── clock.js
    ├── private-chat.js
    ├── econ-report.js
    ├── services.js
    └── rules.js
```

## Environment Variables (.env)

```env
DISCORD_TOKEN=your_bot_token_here
CLIENT_ID=your_application_id_here
GUILD_ID=your_server_id_here     # Optional, for faster testing
```

## Getting Bot Token

1. https://discord.com/developers/applications
2. Create Application → Bot → Copy Token
3. Enable Privileged Intents:
   - ✓ Server Members Intent
   - ✓ Message Content Intent

## Inviting Bot

OAuth2 → URL Generator:
- Scopes: `bot`, `applications.commands`
- Permissions: `Administrator` (or specific ones)
- Copy URL → Open in browser → Authorize

## Common Issues

**Commands not showing?**
- Wait 1 hour OR add GUILD_ID to .env
- Re-run: `node deploy-commands.js`

**Bot offline?**
- Check token in .env
- Keep terminal window open
- Run: `npm start`

**Permission errors?**
- Give bot Administrator permission
- Ensure bot role is above restricted roles

## Quick Customization

### Change Embed Colors
In any command file:
```javascript
.setColor('#FF0000')  // Change this hex code
```

### Modify Text
Edit the text inside:
```javascript
.setTitle('Your Title')
.setDescription('Your description')
.addFields({ name: 'Field', value: 'Content' })
```

### Add New Command
1. Create file in `commands/` folder
2. Follow existing command structure
3. Run: `node deploy-commands.js`

## Production Deployment

Using PM2 (recommended):
```bash
npm install -g pm2
pm2 start index.js --name "dc-bot"
pm2 startup
pm2 save
```

Monitor:
```bash
pm2 status
pm2 logs dc-bot
pm2 restart dc-bot
```

## Useful Links

- Discord.js Docs: https://discord.js.org/
- Discord Dev Portal: https://discord.com/developers
- Node.js Docs: https://nodejs.org/
- Emoji Cheat Sheet: https://emojipedia.org/

## Support Checklist

Before asking for help:
- [ ] Checked console logs for errors
- [ ] Verified .env configuration
- [ ] Confirmed bot is online
- [ ] Tested with /help command
- [ ] Reviewed README.md troubleshooting section

---

**Need more details?** Check README.md, QUICKSTART.md, or COMMANDS.md

**Version:** 1.0.0 | **Framework:** Discord.js v14
