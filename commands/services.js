const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('services')
        .setDescription('View company services and offerings'),
    async execute(interaction) {
        const servicesEmbed = new EmbedBuilder()
            .setColor('#00BCD4')
            .setTitle('🛠️ DemocracyCraft Services')
            .setDescription('Comprehensive services offered by DemocracyCorp')
            .addFields(
                { 
                    name: '🏗️ Construction & Development', 
                    value: '• Commercial Building Projects\n• Residential Housing Development\n• Infrastructure Planning\n• Urban Design Consulting', 
                    inline: false 
                },
                { 
                    name: '💻 Technology Solutions', 
                    value: '• Custom Software Development\n• IT Infrastructure Management\n• Cybersecurity Services\n• Cloud Computing Solutions', 
                    inline: false 
                },
                { 
                    name: '📊 Business Consulting', 
                    value: '• Market Analysis & Research\n• Financial Planning\n• Strategic Consulting\n• Risk Management', 
                    inline: false 
                },
                { 
                    name: '🌾 Agricultural Services', 
                    value: '• Farm Management\n• Crop Optimization\n• Supply Chain Logistics\n• Sustainable Farming Practices', 
                    inline: false 
                },
                { 
                    name: '⚙️ Manufacturing', 
                    value: '• Industrial Production\n• Quality Control\n• Product Development\n• Distribution Networks', 
                    inline: false 
                }
            )
            .addFields(
                { name: 'Service Hours', value: '24/7 Support Available', inline: true },
                { name: 'Contact', value: 'services@democracycraft.com', inline: true },
                { name: 'Response Time', value: 'Within 24 hours', inline: true }
            )
            .setFooter({ text: 'DemocracyCraft - Excellence in Service' })
            .setTimestamp();

        await interaction.reply({
            embeds: [servicesEmbed]
        });

        console.log(`Services viewed by: ${interaction.user.tag}`);
    },
};
