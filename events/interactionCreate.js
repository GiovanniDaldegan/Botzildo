const { ownerId } = require("../config.json");

module.exports = {
	name: "interactionCreate",

	async execute(client, interaction) {
		if (!interaction.isCommand() || interaction.user.id === client.id) return;

		const command = client.commands.get(interaction.commandName);

		if (!command) return;

		if (command.restriction.includes("ownerOnly") && interaction.user.id !== ownerId) {
			interaction.reply({ content: "Ops, você não tem permissão para usar esse comando :confused:", ephemeral: true });
			return;
		}

		// TODO: fazer o bot também avisar que houve um erro quando o usuário usar um comando que não existe

		try {
			await command.execute(client, interaction);
		} catch (error) {
			console.error(error);
			await interaction.reply({ content: "Houve um erro ao tentar executar esse comando", ephemeral: true });
		}
	}
};