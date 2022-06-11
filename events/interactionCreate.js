const { authorId } = require("../config.json");

module.exports = {
	name: "interactionCreate",

	async execute(client, interaction) {

		if (!interaction.isCommand() || interaction.user.id === client.id) return;

		const command = client.commands.get(interaction.commandName);

		if (!command) return;

		if (command.restriction.includes("authorOnly") && interaction.user.id !== authorId) {
			interaction.reply({ content: "Ops, você não tem permissão para usar esse comando :|", ephemeral: true });
			return;
		}

		try {
			await command.execute(interaction);
		} catch (error) {
			console.error(`> ${error.name} | ${error.message}`);
			await interaction.reply({ content: "Houve um erro ao tentar executar esse comando", ephemeral: true });
		}
	}
};