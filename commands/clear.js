module.exports = {
    run: async (message, args) => {
        if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.sen('Vous n\'êtes pas un membre de la modération, vous ne pouvez pas utiliser cette commande.')
        const count = args[0]
        if (!/\d+/.test(count)) return message.channel.send('Veuillez indiquez le nombre de message à supprimer.')
        if (count < 1 || count > 99) return message.channel.send('Le nombre de message à supprimer doit être compris entre 1 et 99.')
        const { size } = await message.channel.bulkDelete(Number(count) +1, true)
        message.channel.send(`${size - 1} messages ont été supprimés !`).then(sent => sent.delete({timeout: 5e3}))
    },
    name: 'clear',
    guildOnly: true,
    help: {
        description: 'Supprime les messages précédent !',
        syntax: ''
    }
}