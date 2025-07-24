const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  jobTitle: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  country: { type: String, required: true },
  gender: { type: String, required: true },
  employmentType: { type: String, required: true },
  dateOfJoining: { type: Date, required: true },
  hoursPerWeek: { type: String, required: true },
  salary: { type: String, required: true },
  taxDeductions: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model("Employee", employeeSchema);
