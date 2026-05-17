const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('rules')
        .setDescription('View server rules and guidelines'),
    async execute(interaction) {
        const rulesEmbed = new EmbedBuilder()
            .setColor('#F44336')
            .setTitle('📜 DemocracyCraft Server Rules')
            .setDescription('Please read and follow all server rules to maintain a positive community.')
            .addFields(
                { 
                    name: '1️⃣ General Conduct', 
                    value: '• Be respectful to all members\n• No harassment, bullying, or discrimination\n• No hate speech or offensive language\n• Maintain professional communication', 
                    inline: false 
                },
                { 
                    name: '2️⃣ Content Guidelines', 
                    value: '• No spam or excessive self-promotion\n• Keep discussions relevant to channels\n• No NSFW or inappropriate content\n• Use appropriate channels for topics', 
                    inline: false 
                },
                { 
                    name: '3️⃣ Business Ethics', 
                    value: '• No fraud or deceptive practices\n• Honor contracts and agreements\n• Fair competition only\n• Report violations to management', 
                    inline: false 
                },
                { 
                    name: '4️⃣ Workplace Standards', 
                    value: '• Clock in/out properly using /clock command\n• Complete assigned tasks on time\n• Communicate professionally with colleagues\n• Follow company policies and procedures', 
                    inline: false 
                },
                { 
                    name: '5️⃣ Security & Privacy', 
                    value: '• Do not share confidential information\n• Protect your account credentials\n• No unauthorized access to systems\n• Report security concerns immediately', 
                    inline: false 
                },
                { 
                    name: '6️⃣ Enforcement', 
                    value: 'Violations may result in:\n• Warning\n• Temporary suspension\n• Permanent ban\n• Termination of employment', 
                    inline: false 
                }
            )
            .addFields(
                { name: 'Last Updated', value: `<t:${Math.floor(Date.now() / 1000)}:R>`, inline: true },
                { name: 'Questions?', value: 'Contact HR or Management', inline: true },
                { name: 'Acknowledgment', value: 'By using this server, you agree to these rules', inline: true }
            )
            .setFooter({ text: 'DemocracyCraft - Building Community Together' })
            .setTimestamp();

        await interaction.reply({
            embeds: [rulesEmbed],
            ephemeral: true
        });

        console.log(`Rules viewed by: ${interaction.user.tag}`);
    },
};
