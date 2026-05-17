const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('employees')
        .setDescription('List all employees in the company'),
    async execute(interaction) {
        // TODO: Fetch employees from database
        // This is a template - replace with actual database query
        
        const employeesEmbed = new EmbedBuilder()
            .setColor('#4CAF50')
            .setTitle('👥 DemocracyCraft Employees')
            .setDescription('Complete list of all company employees')
            .addFields(
                { name: 'Management', value: '• CEO\n• CFO\n• COO\n• CTO', inline: true },
                { name: 'Staff', value: '• Manager 1\n• Manager 2\n• Supervisor 1\n• Supervisor 2', inline: true },
                { name: 'Workers', value: '• Employee 1\n• Employee 2\n• Employee 3\n• Employee 4', inline: true }
            )
            .addFields(
                { name: 'Total Employees', value: '12', inline: true },
                { name: 'Active Now', value: '8', inline: true },
                { name: 'On Leave', value: '2', inline: true }
            )
            .setFooter({ text: 'DemocracyCraft HR Department' })
            .setTimestamp();

        await interaction.reply({
            embeds: [employeesEmbed]
        });

        console.log(`Employee list requested by: ${interaction.user.tag}`);
    },
};
