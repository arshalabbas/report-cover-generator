const createReport = require("docx-templates").default;
const fs = require("fs");
const path = require("path");
const https = require("https");

function populateTemplate(name, regno) {
  const outputDir = "./output-files";
  const outputFileName = `${name.split(" ")[0].toLowerCase()}-cover.docx`;
  const outputFilePath = path.join(outputDir, outputFileName);

  const template = fs.readFileSync("iv-cover-template.docx");

  // Populating the template
  createReport({
    template,
    data: {
      name,
      regno,
    },
  }).then((buffer) => {
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    fs.writeFileSync(outputFilePath, buffer);
    console.log(
      `${outputFileName} is saved in the folder ${path.join(
        __dirname,
        "output-files"
      )}`
    );
  });
  return outputFileName;
}

module.exports.populateTemplate = populateTemplate;
