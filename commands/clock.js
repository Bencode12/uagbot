const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

// Simple in-memory storage (replace with database in production)
const clockStatus = new Map();

module.exports = {
    data: new SlashCommandBuilder()
        .setName('clock')
        .setDescription('Clock in or out for work')
        .addStringOption(option =>
            option.setName('action')
                .setDescription('Clock action')
                .setRequired(true)
                .addChoices(
                    { name: 'Clock In', value: 'in' },
                    { name: 'Clock Out', value: 'out' },
                    { name: 'Check Status', value: 'status' }
                )),
    async execute(interaction) {
        const action = interaction.options.getString('action');
        const userId = interaction.user.id;
        const userName = interaction.user.tag;

        if (action === 'in') {
            // Clock in
            if (clockStatus.has(userId)) {
                return interaction.reply({
                    content: '⚠️ You are already clocked in!',
                    ephemeral: true
                });
            }

            const clockInTime = new Date();
            clockStatus.set(userId, {
                status: 'in',
                time: clockInTime,
                timestamp: Math.floor(clockInTime.getTime() / 1000)
            });

            const embed = new EmbedBuilder()
                .setColor('#4CAF50')
                .setTitle('✅ Clocked In')
                .setDescription(`${userName} has successfully clocked in.`)
                .addFields(
                    { name: 'Clock In Time', value: `<t:${Math.floor(clockInTime.getTime() / 1000)}:F>`, inline: true },
                    { name: 'Status', value: '🟢 Working', inline: true }
                )
                .setFooter({ text: 'DemocracyCraft Time Tracking' })
                .setTimestamp();

            await interaction.reply({ embeds: [embed] });
            console.log(`${userName} clocked in at ${clockInTime}`);

        } else if (action === 'out') {
            // Clock out
            if (!clockStatus.has(userId) || clockStatus.get(userId).status !== 'in') {
                return interaction.reply({
                    content: '⚠️ You are not currently clocked in!',
                    ephemeral: true
                });
            }

            const clockInData = clockStatus.get(userId);
            const clockOutTime = new Date();
            const workDuration = Math.floor((clockOutTime - clockInData.time) / 1000 / 60); // minutes

            clockStatus.set(userId, {
                status: 'out',
                lastClockIn: clockInData.time,
                lastClockOut: clockOutTime,
                duration: workDuration
            });

            const hours = Math.floor(workDuration / 60);
            const minutes = workDuration % 60;

            const embed = new EmbedBuilder()
                .setColor('#FF9800')
                .setTitle('🔴 Clocked Out')
                .setDescription(`${userName} has successfully clocked out.`)
                .addFields(
                    { name: 'Clock Out Time', value: `<t:${Math.floor(clockOutTime.getTime() / 1000)}:F>`, inline: true },
                    { name: 'Work Duration', value: `${hours}h ${minutes}m`, inline: true },
                    { name: 'Status', value: '⚪ Off Duty', inline: true }
                )
                .setFooter({ text: 'DemocracyCraft Time Tracking' })
                .setTimestamp();

            await interaction.reply({ embeds: [embed] });
            console.log(`${userName} clocked out. Worked for ${hours}h ${minutes}m`);

        } else if (action === 'status') {
            // Check status
            const userStatus = clockStatus.get(userId);

            if (!userStatus) {
                const embed = new EmbedBuilder()
                    .setColor('#757575')
                    .setTitle('📊 Clock Status')
                    .setDescription(`${userName} is not currently tracked.`)
                    .addFields(
                        { name: 'Status', value: 'Unknown', inline: true },
                        { name: 'Action', value: 'Use `/clock in` to start tracking', inline: true }
                    )
                    .setFooter({ text: 'DemocracyCraft Time Tracking' })
                    .setTimestamp();

                return interaction.reply({ embeds: [embed], ephemeral: true });
            }

            let statusText, statusColor, additionalInfo;
            
            if (userStatus.status === 'in') {
                statusText = '🟢 Currently Working';
                statusColor = '#4CAF50';
                const currentTime = Math.floor(Date.now() / 1000);
                const workingTime = currentTime - userStatus.timestamp;
                const hours = Math.floor(workingTime / 3600);
                const minutes = Math.floor((workingTime % 3600) / 60);
                additionalInfo = `Working for: ${hours}h ${minutes}m`;
            } else {
                statusText = '⚪ Off Duty';
                statusColor = '#757575';
                additionalInfo = userStatus.duration ? `Last shift: ${Math.floor(userStatus.duration / 60)}h ${userStatus.duration % 60}m` : 'No recent shifts';
            }

            const embed = new EmbedBuilder()
                .setColor(statusColor)
                .setTitle('📊 Clock Status')
                .setDescription(`Current status for ${userName}`)
                .addFields(
                    { name: 'Status', value: statusText, inline: true },
                    { name: 'Details', value: additionalInfo, inline: true }
                )
                .setFooter({ text: 'DemocracyCraft Time Tracking' })
                .setTimestamp();

            await interaction.reply({ embeds: [embed], ephemeral: true });
        }
    },
};
