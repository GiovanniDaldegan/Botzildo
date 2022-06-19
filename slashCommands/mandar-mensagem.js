const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("mandar-mensagem")
		.setDescription("Manda uma mensagem personalizada para um dado canal do servidor em questão")
		// .setDefaultPermission()

		.addChannelOption(channel =>
			channel
				.setName("canal")
				.setDescription("Canal no qual a mensagem será enviada")
				.setRequired(true))
		
		.addStringOption(message =>
			message
				.setName("mensagem")
				.setDescription("Mensagem a ser enviada")
				.setRequired(true)),
	
	restriction: ["ownerOnly"],
	
	async execute(interaction) {
		const options = interaction.options._hoistedOptions;
		await interaction.guild.channels.cache.get(options[0].value).send(options[1].value);
		await interaction.reply("Mensagem enviada!");
	}
};