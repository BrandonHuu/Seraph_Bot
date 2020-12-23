const { Log } = require("../utils/logger");

const Help = 'Command for chainging Server Config variables';
const ServerConfig = require('../models/serverConfigs.model');
const ChangeableFilds ={
    Prefix : false,
        Leader_Role : true,
        SeraphCategory: true,
        Leader_Role: true,
        Muted_Role: true
}
const Run = async function(Message){
    const args = Message.content.split(' ');
    if(!ChangeableFilds[args[1]]) return Message.reply(`\`${args[1]}\` Is not a changable field`);
    if(!args[2]) return Message.reply(`You must supply a value for ${args[1]} to change to`);
    const Config = await ServerConfig.findOne({GuildID: Message.guild.id});
    if(!Config.Config.Leader_Role) return Message.reply(`You must set the \`Leader_Role\` option to a server role the Current value is \`${Config.Leader_Role}\``);
    const Authorized = Message.member.roles.cache.find(role => role.id === Config.Config.Leader_Role);
    if(!Authorized) return;
    Config.Config[args[1]] = args[2];
    await Config.save()
    Message.reply(`\`\`\`json\n${JSON.stringify(Config)}\`\`\``)
}

module.exports ={
    Run,
    Help
}