import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { X } from "lucide-react";

const AddEmployeeForm = ({ onClose }) => {
  const [step, setStep] = useState(1);
  const [showPopup, setShowPopup] = useState(false);

  const initialValues = {
    name: "",
    jobTitle: "",
    email: "",
    phone: "",
    country: "",
    gender: "",
    dateOfJoining: "",
    hoursPerWeek: "",
    salary: "",
    taxDeductions: "",
    employmentType: "",
  };

  const validationSchemaStep1 = Yup.object({
    name: Yup.string()
      .required("Name is required")
      .test(
        "capitalized-words",
        "First letter of every word must be uppercase",
        (value) =>
          value?.trim().split(" ").every((w) => w[0] === w[0]?.toUpperCase())
      ),
    jobTitle: Yup.string().required("Job title is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    phone: Yup.string()
      .matches(/^\d{10}$/, "Phone number must be 10 digits")
      .required("Phone number is required"),
    country: Yup.string().required("Country is required"),
    gender: Yup.string().required("Gender is required"),
  });

  const validationSchemaStep2 = Yup.object({
    employmentType: Yup.string().required("Select employment type"),
    dateOfJoining: Yup.date().required("Date of joining is required"),
    hoursPerWeek: Yup.string().required("Hours per week is required"),
    salary: Yup.string().required("Salary is required"),
    taxDeductions: Yup.string().required("Tax deductions are required"),
  });

  const handleNext = async (validateForm, setTouched) => {
    const errors = await validateForm();
    if (Object.keys(errors).length === 0) {
      setStep(2);
    } else {
      setTouched({
        name: true,
        jobTitle: true,
        email: true,
        phone: true,
        country: true,
        gender: true,
      });
    }
  };

  const handleSubmit = async (values, { resetForm }) => {
    try {
      await axios.post("http://localhost:5000/api/employees/add", values);
      setShowPopup(true);
      setTimeout(() => {
        setShowPopup(false);
        resetForm();
        onClose?.();
      }, 3000);
    } catch (error) {
      console.error("❌ Error saving employee:", error);
      alert("Failed to save. Check backend or network.");
    }
  };

  return (
    <div className="bg-[#fef7f4] p-6 rounded-3xl shadow-2xl max-w-6xl mx-auto relative">
      <X className="absolute top-4 right-4 cursor-pointer" onClick={onClose} />
      <h2 className="text-4xl font-bold mb-6 text-gray-800">Add Employee</h2>

      <div className="flex justify-between border-b mb-4">
        {["Basic Information", "Employment Type"].map((label, idx) => (
          <div
            key={label}
            className={`py-2 px-3 text-2xl font-medium border-b-2 ${
              step === idx + 1
                ? "border-blue-600 text-blue-600"
                : "border-transparent text-gray-400"
            }`}
          >
            {label}
          </div>
        ))}
      </div>

      <Formik
        initialValues={initialValues}
        validationSchema={step === 1 ? validationSchemaStep1 : validationSchemaStep2}
        onSubmit={handleSubmit}
      >
        {({ validateForm, setTouched }) => (
          <Form className="font-semibold space-y-4">
            {step === 1 && (
              <div className="grid grid-cols-2 gap-12">
                <FormField name="name" label="Employee name" placeholder="Your Name" />
                <SelectField name="jobTitle" label="Job title" options={[
                  "Software Engineer", "Project Manager", "HR Executive", "Intern", "QA Tester", "UI/UX Designer"
                ]} />

                <FormField name="email" label="Email address" placeholder="example@gmail.com" />
                <FormField name="phone" label="Phone number" placeholder="1234567890" />
                <SelectField name="country" label="Country" options={["India", "France", "Russia", "UK"]} />

                <div>
                  <label className="block text-sm font-medium mb-3 text-gray-700">Gender</label>
                  <div className="flex gap-4 mt-1">
                    {["Male", "Female", "Other"].map((g) => (
                      <label key={g} className="flex items-center gap-2">
                        <Field type="radio" name="gender" value={g} />
                        <span>{g}</span>
                      </label>
                    ))}
                  </div>
                  <ErrorMessage name="gender" component="div" className="text-red-500 text-xs mt-1" />
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="grid grid-cols-2 gap-12">
                <div className="col-span-2 flex gap-6">
                  {["Full time", "Contractual"].map((t) => (
                    <label key={t} className="flex items-center gap-2">
                      <Field type="radio" name="employmentType" value={t} />
                      {t}
                    </label>
                  ))}
                </div>
                <FormField name="dateOfJoining" label="Date of joining" type="date" />
                <FormField name="hoursPerWeek" label="Hours/week" />
                <FormField name="salary" label="Salary" />
                <FormField name="taxDeductions" label="Tax deductions" />
              </div>
            )}

            <div className="flex justify-between mt-6">
              <button
                type="button"
                onClick={() => (step > 1 ? setStep(step - 1) : onClose?.())}
                className="px-5 py-2 text-sm rounded ml-230 bg-gray-300 text-gray-800"
              >
                {step > 1 ? "Previous" : "Cancel"}
              </button>

              {step === 1 ? (
                <button
                  type="button"
                  onClick={() => handleNext(validateForm, setTouched)}
                  className="px-6 py-2 bg-blue-600 text-white rounded text-sm"
                >
                  Next
                </button>
              ) : (
                <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded text-sm">
                  Submit
                </button>
              )}
            </div>
          </Form>
        )}
      </Formik>

      {showPopup && (
        <div className="absolute top-0 left-0 w-full p-4 bg-green-100 text-green-800 font-semibold text-center rounded-t">
          ✅ Data saved! Visit Employee Listing.
        </div>
      )}
    </div>
  );
};

const FormField = ({ name, label, type = "text", placeholder = "" }) => (
  <div className="flex flex-col">
    <label htmlFor={name} className="text-sm font-medium text-gray-700">
      {label}
    </label>
    <Field
      type={type}
      name={name}
      placeholder={placeholder}
      className="mt-1 px-3 py-2 border rounded-md text-sm border-gray-300"
    />
    <ErrorMessage name={name} component="div" className="text-red-500 text-xs mt-1" />
  </div>
);

const SelectField = ({ name, label, options }) => (
  <div className="flex flex-col">
    <label htmlFor={name} className="text-sm text-gray-700">
      {label}
    </label>
    <Field as="select" name={name} className="mt-1 px-3 py-2 border rounded-md text-sm border-gray-300">
      <option value="">Select {label}</option>
      {options.map((opt) => (
        <option key={opt} value={opt}>{opt}</option>
      ))}
    </Field>
    <ErrorMessage name={name} component="div" className="text-red-500 text-xs mt-1" />
  </div>
);

export default AddEmployeeForm;
