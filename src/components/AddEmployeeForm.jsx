import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useDispatch } from "react-redux";
import { addEmployee } from "../redux/EmployeeSlice";
import * as Yup from "yup";
import { X } from "lucide-react";

const AddEmployeeForm = ({ onClose }) => {
  const dispatch = useDispatch();
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
        (value) => {
          if (!value) return false;
          return value
            .trim()
            .split(" ")
            .every((word) => word[0] === word[0]?.toUpperCase());
        }
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

  return (
    <div className="bg-[#fef7f4] p-6 rounded-3xl shadow-2xl max-w-6xl  mx-auto relative">
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
        validationSchema={
          step === 1 ? validationSchemaStep1 : validationSchemaStep2
        }
        onSubmit={(values, { resetForm }) => {
          dispatch(addEmployee(values));
          setShowPopup(true);
          setTimeout(() => {
            setShowPopup(false);
            resetForm();
            onClose?.();
          }, 3000);
        }}
      >
        {({ validateForm, setTouched }) => (
          <Form className="font-semibold space-y-4">
            {step === 1 && (
              <div className="font-semibold grid grid-cols-2 gap-12">
                <FormField
                  name="name"
                  label="Employee name"
                  placeholder="Your Name"
                />
                <div className="flex flex-col">
                  <label
                    htmlFor="jobTitle"
                    className="text-sm  text-gray-700"
                  >
                    Job title
                  </label>
                  <Field
                    as="select"
                    name="jobTitle"
                    className="mt-1 px-3 py-2 border rounded-md text-sm border-gray-300"
                  >
                    <option value="">Select Job Title</option>
                    <option value="Software Engineer">Software Engineer</option>
                    <option value="Project Manager">Project Manager</option>
                    <option value="HR Executive">HR Executive</option>
                    <option value="Intern">Intern</option>
                    <option value="QA Tester">QA Tester</option>
                    <option value="UI/UX Designer">UI/UX Designer</option>
                  </Field>
                  
                </div>

                <FormField name="email" label="Email address" placeholder="example@gmail.com" />
                <FormField name="phone" label="Phone number" placeholder="1234567890" />
                <div className="flex flex-col">
                  <label
                    htmlFor="country"
                    className="text-sm  text-gray-700"
                  >
                    Country
                  </label>
                  <Field
                    as="select"
                    name="country"
                    className="mt-1 px-3 py-2 border rounded-md text-sm border-gray-300"
                  >
                    <option value="">Select Country</option>
                    <option value="India">India</option>
                    <option value="France">France</option>
                    <option value="Russia">Russia</option>
                    <option value="UK">UK</option>
                  </Field>
                </div>
                <div className="col-span-1 ">
                  <label className="block text-sm font-medium mb-3 text-gray-700">
                    Gender
                  </label>
                  <div className="flex gap-4 mt-1">
                    {["Male", "Female", "Other"].map((g) => (
                      <label key={g} className="flex  items-center gap-2">
                        <Field type="radio" name="gender" value={g} />
                        <span>{g}</span>
                      </label>
                    ))}
                  </div>
                  <ErrorMessage
                    name="gender"
                    component="div"
                    className="text-red-500 text-xs mt-1"
                  />
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="grid grid-cols-2 gap-12">
                <div className="col-span-2 flex gap-6">
                  <label className="flex items-center gap-2">
                    <Field
                      type="radio"
                      name="employmentType"
                      value="Full time"
                    />
                    Full time
                  </label>
                  <label className="flex items-center gap-2">
                    <Field
                      type="radio"
                      name="employmentType"
                      value="Contractual"
                    />
                    Contractual
                  </label>
                </div>
                <FormField
                  name="dateOfJoining"
                  label="Date of joining"
                  type="date"
                />
                <FormField name="hoursPerWeek" label="Hours/week" />
                <FormField name="salary" label="Salary" />
                <FormField name="taxDeductions" label="Tax deductions" />
              </div>
            )}

            <div className="flex justify-between mt-6 ">
              <button
                type="button"
                onClick={() => (step > 1 ? setStep(step - 1) : onClose?.())}
                className={`px-5 py-2 text-sm rounded ml-230 ${
                  step > 1
                    ? "bg-gray-300 text-gray-800"
                    : "bg-gray-300 text-gray-500"
                }`}
              >
                {step > 1 ? "Previous" : "Cancel"}
              </button>

              {step === 1 ? (
                <button
                  type="button"
                  onClick={() => handleNext(validateForm, setTouched)}
                  className="px-6 py-2 bg-blue-600 text-white rounded text-sm mr-2"
                >
                  Next
                </button>
              ) : (
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded text-sm"
                >
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

const FormField = ({ name, label, type = "text" }) => (
  <div className="flex flex-col">
    <label htmlFor={name} className="text-sm font-medium text-gray-700">
      {label}
    </label>
    <Field
      type={type}
      name={name}
      className="mt-1 px-3 py-2 border rounded-md text-sm border-gray-300"
    />
    <ErrorMessage
      name={name}
      component="div"
      className="text-red-500 text-xs mt-1"
    />
  </div>
);

export default AddEmployeeForm;
