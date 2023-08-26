"use client";

import React, { useState } from "react";

const MealInputComponent = () => {
  const allUsers = [
    { id: 1, name: "User 1", email: "user1@example.com" },
    { id: 2, name: "User 2", email: "user2@example.com" },
    { id: 3, name: "User 3", email: "user3@example.com" },
    // ... add more users as needed
  ];

  const [selectedUser, setSelectedUser] = useState(allUsers[0].id);
  const [mealDate, setMealDate] = useState("");
  const [mealNumber, setMealNumber] = useState("");
  console.log(selectedUser);

  const handleUserChange = (event: any) => {
    setSelectedUser(event.target.value);
  };

  const handleMealDateChange = (event: any) => {
    setMealDate(event.target.value);
  };

  const handleMealNumberChange = (event: any) => {
    setMealNumber(event.target.value);
  };

  const handleSubmit = () => {
    const selectedUserData = allUsers?.find((user) => user.id === selectedUser);
    console.log(selectedUserData);
    // if (selectedUserData) {
    //   const mealData = {
    //     user: selectedUser,
    //     email: selectedUserData.email,
    //     date: mealDate,
    //     number: mealNumber,
    //   };

    //   console.log(mealData);
    // } else {
    //   console.log("Selected user data not found");
    // }
  };

  return (
    <div>
      <label htmlFor="userSelect">Select User: </label>
      <select id="userSelect" value={selectedUser} onChange={handleUserChange}>
        {allUsers?.map((user) => (
          <option key={user.id} value={user?.id}>
            {user.name}
          </option>
        ))}
      </select>
      <br />
      <label htmlFor="mealDate">Meal Date: </label>
      <input
        type="date"
        id="mealDate"
        value={mealDate}
        onChange={handleMealDateChange}
      />
      <br />
      <label htmlFor="mealNumber">Meal Number: </label>
      <input
        type="number"
        id="mealNumber"
        value={mealNumber}
        onChange={handleMealNumberChange}
      />
      <br />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default MealInputComponent;
