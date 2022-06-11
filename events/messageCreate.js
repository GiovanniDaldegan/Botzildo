module.exports = {
	name: "messageCreate",
	
	async execute(client, message) {
		console.log(message.content);

		// if (message.content.startsWith(".")) {
		// 	await message.reply("É, começa com \ mesmo");
		// }
	}
};