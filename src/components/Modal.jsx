import React from "react";

const Modal = ({ isOpen, onClose, onSave, title }) => {
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = () => {
    if (!inputValue.trim()) {
      alert("Please enter a valid name.");
      return;
    }

    onSave(inputValue); // Save the input value
    setInputValue(""); // Reset input
    onClose(); // Close the modal
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h3 className="text-lg font-bold mb-4">{title}</h3>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Enter name"
          className="w-full p-2 border rounded mb-4"
        />
        <div className="flex justify-end">
          <button onClick={onClose} className="px-4 py-2 mr-2 rounded bg-gray-200">
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 rounded bg-blue-500 text-white"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal; // Ensure Modal is exported as the default export