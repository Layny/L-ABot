module.exports = {
    run: async (message, args) => {
        if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send('Vous n\'êtes pas un membre de la modération, vous ne pouvez pas utiliser cette commande.')
        const member = message.mentions.members.first()
        if (!member) return message.channel.send('Veuillez spécifier le membre à démuter sur le serveur.')
        if (member.id === message.guild.ownerID) return message.channel.send('Vous ne pouvez pas démute le propriétaire du serveur.')
        if (message.member.roles.highest.comparePositionTo(member.roles.highest) < 1 && message.author.id !== message.guild.ownerID) return message.channel.send('Vous ne pouvez pas démute ce membre.')
        if (!member.manageable) return message.channel.send('Le bot ne peut pas démute ce membre.')
        const reason = args.slice(1).join(' ') || 'Aucune raison fournie.'
        const muteRole = message.guild.roles.cache.find(role => role.name === 'Muted')
        if (!muteRole) return message.channel.send('Il n\'y a pas de muterole.')
        await member.roles.remove(muteRole)
        message.channel.send(`${member} a été démute !`)
    },
    name: 'unmute',
    guildOnly: true,
    help: {
        description: 'Démute un membre du serveur !',
        syntax: '<@membre>'
    }
}