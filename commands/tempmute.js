const parseDuration = require('parse-duration'),
    humanizeDuration = require('humanize-duration')
 
module.exports = {
    run: async (message, args) => {
        if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send('Vous n\'êtes pas un membre de la modération, vous ne pouvez pas utiliser cette commande.')
        const member = message.mentions.members.first()
        if (!member) return message.channel.send('Veuillez spécifier le membre à mute.')
        if (member.id === message.guild.ownerID) return message.channel.send('Vous ne pouvez pas mute le propriétaire du serveur.')
        if (message.member.roles.highest.comparePositionTo(member.roles.highest) < 1 && message.author.id !== message.guild.ownerID) return message.channel.send('Vous ne pouvez pas mute ce membre.')
        if (!member.manageable) return message.channel.send('Le bot ne peut pas mute ce membre.')
        const duration = parseDuration(args[1])
        if (!duration) return message.channel.send('Veuillez indiquer la durée du mute.')
        const reason = args.slice(2).join(' ') || 'Aucune raison fournie.'
        let muteRole = message.guild.roles.cache.find(role => role.name === 'Muted')
        if (!muteRole) {
            muteRole = await message.guild.roles.create({
                data: {
                    name: 'Muted',
                    permissions: 0
                }
            })
            message.guild.channels.cache.forEach(channel => channel.createOverwrite(muteRole, {
                SEND_MESSAGES: false,
                CONNECT: false,
                ADD_REACTIONS: false
            }))
        }
        await member.roles.add(muteRole)
        message.channel.send(`${member} a été mute pendant ${humanizeDuration(duration, {language: 'fr'})} !`)
        setTimeout(() => {
            if (member.deleted || !member.manageable) return
            member.roles.remove(muteRole)
            message.channel.send(`${member} a été démute.`)
        }, duration)
    },
    name: 'tempmute',
    guildOnly: true,
    help: {
        description: 'Bannie un membre du serveur !',
        syntax: '<@membre> 10s/m/h/d ( s = seconde, m = minutes, h = heures, d = jours !'
    }
}
