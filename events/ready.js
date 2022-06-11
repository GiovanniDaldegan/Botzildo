module.exports = {
	name: "ready",
	once: true,
	execute(client) {
		console.log(`${client.name} v${client.version}\nPronto. Logado como ${client.user.tag}`);
	}
};