// function to generate markdown for README
function getLicenceBadge(license) {
  if (license !== "None") {
    return `![GitHub License](https://img.shields.io/badge/license-${license}-green.svg)`;
  }
  return "";
}

function generateMarkdown(data) {
  return `# ${data.title}
  ${getLicenceBadge(data.license)}
`;
}

module.exports = generateMarkdown;
