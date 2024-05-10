const express = require("express");
const Employee = require("../models/employeeModel");
const fs = require("fs");
const multer = require("multer");
const router = express.Router();
const { body, validationResult } = require("express-validator");

// Set up multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Create the 'uploads' directory if it doesn't exist
    const dir = "../frontend/public/images/";
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    cb(null, dir);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });
router.post(
  "/add",
  upload.single("f_Image"),
  body("f_Name", "enter a valid name").isString().isLength({ min: 5 }),
  body("f_Email", "enter a valid email").isEmail(),
  body("f_Mobile", "enter a valid mobile number").isNumeric(),
  body("f_Designation", "enter a valid designation").isString(),
  body("f_gender", "enter a valid gender").isString(),

  async (req, res) => {
    const { f_Name, f_Email, f_Mobile, f_Designation, f_gender, f_Course } =
      req.body;
    const imagePath = req.file.filename;
    if (!imagePath) {
      res.status(400).json({ message: "image is mendatory" });
    }

    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const emailExist = await Employee.findOne({ f_Email });
      if (emailExist) {
        res.status(400).json({ message: "email is already exist" });
      } else {
        const newEmployee = await Employee.create({
          f_Image: imagePath,
          f_Name,
          f_Email,
          f_Mobile,
          f_Designation,
          f_gender,
          f_Course,
        });
        res
          .status(200)
          .json({ message: "new employee added successfully", newEmployee });
      }
    } catch (e) {
      res.status(400).json({
        error: e.message,
      });
    }
  }
);
router.put(
  "/update/:id",
  upload.single("f_Image"),
  body("f_Name").isString(),
  body("f_Email").isEmail(),
  body("f_Mobile").isNumeric(),
  body("f_Designation").isString(),
  body("f_gender").isString(),

  async (req, res) => {
    const { f_Name, f_Email, f_Mobile, f_Designation, f_gender, f_Course } =
      req.body;
    const imagePath = req.file.filename;
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      } else {
        const employee = await Employee.findByIdAndUpdate(
          { _id: req.params.id },
          {
            f_Image: imagePath,
            f_Name,
            f_Email,
            f_Mobile,
            f_Designation,
            f_gender,
            f_Course,
          }
        );
        res.status(200).json({ message: "employee updated successfully" });
      }
    } catch (e) {
      res.status(400).json({
        error: e.message,
      });
    }
  }
);

router.delete("/delete/:id", async (req, res) => {
  try {
    const deleteEmployee = await Employee.findByIdAndDelete({
      _id: req.params.id,
    });
    res.status(200).json({ message: "employee deleted successfully" });
  } catch (e) {
    res.status(400).json({
      error: e.message,
    });
  }
});

router.get("/employees", async (req, res) => {
  try {
    const employees = await Employee.find();
    res.status(200).json(employees);
  } catch (e) {
    res.status(400).json({
      error: e.message,
    });
  }
});
module.exports = router;
