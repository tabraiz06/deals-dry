const express = require("express");
const User = require("../models/userModel");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const router = express.Router();
const secret_key = "MIRZA";
router.post(
  "/register",
  body("email", "Enter a valid email").isEmail(),
  body("name", "Enter a valid name ").isString().isLength({ min: 5 }),
  body("phone", "provide a valid number ")
    .isNumeric()
    .isLength({ min: 10, max: 13 }),
  body("password", "Enter a valid password").isLength({ min: 5 }),
  async (req, res) => {
    const { name, email, phone, password } = req.body;
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const userExist = await User.findOne({ email });
      if (userExist) {
        res.status(400).json({ message: "email already exist" });
      } else {
        const securePassword = await bcrypt.hash(password, 10);
        const user = await User.create({
          name,
          email,
          phone,
          password: securePassword,
        });
        const data = { user: user.id };
        const token = jwt.sign(data, secret_key);
        res.status(200).json({
          message: "Registration successful.Please Sign in now",
          token,
          username: user.name,
        });
      }
    } catch (e) {
      res.status(400).json({
        error: e.message,
      });
    }
  }
);

router.post(
  "/signin",
  body("email", "provide a valid email").isEmail(),

  body("password", "Enter a valid password").isLength({ min: 5 }),
  async (req, res) => {
    const { email, password, phoneNumber } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const userExist = phoneNumber
        ? await User.findOne({ phoneNumber })
        : await User.findOne({ email });

      if (!userExist) {
        res.status(400).json({ message: "credentials invalid" });
      } else {
        const comparePassword = await bcrypt.compare(
          password,
          userExist.password
        );

        if (!comparePassword) {
          res.status(400).json({ message: "invalid password" });
        } else {
          const data = { user: userExist.id };
          const token = jwt.sign(data, secret_key);
          res.status(200).json({
            message: "login successfull",
            token,
            userName: userExist.name,
          });
        }
      }
    } catch (error) {
      res.status(400).json({
        error: error.message,
      });
    }
  }
);

module.exports = router;
