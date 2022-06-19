const { SlashCommandBuilder } = require("@discordjs/builders");
const projectManager = require("../modules/project-manager.js")

module.exports = {
	data: new SlashCommandBuilder()
		.setName("criar-projeto")
		.setDescription("Cria um projeto do Clube de Programação")
		.addStringOption(name =>
			name
				.setName("nome")
				.setDescription("Nome do novo projeto")
				.setRequired(true))
		.addStringOption(description =>
			description
				.setName("descrição")
				.setDescription("Uma breve descrição do projeto")
				.setRequired(true))
		.addUserOption(user =>
			user
				.setName("representante")
				.setDescription("O membro do clube que vai ter permissão para administrar o projeto")),

	restriction: ["ownerOnly"],

	async execute(interaction) {
		const options = interaction.options._hoistedOptions;
		newProject = {
			"name": options[0].value,
			"description": options[1].value,
			"representative": options[2].value,
			"status": "active"
		};
		await interaction.reply(`Novo projeto criado!\n\n**Nome**: ${newProject.name}\n**Descrição**: ${newProject.description}`);

		// projetctManager.addProject(newProject);
		projectManager.addProject(newProject);
	}
}