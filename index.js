const fs = require("node:fs");
const path = require("node:path");

const { name, version, token, clientId, ownerId } = require("./config.json");
const { Client, Intents, Collection, Interaction } = require("discord.js");

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES]});
client.name = name; client.version = version; client.id = clientId;

const eventsPath = path.join(__dirname, "events");
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith(".js"));

client.commands = new Collection();
const commandsPath = path.join(__dirname, "slashCommands");
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith(".js"));


const projectsPath = "./projects.json";

function resetProjects() {
	fs.writeFile(projectsPath, "{}", (error) => {
		if (error)
			console.log(error);
	});
}

if (!fs.existsSync(projectsPath)) resetProjects();

const projects = require(projectsPath);

function addProject(newProject) {
	projects.assign(newProject);
	fs.writeFile(projectsPath, JSON.stringify(projects, null, "\t"));
}

function archiveProject(project) {
	console.log(projects.values());
}


// Listing commands
for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);

	client.commands.set(command.data.name, command);
}

// Event handler
for (const file of eventFiles) {
	const filePath = path.join(eventsPath, file);
	const event = require(filePath);

	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(client, ...args));
	}
}

client.login(token);
