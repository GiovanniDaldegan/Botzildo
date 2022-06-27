const fs = require("node:fs");
const path = require("node:path");

const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");

const { clientId, token } = require("./config.json");
const { SlashCommandBuilder } = require("@discordjs/builders");

const commands = [];
const commandsPath = path.join(__dirname, "slashCommands");

const guildIds = [];
const guildId = "981213270381834340";

const rest = new REST({ version: "9" }).setToken(token);

function getCommands() {
	const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith(".js"));

	for (const file of commandFiles) {
		const filePath = path.join(commandsPath, file);
		const command = require(filePath);

		// if (command.data.guildId) guildIds.push(command.data.guildId);

		commands.push(command.data.toJSON());
	}
}

function registerCommands() {
	getCommands();

	rest.put(Routes.applicationGuildCommands(clientId, "981213270381834340"), { body: commands })
		.then(() => console.log("Os slash commands da aplicação foram registrados com sucesso!"))
		.catch(console.error);
}

function updateCommands(client) {
	getCommands();

	const guild = client.guilds.cache.get(guildId);
	// console.log(guild);

	guild.commands.set(commands);
}

/*
commands.push(
	new SlashCommandBuilder().setName("false-command").setDescription("Serve só pra testar o gerenciamento de erros do bot").toJSON()
);*/


module.exports = {
	registerCommands,
	updateCommands
}
