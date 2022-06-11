const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("bau-noit")
		.setDescription("Responde com um \"Bau noit\", marcando o autor da mensagem"),
	
	restriction: [],
	
	async execute(interaction) {
		await interaction.reply("Bau noit");
	}
};