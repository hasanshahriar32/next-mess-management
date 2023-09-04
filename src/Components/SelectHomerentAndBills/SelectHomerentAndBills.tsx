"use client";
import React, { useEffect, useState } from "react";
interface InputSet {
  homeRent: string | null;
  bills: string | null;
  userName: string | null;
}
const SelectHomerentAndBills: React.FC = () => {
  const [inputSets, setInputSets] = useState<InputSet[]>(
    JSON.parse(localStorage.getItem("inputSets") ?? "[]") || [
      { homeRent: "", bills: "", userName: "" },
    ]
  );

  const dataInfo = inputSets?.map((input: any) => console.log(input));
  console.log(dataInfo);
  useEffect(() => {
    localStorage.setItem("inputSets", JSON.stringify(inputSets));
  }, [inputSets]);

  const addInputSet = () => {
    setInputSets([...inputSets, { homeRent: "", bills: "", userName: "" }]);
  };

  const removeInputSet = (index: any) => {
    const updatedInputSets = inputSets.filter((_: any, i: any) => i !== index);
    setInputSets(updatedInputSets);
  };

  const handleInputChange = (index: any, field: any, value: any) => {
    const updatedInputSets: any = [...inputSets];
    updatedInputSets[index][field] = value;
    setInputSets(updatedInputSets);
  };

  const handleSubmit = () => {
    // You can implement your backend data submission logic here
    console.log("Submitting data:", inputSets);

    const rentAndBillsInfo = {
      ...inputSets,
    };
    console.log(rentAndBillsInfo);
  };

  return (
    <div className="mt-16">
      {inputSets.map((inputSet: any, index: any) => (
        <div key={index} className="mb-5 rounded-lg">
          <input
            type="text"
            required
            placeholder="Home Rent"
            value={inputSet.homeRent}
            className="mb-2 px-4 py-2 mr-5 rounded-lg bg-white"
            onChange={(e) =>
              handleInputChange(index, "homeRent", e.target.value)
            }
          />
          <input
            type="text"
            required
            placeholder="Bills"
            className="mb-2 px-4 py-2 mr-5 rounded-lg bg-white"
            value={inputSet.bills}
            onChange={(e) => handleInputChange(index, "bills", e.target.value)}
          />
          <input
            type="text"
            required
            placeholder="User Name"
            className="mb-2 px-4 py-2 mr-5 rounded-lg bg-white"
            value={inputSet.userName}
            onChange={(e) =>
              handleInputChange(index, "userName", e.target.value)
            }
          />
          {index > 0 && (
            <button
              onClick={() => removeInputSet(index)}
              className="text-red-500 px-2 py-1 font-semibold"
            >
              Close
            </button>
          )}
        </div>
      ))}

      <button
        onClick={addInputSet}
        className="text-white mr-5 bg-gradient-to-r from-cyan-500 to-blue-500 px-4 py-2 font-semibold rounded-lg mb-4"
      >
        Add Input Set
      </button>

      <button
        onClick={handleSubmit}
        className="text-white mr-5 bg-gradient-to-r from-cyan-500 to-blue-500 px-4 py-2 font-semibold rounded-lg"
      >
        Submit
      </button>
    </div>
  );
};

export default SelectHomerentAndBills;
