const fs = require("node:fs");
const path = require("node:path");

const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");

const { clientId, token } = require("./config.json");
const { SlashCommandBuilder } = require("@discordjs/builders");


const commands = [];
const commandsPath = path.join(__dirname, "slashCommands");
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith(".js"));

const guildIds = [];

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);

	if (command.data.guildId) guildIds.push(command.data.guildId);

	commands.push(command.data.toJSON());
}

const rest = new REST({ version: "9" }).setToken(token);

commands.push(
	new SlashCommandBuilder().setName("false-command").setDescription("Serve só pra testar o gerenciamento de erros do bot").toJSON()
);

rest.put(Routes.applicationGuildCommands(clientId, "981213270381834340"), { body: commands })
	.then(() => console.log("Os slash commands da aplicação foram registrados com sucesso!"))
	.catch(console.error);
