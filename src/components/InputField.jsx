import { useInput } from "../context/CommonContext.jsx";

const InputField = ({ field, placeholder = "", className = "" }) => {
  const { inputs, setInputValue } = useInput();
  return (
    <input
    label="text"
      type="text"
      value={inputs[field] || ""}
      onChange={(e) => setInputValue(field, e.target.value)}
      placeholder={placeholder}
      className={`px-4 py-2 border rounded-md text-black w-64 ${className}`}
    />
  );
};

export default InputField;
