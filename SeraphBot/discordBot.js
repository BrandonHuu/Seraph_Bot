const client = new (require('discord.js')).Client();
const callbacks = require('./callbacks')
Object.keys(callbacks).forEach(key => client.on(key, callbacks[key]));
module.exports = client