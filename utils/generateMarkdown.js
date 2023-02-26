// function to generate markdown for README
function getLicenceBadge(license) {
  if (license !== "None") {
    return `![GitHub License](https://img.shields.io/badge/license-${license}-green.svg)`;
  }
  return "";
}

function setScreenshot(screenshot) {
  if (screenshot) {
    return `## Screenshot \n \n Working version of the site should look like this at standard screen size:
    <img src="./assets/screenshot.png" alt="Working version of project" style="max-width: 400px;">`;
  }
  return "";
}

function generateMarkdown(data) {
  return `# ${data.title}
  ${getLicenceBadge(data.license)}
  ${setScreenshot(data.screenshot)}
`;
}

module.exports = generateMarkdown;
