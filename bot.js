const Discord = require('discord.js');
const client = new Discord.Client();

function commandIs(str, msg){
    return msg.content.toLowerCase().startsWith("u!" + str);
}

function pluck(array) {
    return array.map(function(item) { return item["name"]; });
}

function hasRole(mem, role) {
    if(pluck(mem.roles).includes(role)){
        return true;
    } else {
        return false;
    }
}

client.on('ready', () => {
    console.log('The bot is online!');
});

client.on('message', message => {
    var args = message.content.split(/[ ]+/);
    if(commandIs("hello", message)){
        message.channel.sendMessage('Hello there, ' + message.author.username);
    }
    if(commandIs("introduction", message)){
        message.channel.sendMessage('UnreasonableBot is a simple bot created by Unreasonable v.1');
    }
    if(commandIs("say", message)){
        if(hasRole(message.member, "Moderator") || hasRole(message.member, "Owner") || hasRole(message.member, "Tester")){
            if(args.length === 1){
                message.channel.sendMessage('You did not define a argument. Usage: `u!say [message to say]`');
            } else {
                message.channel.sendMessage(args.join(" ").substring(5));
            }
        } else {
            message.channel.sendMessage('You are not an `Admin`.');
        }
    }
    if(commandIs("delete", message)){
        if(hasRole(message.member, "Moderator") || hasRole(message.member, "Owner") || hasRole(message.member, "Tester")){
            if(args.length >= 3){
                message.channel.sendMessage('You did not define a argument. Usage: `u!delete (number of messages to delete)`');
            } else {
                var msg;
                if(args.length === 1){
                    msg=2;
                } else {
                    msg=parseInt(args[1]) + 1;
                }
                message.channel.fetchMessages({limit: msg}).then(messages => message.channel.bulkDelete(messages)).catch(console.error);
            }
        } else {
            message.channel.sendMessage('You are not an `Admin`.');
        }
    }
    if(commandIs("kick", message)){
        if(hasRole(message.member, "Moderator") || hasRole(message.member, "Owner") || hasRole(message.member, "Tester")){
        if(args.length === 1){
                message.channel.sendMessage('You did not define a argument. Usage: `u!kick [user to kick]`');
            } else {
                message.guild.member(message.mentions.users.first()).kick();
            }
        }
    }
});

client.login('MzI3NjEwMDEyMzgzODM4MjIw.DC38Zg.TFvHj4ER_Jhtt2sHozamarO4mdY');