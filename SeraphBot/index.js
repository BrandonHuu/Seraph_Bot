const client = require('./discordBot');
global.client = client;
const Config = require('./config');
const mongoose = require('mongoose');
const { program } = require('blessed');

mongoose.connect(Config.mongoose.url,Config.mongoose.options).then(()=>{
    console.log('Connected to MongoDB');
    client.login(Config.discord.token);
});
