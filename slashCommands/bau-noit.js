const { SlashCommandBuilder } = require("@discordjs/builders");


module.exports = {
	data: new SlashCommandBuilder()
		.setName("bau-noit")
		.setDescription("Manda um \"Bau noit\" para o autor da mensagem"),
	
	restriction: [],
	
	async execute(client, interaction) {
		const now = new Date().getHours();
		if (now < 6 || now > 18) {
			await interaction.reply("Bau noit");
		} else {
			await interaction.reply({ content: "Ainda não está de noite/madrugada :confused:. Use o comando mais tarde", ephemeral: true});
		}
	}
};