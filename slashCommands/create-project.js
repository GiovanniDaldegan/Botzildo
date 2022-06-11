const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("criar-projeto")
		.setDescription("Cria um projeto do Clube de Programação")
		.addStringOption(name =>
			name
				.setName("nome")
				.setDescription("Nome do novo projeto")
				.setRequired(true))
		/*.addSubcommand(subcommand =>
			subcommand
				.setName("contribuintes")
				.setDescription("Membros do clube que trabalharão no projeto")
				.addUserOption(user =>
					user
						.setName("asdsad")
						.setDescription("asdasdasd")))*/,

	restriction: ["authorOnly"],

	async execute(interaction) {
		await interaction.reply(`Pong! ${Math.abs(Date.now() - interaction.createdTimestamp)} ms`);
	}
}