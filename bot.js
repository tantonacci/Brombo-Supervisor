//
//Deprecated - Read BromboSupervisor.py
//
//////////////////////////////////////////////////////////

// Run dotenv
require('dotenv').config();

const Discord = require('discord.js');
const client = new Discord.Client();

//IDs for the specific channel
let machine_id = [];
let maintenance_id = []; 

client.on('ready', async () => {
    console.log(`Logged in as ${client.user.tag}!`);
	try {
		let temp = await client.channels.cache.filter(channel => channel.name === "brombo-machine");
		
		for (let i = 0; i < temp.array().length; i++){
			machine_id.push(temp.array()[i].id);
		}
		temp = await client.channels.cache.filter(channel => channel.name === "brombo-maintenance");
		for (let i = 0; i < temp.array().length; i++){
			maintenance_id.push(temp.array()[i].id);
		}
		
		console.log(maintenance_id.length);
		console.log(machine_id[0]);
		
	} catch(err) {
		console.error(err);
	}
});

client.login(process.env.DISCORD_TOKEN);

//When receiving message
client.on('message', async msg => {
	
	//Only react to messages in brombo-machine
	for (let channel_number = 0; channel_number < machine_id.length; channel_number++) {
		if (msg.channel.id === machine_id[channel_number]) {

			//Get the previous Message
			let prevMsg;
			let curMsg = msg.content;
			try {
				prevMsg = await getPrevMsg(channel_number);
				
			} catch(err){
				console.error(err);
			}
			
			//Check the difference between the messages
			let diff = checkDiff(curMsg, prevMsg);
			
			//Message the person and react to the post if its too big of a difference
			if (diff > 5) {
				let user = msg.author.id
				switch (Math.floor(Math.random() * 5)) {
					case 0:
						client.channels.cache.get(maintenance_id[channel_number]).send("Hey there <@" + user + ">, pretty big difference buddy");
					break;
					case 1:
						client.channels.cache.get(maintenance_id[channel_number]).send("Woah there <@" + user + ">, you just gave me whiplash!");
					break;
					case 2:
						client.channels.cache.get(maintenance_id[channel_number]).send("Slow down there <@" + user + ">, take it easy kiddo");
					break;
					case 3:
						client.channels.cache.get(maintenance_id[channel_number]).send("Hey <@" + user + ">, you sound awfully dumb right now");
					break;
					default:
						client.channels.cache.get(maintenance_id[channel_number]).send("<@" + user + "> smells bad");
					break;
				}
				msg.react('697521710391492638');
			}
		}
	}
});

async function getPrevMsg(channel_number) {
	let lastMsg;
	try {
		//get the last 2 messages sent in brombo-machine in collection form
		msgs = await client.channels.cache.get(machine_id[channel_number]).messages.fetch({ limit: 2 });
		
		//Get a string of the second-most recent message
		lastMsg = msgs.array()[1].content;
	} catch(err) {
		console.error(err);
	}
	return lastMsg;
}

function checkDiff(msg1, msg2) {
	let n = msg1.length;
	let m = msg2.length;
	
	//Edit distance algorithm
	var M = new Array(n + 1);
	for (let i = 0; i <= n; i++) {
		M[i] = new Array(m + 1);
	}
	
	//If word 2 is empty
	for (let i = 0; i <= n; i++) {
		M[i][m] = n - i;
	}
	
	//If word 1 is empty
	for (let j = 0; j <= m; j++) {
		M[n][j] = m - j;
	}
	
	//Finding shortest path
	for (let i = n-1; i >= 0; i--) {
		for (let j = m-1; j >= 0; j--) {
			if (msg1.charAt(i) !== msg2.charAt(j)) {
				M[i][j] = Math.min((1 + M[i+1][j]), (1 + M[i][j+1]), (1 + M[i+1][j+1]));
			} else {
				M[i][j] = Math.min(M[i+1][j], M[i][j+1], M[i+1][j+1]);
			}
		}
	}
	
	return M[0][0];
}