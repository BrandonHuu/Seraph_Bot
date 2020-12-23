const { Log } = require("../utils/logger");

const Help = 'Command for showing server configuration';
const ServerConfig = require('../models/serverConfigs.model');

const Run = async function(Message){
    const Config = await ServerConfig.findOne({GuildID: Message.guild.id});
    //Checks Database for Role configurations
    if(!Config.Config.Muted_Role) return Message.reply(`You must set the \`Muted_Role\` option to a existing role`)
    if(!Config.Config.Leader_Role) return Message.reply(`You must set the \`Leader_Role\` option to a server role the Current value is \`${Config.Leader_Role}\``);
    
    //Checks if user is allowed to use the command
    const Authorized = Message.member.roles.cache.find(role => role.id === Config.Config.Leader_Role);
    if(!Authorized) return;

    const args = Message.content.split(' ');

    
    let UserID = null;
    if(args[1].startsWith('<@!')){
        UserID = args[1].replace('<@!','').replace('>','')
    }else UserID = args[1]
    if(UserID.length != 18 || !isNumeric(UserID)) {
        return Message.reply(`Invalid user given for the Mute command`);
    }

    const MuteTarget = await Message.guild.members.fetch(UserID)
    const MuteRole = await Message.guild.roles.fetch(Config.Config.Muted_Role);
    if(!MuteRole) return Message.reply(`The role with the id \`Config.Config.Muted_Role\` is invalid or doesn't exist in this server`);


    MuteTarget.roles.add(MuteRole);
    Message.reply(`${MuteTarget.user.tag} has been muted`)
}

module.exports ={
    Run,
    Help
}

function isNumeric(str) {
    if (typeof str != "string") return false // we only process strings!  
    return !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
           !isNaN(parseFloat(str)) // ...and ensure strings of whitespace fail
  }