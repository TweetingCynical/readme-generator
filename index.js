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
  {
    type: "input",
    name: "description",
    message: "Give an short description of your project...",
  },
  {
    type: "input",
    name: "repo",
    message:
      "What is the exact spelling of your repo? Note: We will use this to generate a Live Deployment and Respository link on your Readme.",
  },
  {
    type: "confirm",
    name: "screenshot",
    message: "Do you want to include a screenshot?",
    default: true,
  },
  {
    type: "input",
    name: "screenshotLocation",
    message: "What is the location of your screenshot?",
    default: "./Assets/screenshot.png",
    when: (response) => response.screenshot,
  },
];

// function to write README file
function writeToFile(fileName, data) {
  return fs.writeFileSync(path.join(process.cwd(), fileName), data);
}

// function to initialize program
function init() {
  inquirer.prompt(questions).then((response) => {
    writeToFile("README.md", generateMarkdown({ ...response }));
    console.log(`Readme file created...`);
  });
}

// function call to initialize program
init();
