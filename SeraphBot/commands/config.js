const { Log } = require("../utils/logger");

const Help = 'Command for showing server configuration';
const ServerConfig = require('../models/serverConfigs.model');

const Run = async function(Message){
    const Config = await ServerConfig.findOne({GuildID: Message.guild.id});

    if(!Config.Config.Leader_Role) return Message.reply(`You must set the \`Leader_Role\` option to a server role the Current value is \`${Config.Leader_Role}\``);
    const Authorized = Message.member.roles.cache.find(role => role.id === Config.Config.Leader_Role);
    if(!Authorized) return;

    //Replies with the serverConfig of the current server
    Message.reply(`\`\`\`json\n${JSON.stringify(Config)}\`\`\``)
}

module.exports ={
    Run,
    Help
}