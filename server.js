const express = require("express");
const path = require("path");
const multer = require("multer");

/************************** App initialisation */
const app = express();

/************************** Middleware */
// these two lines replace the old way with 'body-parser'
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/upload", express.static(path.join(__dirname, "upload")));

/************************** Multer - Upload storage option */
const storage = multer.diskStorage({
  destination: function (_req, _file, cb) {
    cb(null, "upload/");
  },
  filename: function (_req, file, cb) {
    const extension = file.originalname.split(".").pop();
    cb(null, file.fieldname + "." + extension);
  },
});

/************************** Controllers */
app.get("/", (_req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.post("/upload", multer({ storage }).single("image"), (req, res) => {
  console.log("BODY: ", req.body);
  console.log("FILE: ", req.file);
  res.json({ message: "Successfully uploaded file" });
});

app.post("/test", (req, res) => {
  console.log("BODY: ", req.body);
  console.log("FILE: ", req.file);
  res.json({ message: "Received json body" });
});

/************************** Server start */
app.listen(3000, () => {
  console.log(`Server running on http://localhost:3000`);
});
