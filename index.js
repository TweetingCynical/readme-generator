const fs = require("fs");
const path = require("path");
const inquirer = require("inquirer");
const generateMarkdown = require("./utils/generateMarkdown");

// array of questions for user to answer using Inquirer package
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
  // Add other licenses here at a later stage.
  // Note, you will need to add license text to the const sections on generateMarkdown for each one added
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
    validate: (email) => {
      // Regex mail check (return true if valid mail)
      return /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()\.,;\s@\"]+\.{0,1})+([^<>()\.,;:\s@\"]{2,}|[\d\.]+))$/.test(
        email
      );
    },
  },
  {
    type: "input",
    name: "description",
    message: "Give a short description of your project...",
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
  // Optional request for screenshot location based on answer to previous question
  {
    type: "input",
    name: "screenshotLocation",
    message: "What is the location of your screenshot?",
    default: "../assets/screenshot.png",
    // Add when option to ensure this question is optional
    when: (response) => response.screenshot,
  },
  {
    type: "input",
    name: "scope",
    message: "What is the Scope and Purpose of the project?",
    default:
      "Build an interactive command line app which collects details from a user in order to build a personalised README file. The user should be able to make some choices over whether to include some of the elememts, and also be able to control whether or not there are multiple lines used in some of the answers. The app will automatically generate the content, and store it as a named file within the generated-files folder of the repo.",
  },
  {
    type: "input",
    name: "usage",
    message: "What does the user need to know about using your repo?",
    default:
      "This site and its contents are for educational purposes only. You should have Node.js installed to be able to run this program.",
  },
  {
    type: "confirm",
    name: "credit",
    message:
      "Do you want to include another GitHub user to credit their contribution?",
    default: false,
  },
  // Optional request for additional contributor based on answer to previous question
  {
    type: "input",
    name: "contributor",
    message: "What is the GitHub username of the contributor?",
    // Add when option to ensure this question is optional
    when: (response) => response.credit,
  },
  {
    type: "input",
    name: "installation",
    message: "What command should the user run to install dependencies?",
    default: "npm i",
  },
  {
    type: "input",
    name: "contributing",
    message: "How does the user contribute to the repo?",
    default: "Please create a fork to contribute to our project.",
  },
  {
    type: "input",
    name: "tests",
    message: "What command should the user run to run tests?",
    default: "npm test",
  },
  {
    type: "input",
    name: "future",
    message:
      "Enter the items for Suggested Future Changes section (use ± to indicate a new line):",
    default: `- This is the first test;±- This is the second test;±- This is the third test;`,
    // Add ability for user to use a delimeter (±) to indicate a new line in their code
    filter: (response) => {
      // Replace ± with newline character
      return response.replace(/±/g, "\n");
    },
  },
];

// function to write README file
const writeToFile = (fileName, data) => {
  return fs.writeFileSync(path.join(process.cwd(), fileName), data);
};

// Use ES6 to create init function
const init = () => {
  inquirer.prompt(questions).then((response) => {
    console.log(`Creating your personalised readme file...`);
    writeToFile(
      `/generated-files/${response.filename}.md`,
      generateMarkdown({ ...response })
    );
    console.log(
      `Readme file created! Please check the generated-files folder for your newly created file.`
    );
  });
};

// function call to initialize program
init();
