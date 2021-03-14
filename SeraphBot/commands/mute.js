const { Log } = require("../utils/logger");

const Help = 'Command for showing server configuration';
const ServerConfig = require('../models/serverConfigs.model');

const Run = async function(Message){
    const Config = await ServerConfig.findOne({GuildID: Message.guild.id});
    //Checks Database for Role configurations
    if(!Config.Config.Muted_Role) return Message.reply(`You must set the \`Muted_Role\` option to a existing role`)
    if(!Config.Config.Leader_Role) return Message.reply(`You must set the \`Leader_Role\` option to a server role the Current value is \`${Config.Leader_Role}\``);
    
    //Checks if user is allowed to use the command
    if(!Message.guild.me.hasPermission("MANAGE_ROLES") return Message.channel.send(`I don't have permissions to give roles`).catch(console.error)  //checks if the bot has permissions to add roles

    const Authorized = Message.member.roles.cache.get(Config.Config.Leader_Role);
    if(!Authorized) return;
    const args = Message.content.split(' ');

    await Message.guild.members.fetch().catch(console.error)  //fetch to fill up the <Guild>.members
    const MuteTarget = Message.mentions.members.first() || Message.guild.members.cache.get(args[1])
    //* Enable privalaged intents in the Developer portal or this won't work 
    if(!MuteTarget) return Message.reply(`Please mention a valid role or provide a valid role id`).catch(console.error)
    const MuteRole = Message.guild.role.cache.get(Config.Config.Muted_role)
    if(!MuteRole) return Message.reply(`The role with the id \`Config.Config.Muted_Role\` is invalid or doesn't exist in this server`).catch(console.error);
    if(!MuteRole.editable) return Message.channel.send(`I don't have permissions to give out the muted role`).catch(console.error);  // Checks if the bot can send out the role

    await MuteTarget.roles.add(MuteRole).catch(console.error);
    Message.reply(`${MuteTarget.user.tag} has been muted`).catch(console.error)
}

module.exports = {
    Run,
    Help
}
