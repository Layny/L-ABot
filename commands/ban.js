module.exports = {
    run: async (message, args) => {
        if (!message.member.hasPermission('BAN_MEMBERS')) return message.channel.send('Vous n\'êtes pas un membre de la modération, vous ne pouvez pas utiliser cette commande.')
        const member = message.mentions.members.first()
        if (!member) return message.channel.send('Veuillez spécifier le membre à bannir du serveur.')
        if (member.id === message.guild.ownerID) return message.channel.send('Vous ne pouvez pas bannir le propriétaire du serveur.')
        if (message.member.roles.highest.comparePositionTo(member.roles.highest) < 1 && message.author.id !== message.guild.ownerID) return message.channel.send('Vous ne pouvez pas bannir ce membre.')
        if (!member.bannable) return message.channel.send('Le bot ne peut pas bannir ce membre.')
        const reason = args.slice(1).join(' ') || 'Aucune raison fournie'
        await member.ban(reason)
        message.channel.send(`${member.user.tag} a été banni !`)
    },
    name: 'ban',
    guildOnly: true,
    help: {
        description: 'Bannie un membre du serveur !',
        syntax: '<@membre> [raison]'
    }
}