# Quick Start Guide - DemocracyCraft Bot

## 🚀 Get Started in 5 Minutes

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Set Up Your Bot
1. Go to https://discord.com/developers/applications
2. Click "New Application" → Name it "DemocracyCraft Bot"
3. Go to "Bot" tab → Click "Add Bot"
4. Under "Token" → Click "Copy" (keep this secret!)

### Step 3: Configure Environment
1. Copy the example file:
   ```bash
   cp .env.example .env
   ```

2. Edit `.env` and add your token:
   ```
   DISCORD_TOKEN=your_token_here
   CLIENT_ID=your_application_id_here
   ```

### Step 4: Invite Bot to Server
1. In Discord Developer Portal, go to "OAuth2" → "URL Generator"
2. Select scopes:
   - ✓ bot
   - ✓ applications.commands
3. Under "Bot Permissions", select:
   - Administrator (easiest) OR specific permissions listed in README
4. Copy the generated URL and open it
5. Select your server → Authorize

### Step 5: Deploy Commands & Start
```bash
node deploy-commands.js
npm start
```

That's it! Your bot should now be online. Type `/help` in your Discord server to see all commands.

## 📝 Next Steps

### To Customize Data:
All commands currently show template data. When you're ready to connect your real data:

1. **Database Setup**: Install your database driver
   ```bash
   npm install mysql2    # for MySQL
   # or
   npm install pg        # for PostgreSQL
   # or
   npm install sqlite3   # for SQLite
   ```

2. **Create Database Module**: Add a `database.js` file to handle connections

3. **Update Commands**: Replace template data with database queries in each command file

### For AI Econ Reports:
1. Sign up at OpenAI: https://platform.openai.com
2. Get your API key
3. Add to `.env`: `AI_API_KEY=your_key_here`
4. Install OpenAI SDK: `npm install openai`
5. Update `commands/econ-report.js` to use the API

## 🎮 Testing Commands

Try these commands in your Discord server:
- `/help` - See all available commands
- `/rules` - View server rules
- `/services` - Check company services
- `/structure` - See org chart
- `/clock action:in` - Test clock-in system
- `/private-chat user:@someone` - Create private chat

## 🔧 Troubleshooting

**Bot not showing commands?**
- Run `node deploy-commands.js` again
- Wait up to 1 hour for global commands to register

**Permission errors?**
- Make sure bot has "Manage Channels" permission
- Check that bot role is above restricted roles

**Need help?**
- Check console logs for error messages
- Read the full README.md
- Review Discord.js docs: https://discord.js.org

---

Ready to customize? Check the TODO comments in each command file for integration points!
