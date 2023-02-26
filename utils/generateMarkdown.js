// function to generate markdown for README
function getLicenceBadge(license) {
  if (license !== "None") {
    return `![GitHub License](https://img.shields.io/badge/license-${license}-green.svg)`;
  }
  return "";
}

function setScreenshot(screenshot) {
  if (screenshot) {
    return `\n### Screenshot\n\nWorking version of the site should look like this at standard screen size:\n<img src="./assets/screenshot.png" alt="Working version of project" style="max-width: 400px;">`;
  }
  return "";
}

function generateMarkdown(data) {
  return `# ${data.title}
  \n## ${data.description}
  \n<!-- TABLE OF CONTENTS -->
  <details>
    <summary>Table of Contents</summary>
    <ol>
          <li><a href="#about-the-project">About The Project</a></li>
          <li><a href="#deployment">Deployment / Code Repository</a></li>
          <li><a href="#screenshot">Screenshot</a></li>
          <li><a href="#scope-and-purpose">Scope and Purpose</a></li>
          <li><a href="#usage">Usage</a></li>
          <li><a href="#credits">Credits</a></li>
          <li><a href="#installation">Installation</a></li>
          <li><a href="#pseudocode">Pseudocode</a></li>
          <li><a href="#overview-of-build">Overview of Build</a></li>
          <li><a href="#suggested-future-changes">Suggested Future Changes</a></li>
          <li><a href="#license">License</a></li>
        </ol>
  </details>
  \n${getLicenceBadge(data.license)}
  \n### Deployment / Code Repository:
  \n[Live Deployment](https://${data.github}.github.io/${data.repo}/)
  \n[Resository](https://github.com/${data.github}/${data.repo})
  ${setScreenshot(data.screenshot)}
`;
}

module.exports = generateMarkdown;
