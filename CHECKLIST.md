# 📋 DemocracyCraft Bot - Setup Checklist

Use this checklist to get your bot up and running!

## ☐ Prerequisites
- [ ] Node.js installed (v16.9.0 or higher)
  - Check: `node --version`
- [ ] npm installed
  - Check: `npm --version`
- [ ] Discord account with server admin permissions

## ☐ Step 1: Create Discord Bot (5 minutes)
- [ ] Go to https://discord.com/developers/applications
- [ ] Click "New Application"
- [ ] Name it "DemocracyCraft Bot" (or your preferred name)
- [ ] Click "Create"
- [ ] Go to "Bot" tab in left sidebar
- [ ] Click "Add Bot" → "Yes, do it!"
- [ ] Under "Token", click "Copy" 
  - ⚠️ **IMPORTANT:** Save this token securely, you can't see it again!
- [ ] Scroll down to "Privileged Gateway Intents"
  - [ ] Enable "Server Members Intent"
  - [ ] Enable "Message Content Intent"
- [ ] Click "Save Changes"
- [ ] Copy the "Application ID" from the "General Information" tab

## ☐ Step 2: Install & Configure (3 minutes)
- [ ] Open terminal in project folder
- [ ] Run: `npm install`
  - Wait for installation to complete
- [ ] Copy environment file: `cp .env.example .env`
- [ ] Open `.env` in a text editor
- [ ] Paste your bot token: `DISCORD_TOKEN=your_token_here`
- [ ] Paste your application ID: `CLIENT_ID=your_app_id_here`
- [ ] (Optional) Add your server ID: `GUILD_ID=your_server_id_here`
  - To get server ID: Discord Settings → Advanced → Developer Mode → Right-click server → Copy ID
- [ ] Save `.env` file

## ☐ Step 3: Invite Bot to Server (2 minutes)
- [ ] In Discord Developer Portal, go to "OAuth2" → "URL Generator"
- [ ] Under "Scopes", check:
  - [ ] `bot`
  - [ ] `applications.commands`
- [ ] Under "Bot Permissions", check:
  - [ ] Administrator (easiest option)
  - OR select individual permissions:
    - [ ] View Channels
    - [ ] Send Messages
    - [ ] Embed Links
    - [ ] Manage Channels
    - [ ] Read Message History
    - [ ] Use Slash Commands
- [ ] Copy the generated URL at the bottom
- [ ] Paste URL in browser
- [ ] Select your server
- [ ] Click "Authorize"
- [ ] Complete CAPTCHA if prompted
- [ ] Verify bot appears in your server (offline initially)

## ☐ Step 4: Deploy Commands (1 minute)
- [ ] In terminal, run: `node deploy-commands.js`
- [ ] Wait for success message: "✅ Successfully reloaded X application (/) commands."
- [ ] If you see errors, check:
  - [ ] `.env` file is configured correctly
  - [ ] Bot token is correct
  - [ ] Client ID is correct

## ☐ Step 5: Start Bot (1 minute)
- [ ] In terminal, run: `npm start`
- [ ] Look for success messages:
  - ✅ DemocracyCraft Bot is online!
  - 📊 Logged in as [BotName]
  - 🌐 Serving 1 server(s)
- [ ] Keep terminal window open (bot must stay running)

## ☐ Step 6: Test Commands (5 minutes)
Go to your Discord server and test these commands:

- [ ] Type `/help`
  - Should show all available commands
  - If not showing, wait 1 hour for global registration
  - Or use GUILD_ID in .env for instant testing
  
- [ ] Type `/rules`
  - Should display server rules in a red embed
  
- [ ] Type `/services`
  - Should show company services in a cyan embed
  
- [ ] Type `/structure`
  - Should display organizational chart
  
- [ ] Type `/employees`
  - Should list employees by department
  
- [ ] Type `/wages`
  - Should show hourly wage information
  
- [ ] Type `/salaries`
  - Should show annual salary data
  
- [ ] Type `/realty`
  - Should display property ownership info
  
- [ ] Type `/clock action:in`
  - Should confirm you're clocked in
  
- [ ] Type `/clock action:status`
  - Should show your current status
  
- [ ] Type `/clock action:out`
  - Should show duration worked
  
- [ ] Type `/private-chat user:@someone`
  - Should create a private channel (if bot has permission)

## ☐ Step 7: Staff Testing (If Applicable)
- [ ] Try `/news` command (requires Manage Messages permission)
- [ ] Try `/announcements` command (requires Manage Messages permission)
- [ ] Verify only staff can use these commands

## ✅ You're Done!

Your bot is now running with all 14 commands functional!

## 🔧 Optional Enhancements

### For Development:
- [ ] Install nodemon globally: `npm install -g nodemon`
- [ ] Use `npm run dev` for auto-reload when editing files

### For Production:
- [ ] Install PM2: `npm install -g pm2`
- [ ] Start with PM2: `pm2 start index.js --name "dc-bot"`
- [ ] Set up PM2 to start on boot: `pm2 startup`
- [ ] Save PM2 configuration: `pm2 save`

### Next Steps (When Ready):
- [ ] Set up database connection
- [ ] Replace template data with real data
- [ ] Customize colors and text
- [ ] Add your logo to embeds
- [ ] Set up automated econ reports
- [ ] Connect to market APIs
- [ ] Integrate AI service

## 🆘 Troubleshooting

**Commands not appearing?**
- Global commands can take up to 1 hour to register
- Add GUILD_ID to .env for instant testing
- Re-run `node deploy-commands.js`

**Bot offline?**
- Check terminal for error messages
- Verify token in .env is correct
- Ensure terminal window is still open

**Permission errors?**
- Make sure bot role is above restricted roles
- Verify bot has necessary permissions in server settings
- Try giving bot Administrator permission temporarily

**Need help?**
- Check console logs in terminal
- Review README.md for detailed troubleshooting
- Check Discord.js documentation: https://discord.js.org/

---

**Status:** [ ] Not Started | [ ] In Progress | [x] Complete

**Started:** ___________  
**Completed:** ___________  
**Notes:** _______________

---

🎉 **Congratulations! Your DemocracyCraft bot is ready to serve!**
