var Bottleneck = require("bottleneck/es5");
const { Log } = require('../utils/logger');
const ServerConfig = require('../models/serverConfigs.model');

const limiter = new Bottleneck({
    minTime: 3000
  });

module.exports = async function ready(){
    console.log(`Logged in as ${global.client.user.tag}`);
    const Guilds = client.guilds.cache.map(guild => guild.id);

    Array.from(Guilds).forEach( GuildID=> limiter.schedule(async()=>{
      const Server = await ServerConfig.findOne({GuildID: GuildID});
      const Guild = await client.guilds.fetch(GuildID);
      const GuildName = Guild.name

    
      if(Server) {
          //If current GuildName is different from Database Change Database GuildName
        if(GuildName !== Server.GuildName){
          Server.GuildName = GuildName;
          await Server.save()
        }
        return Log(`Loaded server with ${GuildID} & Name ${Server.GuildName}`);
      }
      
      //If Guild Doesn't exist in Database add it
      const NewConfig = ServerConfig.create({
        GuildID: GuildID,
        GuildName: GuildName
      })
      Log(`Created a new server config for server [ ${GuildName} ]`)
    }))
}
