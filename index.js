const fs = require("fs");
const path = require("path");
const inquirer = require("inquirer");
const generateMarkdown = require("./utils/generateMarkdown");

// array of questions for user
const questions = [
  {
    type: "input",
    name: "title",
    message: "What is the title of your project?",
  },
  {
    type: "list",
    name: "license",
    message: "Which licence will your project use?",
    choices: ["None", "MIT", "GPL"],
  },
  {
    type: "input",
    name: "github",
    message: "What is your GitHub username?",
  },
  {
    type: "input",
    name: "email",
    message: "What is your email address?",
    // Add a validation check to email address input
    // Used with permission from Stack Overflow:
    // https://stackoverflow.com/questions/65189877/how-can-i-validate-that-a-user-input-their-email-when-using-inquirer-npm
    validate: function (email) {
      // Regex mail check (return true if valid mail)
      return /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()\.,;\s@\"]+\.{0,1})+([^<>()\.,;:\s@\"]{2,}|[\d\.]+))$/.test(
        email
      );
    },
  },
];

// function to write README file
function writeToFile(fileName, data) {
  return fs.writeFileSync(path.join(process.cwd(), fileName), data);
}

// function to initialize program
function init() {
  inquirer.prompt(questions).then((response) => {
    console.log(`Now creating your personalised Readme file...`);
    writeToFile("README.md", generateMarkdown({ ...response }));
  });
}

// function call to initialize program
init();
