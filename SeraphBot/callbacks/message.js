const { Log } = require('../utils/logger');
const Commands = require('../commands');
const CommandKeys = Object.keys(Commands);
const ServerConfig = require('../models/serverConfigs.model');

module.exports = async function message(Message){
    const Server = await ServerConfig.findOne({GuildID: Message.guild.id})

    if(!Server) return Log(` { ${Message.guild.name} } is not a valid server`)
    if(!Message.content.startsWith(Server.Config.Prefix)) return
    if(Message.channel.parent.id !== Server.Config.SeraphCategory) return;

    const args = Message.content.substring(1).split(' ');
    const Command = Commands[args[0]];
    if(Command && Command.Run(Message));
}
