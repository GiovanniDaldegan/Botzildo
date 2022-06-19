const fs = require("node:fs");
const path = require("node:path");

const projectsPath = path.join(__dirname, "../projects.json");

try {
	var projects = require(projectsPath);
} catch (error) {
	console.log("The projects.json file is empty or it doesn't exist");

	fs.writeFileSync(projectsPath, "{}", error => {
		if (error) console.log(error);
	});

	var projects = require(projectsPath);
}

module.exports = {

	async addProject(newProject) {
		projects[newProject.name.toString()] = newProject;
		//console.log(projects);
		fs.writeFile(projectsPath, JSON.stringify(projects, null, "\t"), error => {
			if (error) {
				console.log(error);
			} else {
				console.log(`O arquivo foi escrito com sucesso.\n${fs.readFileSync(projectsPath)}`);
			}
		});
	},

	async archiveProject(project) {
		console.log(projects.values());
	}
}