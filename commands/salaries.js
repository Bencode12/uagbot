const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('salaries')
        .setDescription('List annual salaries of all employees'),
    async execute(interaction) {
        // TODO: Fetch salary data from database
        
        const salariesEmbed = new EmbedBuilder()
            .setColor('#9C27B0')
            .setTitle('💼 Employee Annual Salaries')
            .setDescription('Annual salary breakdown for all employees')
            .addFields(
                { name: 'Executive Level', value: '• CEO: $1,040,000/year\n• CFO: $936,000/year\n• COO: $884,000/year\n• CTO: $832,000/year', inline: false },
                { name: 'Management Level', value: '• Manager: $520,000/year\n• Supervisor: $416,000/year', inline: false },
                { name: 'Staff Level', value: '• Senior Worker: $312,000/year\n• Worker: $260,000/year\n• Junior Worker: $208,000/year', inline: false }
            )
            .addFields(
                { name: 'Average Salary', value: '$494,000/year', inline: true },
                { name: 'Total Annual Payroll', value: '$5,928,000/year', inline: true },
                { name: 'Pay Period', value: 'Bi-weekly', inline: true }
            )
            .setFooter({ text: 'DemocracyCraft Compensation' })
            .setTimestamp();

        await interaction.reply({
            embeds: [salariesEmbed]
        });

        console.log(`Salary information requested by: ${interaction.user.tag}`);
    },
};
