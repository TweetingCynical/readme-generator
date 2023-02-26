const fs = require("fs");
const path = require("path");
const inquirer = require("inquirer");
const generateMarkdown = require("./utils/generateMarkdown");

// array of questions for user
const questions = [
  {
    type: "input",
    name: "filename",
    message: "What do you want to name your readme file?",
    default: "README",
  },
  {
    type: "input",
    name: "title",
    message: "What is the title of your project?",
    default: "README Generator",
  },
  {
    type: "list",
    name: "license",
    message: "Which licence will your project use?",
    choices: ["None", "MIT", "GPL"],
    default: "MIT",
  },
  {
    type: "input",
    name: "github",
    message: "What is your GitHub username?",
    default: "TweetingCynical",
  },
  {
    type: "input",
    name: "email",
    message: "What is your email address?",
    default: "jon@exce-ed.com",
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
    default:
      "A simple command line application for generating a readme markdown file from user input facilited by the Inquirer package",
  },
  {
    type: "input",
    name: "repo",
    message:
      "What is the exact spelling of your repo? Note: We will use this to generate a Live Deployment and Respository link on your Readme.",
    default: "readme-generator",
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
  {
    type: "input",
    name: "scope",
    message: "What is the Scope and Purpose of the project?",
    default:
      "Build an interactive command line app which collects details from a user in order to build a personalised README.md file. The user should be able to make some choices over whether to include some of the elememts, and also be able to control whether or not there are multiple lines used in some of the answers. The app will automatically generate the content, and store it as a named file within the generated-files folder of the repo.",
  },
  {
    type: "confirm",
    name: "contribution",
    message:
      "Do you want to include another GitHub user to credit their contribution?",
    default: false,
  },
  {
    type: "input",
    name: "contributor",
    message: "What is the GitHub username of the contributor?",
    when: (response) => response.contribution,
  },
  {
    type: "input",
    name: "future",
    message:
      "Enter the items for Suggested Future Changes section (use ± to indicate a new line):",
    default: `- This is the first test;±- This is the second test;±- This is the third test;`,
    filter: function (response) {
      // Replace ± with newline character
      return response.replace(/±/g, "\n");
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
    console.log(`Creating your personalised readme file...`);
    writeToFile(
      `/generated-files/${response.filename}.md`,
      generateMarkdown({ ...response })
    );
    console.log(`Readme file created!`);
  });
}

// function call to initialize program
init();
