"use client";
import { useAllUserQuery } from "@/app/features/bazar/bazarApi";
import React, { useEffect, useState } from "react";

const App: React.FC = () => {
  const { data, isLoading } = useAllUserQuery();
  console.log(data?.users);

  const initialUsers = ["user1", "user2", "user3", "user4"];
  const numDays = 30; // Total number of days
  const daysToShowInitially = 15; // Number of days to show initially
  const daysToShowAfterToggle = 16; // Number of days to show after toggle

  const [users, setUsers] = useState<string[]>(initialUsers);
  const [userData, setUserData] = useState<
    Record<string, string[]> | undefined
  >(undefined);

  useEffect(() => {
    const storedData = localStorage.getItem("userData");

    const storedUsers = Object.keys(JSON.parse(storedData || "{}"));
    if (storedUsers.length !== initialUsers.length) {
      const newData: Record<string, string[]> = {
        ...JSON.parse(storedData || "{}"),
      };
      initialUsers.forEach((userId) => {
        if (!storedUsers.includes(userId)) {
          const userDataArray: string[] = Array(numDays).fill("0");
          newData[userId] = userDataArray;
        }
      });
      setUserData(newData);
      // Save the initialized data to localStorage
      localStorage.setItem("userData", JSON.stringify(newData));
    }

    if (storedData) {
      setUserData(JSON.parse(storedData));
    } else {
      // Initialize data with all values set to "0"
      const data: Record<string, string[]> = {};
      initialUsers.forEach((userId) => {
        const userDataArray: string[] = Array(numDays).fill("0");
        data[userId] = userDataArray;
      });
      setUserData(data);
      // Save the initialized data to localStorage
      localStorage.setItem("userData", JSON.stringify(data));
    }
  }, []);

  const handleInputChange = (userId: string, day: number, newValue: string) => {
    setUserData((prevData) => {
      const newData = { ...prevData };
      newData[userId] = [...(newData[userId] || [])]; // Ensure user data array exists
      newData[userId][day] = newValue;

      // Save the updated data to localStorage
      localStorage.setItem("userData", JSON.stringify(newData));

      return newData;
    });
  };

  const calculateIndividualTotal = (userId: string) => {
    if (!userData?.[userId]) return 0;

    return userData?.[userId]
      .slice(0, numDays + daysToShowAfterToggle)
      .reduce((acc, val) => acc + parseInt(val, 10), 0);
  };

  const [showAdditionalDays, setShowAdditionalDays] = useState<
    Record<string, boolean>
  >({});

  const toggleAdditionalDays = (userId: string) => {
    setShowAdditionalDays((prev) => ({
      ...prev,
      [userId]: !prev[userId],
    }));
  };

  const handleAddUser = (newUser: string) => {
    // Initialize the data for the new user with default values
    const newData: Record<string, string[]> = { ...userData };
    newData[newUser] = Array(numDays).fill("0");

    // Update users and userData state
    setUsers([...users, newUser]);
    setUserData(newData);

    // Save the updated data to localStorage, replacing old data
    localStorage.setItem("userData", JSON.stringify(newData));
  };

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-4">User-Specific Date Data</h1>
      <table className="table-auto">
        <thead>
          <tr>
            <th className="px-2 py-2 text-sm"></th>
            {Array.from({ length: numDays }, (_, day) => (
              <th key={`day_${day + 1}`} className="px-4 py-2">
                Day {day + 1}
              </th>
            ))}
            <th className="px-4 py-2">Total</th> {/* Add this column */}
          </tr>
        </thead>
        <tbody>
          {users.map((userId) => (
            <tr key={`user_${userId}`}>
              <td className="px-2 py-2">User {userId}</td>
              {userData[userId]?.slice(0, numDays).map((value, day) => (
                <td key={`user_${userId}_day_${day + 1}`} className="px-2 py-2">
                  <input
                    min={0}
                    max={9}
                    className="w-10 bg-inherit border pl-2"
                    type="number"
                    value={value}
                    onChange={(e) => {
                      handleInputChange(userId, day, e.target.value);
                    }}
                  />
                </td>
              ))}
              <td className="px-6 py-2">{calculateIndividualTotal(userId)}</td>{" "}
              {/* Display individual total */}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mb-8">
        <h2 className="text-xl font-semibold">Grand Total</h2>
        <table className="table-auto w-full mb-4">
          <thead>
            <tr>
              <th className="px-4 py-2">User</th>
              {userData[users[0]].slice(0, numDays).map((_, day) => (
                <th key={`grand_total_day_${day + 1}`} className="px-4 py-2">
                  {day + 1}
                </th>
              ))}
              {showAdditionalDays[users[0]] &&
                userData[users[0]]
                  .slice(numDays, numDays + daysToShowAfterToggle)
                  .map((_, day) => (
                    <th
                      key={`grand_total_day_${day + numDays + 1}`}
                      className="px-4 py-2"
                    >
                      {day + numDays + 1}
                    </th>
                  ))}
            </tr>
          </thead>
          <tbody>
            {users.map((userId) => (
              <tr key={`grand_total_user_${userId}`}>
                <td className="px-4 py-2"> {userId}</td>
                {userData[userId]?.slice(0, numDays).map((value, day) => (
                  <td
                    key={`grand_total_user_${userId}_day_${day + 1}`}
                    className="px-4 py-2"
                  >
                    {value}
                  </td>
                ))}
                {showAdditionalDays[userId] &&
                  userData[userId]
                    .slice(numDays, numDays + daysToShowAfterToggle)
                    .map((value, day) => (
                      <td
                        key={`grand_total_user_${userId}_day_${
                          day + numDays + 1
                        }`}
                        className="px-6 py-2"
                      >
                        {value}
                      </td>
                    ))}
              </tr>
            ))}
            <tr>
              <td className="px-4 py-2">Total</td>
              {userData[users[0]]
                .slice(0, numDays + daysToShowAfterToggle)
                .map((_, day) => (
                  <td
                    key={`grand_total_all_day_${day + 1}`}
                    className="px-4 py-2"
                  >
                    {users
                      .map((userId) =>
                        userData[userId][day]
                          ? parseInt(userData[userId][day], 10)
                          : 0
                      )
                      .reduce((acc, val) => acc + val, 0)}
                  </td>
                ))}
              <td className="px-6 py-2">
                {users
                  .map((userId) =>
                    userData[userId]
                      .slice(0, numDays + daysToShowAfterToggle)
                      .reduce((acc, val) => acc + parseInt(val, 10), 0)
                  )
                  .reduce((acc, val) => acc + val, 0)}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default App;
