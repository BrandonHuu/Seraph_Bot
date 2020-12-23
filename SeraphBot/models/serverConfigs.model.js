const mongoose = require('mongoose');
const accountScheme = mongoose.Schema({
    GuildID : {type: String,required:true,unique: true},
    GuildName : {type: String},
    Config: {
        Prefix : {type: String, require:true,default:'$'},
        Leader_Role : {type: String},
        Muted_Role: {type: String},
        SeraphCategory: {type: String},
        TextChannels:{
            VoteAnnouncements :{type:String},
            VoteResults: {type:String},
            VoteSubmissions: {type: String},
            VoteMessageID: {type: String}
        }
    }
},{timestamps:true});


module.exports = mongoose.models.Account || mongoose.model('Account',accountScheme);