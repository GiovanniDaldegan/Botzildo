module.exports = {
	name: "ready",
	once: true,
	execute(client) {
		console.log(`${client.name} v${client.version}\nLogado como ${client.user.tag}`);
	}
};