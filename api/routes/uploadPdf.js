const express = require("express");
const multer = require("multer");
const path = require("path");
const router = express.Router();
const Pdf = require("../modals/Pdf");
// Set up storage for uploaded PDFs using Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Uploads will be stored in the 'uploads' folder
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const extension = path.extname(file.originalname);
    cb(null, file.fieldname + "-" + uniqueSuffix + extension);
  },
});

const upload = multer({ storage: storage });

// POST /api/upload - Handle PDF upload
router.post("/", upload.single("file"), (req, res) => {
  try {
    // Assuming you have a PDF schema model
    const newPDF = new Pdf({
      title: req.body.title,
      desc: req.body.description,
      filePath: req.file.path, // Store the file path in the database
    });

    // Save the PDF metadata to the database
    newPDF.save();

    res.status(201).json({ message: "PDF uploaded successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
