const mongoose = require("mongoose");
const employeeSchema = mongoose.Schema(
  {
    f_Image: String,
    f_Name: String,
    f_Email: String,
    f_Mobile: Number,
    f_Designation: String,
    f_gender: String,
    f_Course: Array,
  },
  { timestamps: true }
);
module.exports = mongoose.model("t_employee", employeeSchema);
