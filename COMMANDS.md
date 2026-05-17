# DemocracyCraft Bot - Command Reference

## Complete List of Commands

### 📝 HR & Applications

#### `/application`
**Description:** Start a private job application process  
**Usage:** `/application`  
**Permissions:** Everyone  
**Response:** Creates a private channel for application submission  
**Notes:** Template - requires database integration to track applications

---

#### `/employees`
**Description:** List all employees in the company  
**Usage:** `/employees`  
**Permissions:** Everyone  
**Response:** Displays employee list organized by department  
**Data Source:** Template data (replace with database query)

---

#### `/wages`
**Description:** List hourly wages of all employees  
**Usage:** `/wages`  
**Permissions:** Everyone  
**Response:** Shows wage structure by position level  
**Data Source:** Template data (replace with payroll system)

---

#### `/salaries`
**Description:** List annual salaries of all employees  
**Usage:** `/salaries`  
**Permissions:** Everyone  
**Response:** Displays annual salary breakdown  
**Data Source:** Template data (replace with payroll system)

---

### 📢 Communications

#### `/news`
**Description:** Post company news  
**Usage:** `/news title:"Your Title" content:"News content here"`  
**Permissions:** Staff only (Manage Messages permission required)  
**Response:** Posts formatted news embed  
**Features:** 
- Timestamps automatically
- Shows author
- TODO: Posts to designated news channel

---

#### `/announcements`
**Description:** Post important announcements with priority levels  
**Usage:** `/announcements title:"Title" content:"Content" priority:high`  
**Permissions:** Staff only (Manage Messages permission required)  
**Priority Levels:**
- 🟢 Low (Green)
- 🟡 Medium (Orange)
- 🟠 High (Red-Orange)
- 🔴 Critical (Red)

**Response:** Color-coded announcement based on priority  
**Features:**
- Visual priority indicators
- Automatic timestamping
- TODO: Posts to announcements channel

---

### 💼 Business Operations

#### `/clock`
**Description:** Employee time tracking system  
**Usage:** 
- `/clock action:in` - Clock in
- `/clock action:out` - Clock out  
- `/clock action:status` - Check current status

**Permissions:** Everyone  
**Response:** 
- **Clock In:** Confirmation with timestamp
- **Clock Out:** Duration worked and confirmation
- **Status:** Current work status and hours

**Features:**
- Tracks work duration
- Prevents double clock-in
- Calculates total hours worked
- **Note:** Currently uses in-memory storage (reset on restart)
- **TODO:** Integrate with database for persistent records

---

#### `/structure`
**Description:** View organizational hierarchy  
**Usage:** `/structure`  
**Permissions:** Everyone  
**Response:** Visual tree diagram of company structure  
**Shows:**
- Executive level (C-suite)
- Management level (Departments)
- Staff level (Workers)
- Department statistics

---

#### `/realty`
**Description:** Check plot ownership and real estate information  
**Usage:** `/realty`  
**Permissions:** Everyone  
**Response:** Comprehensive property ownership report  
**Displays:**
- Commercial district plots
- Residential zones
- Industrial areas
- Occupancy statistics
- Available properties

**Data Source:** Template (replace with realty API/database)

---

#### `/econ-report`
**Description:** Generate AI-powered economic analysis  
**Usage:** `/econ-report`  
**Permissions:** Everyone  
**Response:** Detailed market analysis report including:
- Market overview and statistics
- Top performing sectors
- Key economic indicators
- AI-generated insights and recommendations

**Features:**
- Professional formatting
- Real-time data display (template)
- **TODO:** Connect to market APIs
- **TODO:** Integrate AI service for analysis
- **TODO:** Automated daily reports via cron job

---

### 💬 Social Features

#### `/private-chat`
**Description:** Create a secure one-on-one private channel  
**Usage:** `/private-chat user:@username`  
**Permissions:** Everyone  
**Response:** 
- Creates private text channel visible only to both users
- Channel naming format: `user-one-on-one-user`
- Sends welcome message in new channel
- Notifies target user via DM

**Features:**
- Permission-based privacy
- Checks for existing channels
- Automatic channel setup
- User-friendly notifications

**Requirements:** Bot needs "Manage Channels" permission

---

### 📋 Information

#### `/services`
**Description:** View company services and offerings  
**Usage:** `/services`  
**Permissions:** Everyone  
**Response:** Colorful embed displaying all services:
- Construction & Development
- Technology Solutions
- Business Consulting
- Agricultural Services
- Manufacturing

**Includes:** Contact info, hours, response times

---

#### `/rules`
**Description:** Display server rules and guidelines  
**Usage:** `/rules`  
**Permissions:** Everyone  
**Response:** Comprehensive rules covering:
1. General Conduct
2. Content Guidelines
3. Business Ethics
4. Workplace Standards
5. Security & Privacy
6. Enforcement Policies

**Format:** Professional red-themed embed with clear sections

---

#### `/help`
**Description:** Complete command reference and navigation guide  
**Usage:** `/help`  
**Permissions:** Everyone  
**Response:** Organized help menu with all commands grouped by category  
**Features:**
- Quick command descriptions
- Category organization
- Version information
- Support contact info
- Ephemeral response (only visible to requester)

---

## Command Categories Summary

| Category | Commands | Count |
|----------|----------|-------|
| HR & Applications | application, employees, wages, salaries | 4 |
| Communications | news, announcements | 2 |
| Business Operations | clock, structure, realty, econ-report | 4 |
| Social Features | private-chat | 1 |
| Information | services, rules, help | 3 |
| **Total** | | **14** |

---

## Permission Requirements

### Staff-Only Commands
- `/news` - Requires Manage Messages permission
- `/announcements` - Requires Manage Messages permission

### Bot Permissions Needed
For full functionality, the bot requires:
- View Channels
- Send Messages
- Embed Links
- Manage Channels (for private-chat)
- Read Message History
- Use Slash Commands
- Send Messages in Threads

### Recommended Bot Role Setup
1. Create a "DemocracyCraft Bot" role
2. Place it above restricted roles in hierarchy
3. Assign necessary permissions
4. Ensure proper channel access

---

## Integration Points (TODO)

All commands are currently using template/placeholder data. Here's what needs to be connected:

### Database Integration Required:
- ✅ Employee records (employees, wages, salaries commands)
- ✅ Application submissions (application command)
- ✅ Clock-in/out records (clock command)
- ✅ Property ownership data (realty command)
- ✅ News/announcement history (news, announcements commands)

### API Integration Required:
- ✅ Market data feeds (econ-report command)
- ✅ AI service for analysis (econ-report command)
- ✅ Minecraft server sync (optional, for real-time data)

### Automation Features:
- ⏰ Scheduled econ reports (node-cron)
- ⏰ Auto-clock-out reminders
- ⏰ Daily summary reports

---

## Customization Tips

### Changing Colors
Each command uses hex color codes in EmbedBuilder:
```javascript
.setColor('#FF0000')  // Change this hex code
```

### Modifying Templates
Edit the `.addFields()` sections in each command to change displayed information.

### Adding New Commands
1. Create file in `/commands` folder
2. Follow the template structure
3. Run `node deploy-commands.js`

### Adjusting Permissions
Change `.setDefaultMemberPermissions()` in command files or manage via Discord role settings.

---

**Last Updated:** Template Version 1.0.0  
**Framework:** Discord.js v14  
**Language:** JavaScript (Node.js)
