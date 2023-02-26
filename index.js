const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require('inquirer');
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./src/page-template.js");
const { table } = require("console");


// TODO: Write Code to gather information about the development team members, and render the HTML file.

let teamArray = []; // array to contain team member

async function assembleTeam() {
    addManager();
}

function addManager() {
    inquirer.prompt([
        {
            type: `input`,
            name: `name`,
            message: `What is the manager's name?`
        },
        {
            type: `input`,
            name: `id`,
            message: `Enter your manager's ID number:`,
            validate: (answer) => {
                if(isNaN(answer)) {
                    return `Please enter a number`
                }
                return true;
            }
         },
        {
            type: `input`,
            name: `email`,
            message: `Enter the email address for this manager:`,
            validate: function (email) {
                valid = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)
                if (valid) {
                    return true;
                } else {
                    return `Please enter a valid email`
                }
            }
        },
        {
            type: `input`,
            name: `officeNumber`,
            message: `Enter the manager's office number`,
            validate: (answer) => {
                if(isNaN(answer)) {
                    return `Please enter a number`
                }
                return true;
            }
        }
    ])
    .then((value) => {
        const manager = new Manager(
            value.name,
            value.id,
            value.email,
            value.officeNumber
        );
        console.table(manager);
        teamArray.push(manager);
        addTeam();
    });
}

function addTeam() {
    inquirer.prompt([
        {
            type: `list`,
            name: `memberType`,
            message: `Add an Engineer or an Intern to the team?`,
            choices: [`Engineer`, `Intern`, `I've finished building the team`]
        }
    ])
    .then((value) => {
        if (value.memberType === `Engineer`) {
            addEngineer();
        } else if (value.memberType === `Intern`) {
            addIntern();
        } else {
            createDocument();
        }
    });
}

function addEngineer() {
    inquirer.prompt([
        {
            type: `input`,
            name: `name`,
            message: `Engineer's name:`
        },
        {
            type: `input`,
            name: `id`,
            message: `Enter your Engineeer's ID number`,
            validate: (answer) => {
                if(isNaN(answer)) {
                    return `Please enter a number`
                }
                return true;
            }
        },
        {
            type: `input`,
            name: `email`,
            message: `Enter the email address for this Engineer:`,
            validate: function (email) {
                valid = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)
                if (valid) {
                    return true;
                } else {
                    return `Please enter a valid email`
                }
            }
        },
        {
            type: `input`,
            name: `github`,
            message: `Enter the Engineer's GitHub username:`
        }
    ])
    .then((value) => {
        const engineer = new Engineer(
            value.name,
            value.id,
            value.email,
            value.github
        )
        console.table(engineer);
        teamArray.push(engineer);
        addTeam();
    })
}

function addIntern() {
    inquirer.prompt([
        {
            type: `input`,
            name: `name`,
            message: `Enter the Intern's name:`
        },
        {
            type: `input`,
            name: `id`,
            message: `Enter your Intern's ID number`,
            validate: (answer) => {
                if(isNaN(answer)) {
                    return `Please enter a number`
                }
                return true;
            }
        },
        {
            type: `input`,
            name: `email`,
            message: `Enter the email address for this Intern:`,
            validate: function (email) {
                valid = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)
                if (valid) {
                    return true;
                } else {
                    return `Please enter a valid email`
                }
            }
        },
        {
            type: `input`,
            name: `school`,
            message: `Enter the Intern's school:`
        }
    ])
    .then((value) => {
        const intern = new Intern(
            value.name,
            value.id,
            value.email,
            value.school
        )
        console.table(intern);
        teamArray.push(intern);
        addTeam();
    })
}

function createDocument() {
    if (!fs.existsSync(OUTPUT_DIR)) { // if no OUTPUT directory exists, create one
        fs.mkdirSync(OUTPUT_DIR);
    } else {
        fs.writeFileSync(outputPath, render(teamArray), `utf-8`)
        console.log(`Congratulations!\nYour file has been created in the folder: output`);
    }
}

assembleTeam();

