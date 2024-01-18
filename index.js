const express = require("express");
const bodyParser = require("body-parser");
const { populateTemplate } = require("./handlers/docHandler");
const path = require("path");
const fs = require("fs");

const app = express();

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.static(path.join(__dirname, "output-files")));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.render("home");
});

app.post("/download", (req, res) => {
  const { name, regno } = req.body;

  // docx file
  const docxFileName = populateTemplate(name, regno);
  const docxFilePath = path.join(__dirname, "output-files", docxFileName);

  setTimeout(() => {
    res.download(docxFilePath, docxFileName, (err) => {
      if (err) {
        console.error("Error triggering download:", err);
        // Handle error as needed
        res.status(500).send("Internal Server Error");
      }
      fs.unlink(docxFilePath, (err) => {
        if (err) throw err;
        console.log("File was deleted");
      });
    });
  }, 5000);
});

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});
