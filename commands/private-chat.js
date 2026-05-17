const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('private-chat')
        .setDescription('Create a private one-on-one chat with another user')
        .addUserOption(option =>
            option.setName('user')
                .setDescription('The user to create a private chat with')
                .setRequired(true)),
    async execute(interaction) {
        const targetUser = interaction.options.getUser('user');
        
        // Prevent creating chat with self
        if (targetUser.id === interaction.user.id) {
            return interaction.reply({
                content: '❌ You cannot create a private chat with yourself!',
                ephemeral: true
            });
        }

        await interaction.deferReply({ ephemeral: true });

        try {
            // Create a private channel name
            const channelName = `${interaction.user.username}-one-on-one-${targetUser.username}`.toLowerCase().replace(/[^a-z0-9-]/g, '').substring(0, 100);
            
            // Check if channel already exists
            const existingChannel = interaction.guild.channels.cache.find(
                channel => 
                    channel.name.includes('one-on-one') && 
                    channel.permissionOverwrites.cache.has(interaction.user.id) &&
                    channel.permissionOverwrites.cache.has(targetUser.id)
            );

            if (existingChannel) {
                return interaction.editReply({
                    content: `⚠️ A private chat already exists: ${existingChannel}`,
                    ephemeral: true
                });
            }

            // Create the private channel
            const channel = await interaction.guild.channels.create({
                name: channelName,
                type: 0, // Text channel
                permissionOverwrites: [
                    {
                        id: interaction.guild.roles.everyone,
                        deny: [PermissionFlagsBits.ViewChannel],
                    },
                    {
                        id: interaction.user.id,
                        allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.SendMessages, PermissionFlagsBits.ReadMessageHistory],
                    },
                    {
                        id: targetUser.id,
                        allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.SendMessages, PermissionFlagsBits.ReadMessageHistory],
                    },
                ],
            });

            // Send welcome message in the new channel
            await channel.send({
                embeds: [
                    new EmbedBuilder()
                        .setColor('#9B59B6')
                        .setTitle('🔒 Private Chat Created')
                        .setDescription(`This is a private conversation between ${interaction.user} and ${targetUser}.`)
                        .addFields(
                            { name: 'Created by', value: interaction.user.tag },
                            { name: 'Participants', value: `${interaction.user.tag}\n${targetUser.tag}` },
                            { name: 'Note', value: 'Only you two can see and access this channel.' }
                        )
                        .setFooter({ text: 'DemocracyCraft Private Messaging' })
                        .setTimestamp()
                ]
            });

            // Notify both users
            await interaction.editReply({
                content: `✅ Private chat created successfully! Check out ${channel}`,
                ephemeral: true
            });

            // Send DM to target user (optional - may fail if they have DMs disabled)
            try {
                await targetUser.send({
                    embeds: [
                        new EmbedBuilder()
                            .setColor('#9B59B6')
                            .setTitle('📨 New Private Chat')
                            .setDescription(`${interaction.user} has created a private chat with you.`)
                            .addFields(
                                { name: 'Channel', value: channel.toString() },
                                { name: 'Click to join', value: 'Use the link above to access the private channel.' }
                            )
                            .setFooter({ text: 'DemocracyCraft' })
                            .setTimestamp()
                    ]
                });
            } catch (error) {
                console.log(`Could not DM ${targetUser.tag} - DMs may be disabled`);
            }

            console.log(`Private chat created by ${interaction.user.tag} with ${targetUser.tag}`);

        } catch (error) {
            console.error('Error creating private chat:', error);
            await interaction.editReply({
                content: '❌ Failed to create private chat. Please ensure I have the necessary permissions.',
                ephemeral: true
            });
        }
    },
};
