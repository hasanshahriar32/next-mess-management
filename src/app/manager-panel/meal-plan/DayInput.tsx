// // "use client";
// // import React, { useEffect, useState } from "react";

// // const App: React.FC = () => {
// //   const users = ["user1", "user2", "user3"];
// //   const numDays = 30; // Total number of days
// //   const daysToShowInitially = 15; // Number of days to show initially
// //   const daysToShowAfterToggle = 16; // Number of days to show after toggle

// //   const [userData, setUserData] = useState<
// //     Record<string, string[]> | undefined
// //   >(undefined);

// //   useEffect(() => {
// //     // Load data from localStorage if available
// //     const storedData = localStorage.getItem("userData");
// //     if (storedData) {
// //       setUserData(JSON.parse(storedData));
// //     } else {
// //       // Initialize data with all values set to 0
// //       const data: Record<string, string[]> = {};
// //       users.forEach((userId) => {
// //         const userDataArray: string[] = Array(numDays).fill("0");
// //         data[userId] = userDataArray;
// //       });
// //       setUserData(data);
// //     }
// //   }, []);

// //   const handleInputChange = (userId: string, day: number, newValue: string) => {
// //     setUserData((prevData) => {
// //       const newData = { ...prevData };
// //       newData[userId] = [...newData[userId]];
// //       newData[userId][day] = newValue;

// //       // Save the updated data to localStorage
// //       localStorage.setItem("userData", JSON.stringify(newData));

// //       return newData;
// //     });
// //   };

// //   const [showAdditionalDays, setShowAdditionalDays] = useState<
// //     Record<string, boolean>
// //   >({});

// //   const toggleAdditionalDays = (userId: string) => {
// //     setShowAdditionalDays((prev) => ({
// //       ...prev,
// //       [userId]: !prev[userId],
// //     }));
// //   };

// //   if (!userData) {
// //     return <div>Loading...</div>;
// //   }

// //   return (
// //     <div className="container mx-auto mt-8">
// //       <h1 className="text-2xl font-bold mb-4">User-Specific Date Data</h1>
// //       {users.map((userId) => (
// //         <div key={`user_${userId}`} className="mb-4">
// //           <h2 className="text-xl font-semibold">User {userId}</h2>
// //           <div className="flex">
// //             {userData[userId]
// //               .slice(0, daysToShowInitially)
// //               .map((value, day) => (
// //                 <div
// //                   key={`user_${userId}_day_${day + 1}`}
// //                   className={`px-4 py-2`}
// //                 >
// //                   <input
// //                     className="w-8"
// //                     type="number"
// //                     value={value}
// //                     onChange={(e) => {
// //                       handleInputChange(userId, day, e.target.value);
// //                     }}
// //                   />
// //                   <span className="ml-2">Day {day + 1}</span>
// //                 </div>
// //               ))}
// //           </div>
// //           {showAdditionalDays[userId] && (
// //             <div className="flex mt-4">
// //               {userData[userId]
// //                 .slice(
// //                   daysToShowInitially,
// //                   daysToShowInitially + daysToShowAfterToggle
// //                 )
// //                 .map((value, day) => (
// //                   <div
// //                     key={`user_${userId}_day_${day + daysToShowInitially + 1}`}
// //                     className={`px-4 py-2`}
// //                   >
// //                     <input
// //                       type="number"
// //                       className="w-8"
// //                       value={value}
// //                       onChange={(e) => {
// //                         handleInputChange(
// //                           userId,
// //                           day + daysToShowInitially,
// //                           e.target.value
// //                         );
// //                       }}
// //                     />
// //                     <span className="ml-2">
// //                       Day {day + daysToShowInitially + 1}
// //                     </span>
// //                   </div>
// //                 ))}
// //             </div>
// //           )}
// //           <button
// //             onClick={() => toggleAdditionalDays(userId)}
// //             className="mt-2 text-blue-500 underline cursor-pointer"
// //           >
// //             {showAdditionalDays[userId]
// //               ? "Hide Additional Days"
// //               : "Show Additional Days"}
// //           </button>
// //         </div>
// //       ))}
// //       <div className="mb-8">
// //         <h2 className="text-xl font-semibold">Grand Total</h2>
// //         <table className="table-auto w-full mb-4">
// //           <thead>
// //             <tr>
// //               <th className="px-4 py-2">User</th>
// //               {userData[users[0]].slice(0, numDays).map((_, day) => (
// //                 <th key={`grand_total_day_${day + 1}`} className="px-4 py-2">
// //                   {day + 1}
// //                 </th>
// //               ))}
// //               {showAdditionalDays[users[0]] &&
// //                 userData[users[0]]
// //                   .slice(numDays, numDays + daysToShowAfterToggle)
// //                   .map((_, day) => (
// //                     <th
// //                       key={`grand_total_day_${day + numDays + 1}`}
// //                       className="px-4 py-2"
// //                     >
// //                       {day + numDays + 1}
// //                     </th>
// //                   ))}
// //             </tr>
// //           </thead>
// //           <tbody>
// //             {users.map((userId) => (
// //               <tr key={`grand_total_user_${userId}`}>
// //                 <td className="px-4 py-2">User {userId}</td>
// //                 {userData[userId].slice(0, numDays).map((value, day) => (
// //                   <td
// //                     key={`grand_total_user_${userId}_day_${day + 1}`}
// //                     className="px-4 py-2"
// //                   >
// //                     {value}
// //                   </td>
// //                 ))}
// //                 {showAdditionalDays[userId] &&
// //                   userData[userId]
// //                     .slice(numDays, numDays + daysToShowAfterToggle)
// //                     .map((value, day) => (
// //                       <td
// //                         key={`grand_total_user_${userId}_day_${
// //                           day + numDays + 1
// //                         }`}
// //                         className="px-4 py-2"
// //                       >
// //                         {value}
// //                       </td>
// //                     ))}
// //               </tr>
// //             ))}
// //             <tr>
// //               <td className="px-4 py-2">Total</td>
// //               {userData[users[0]]
// //                 .slice(0, numDays + daysToShowAfterToggle)
// //                 .map((_, day) => (
// //                   <td
// //                     key={`grand_total_all_day_${day + 1}`}
// //                     className="px-4 py-2"
// //                   >
// //                     {users
// //                       .map((userId) =>
// //                         userData[userId][day]
// //                           ? parseInt(userData[userId][day], 10)
// //                           : 0
// //                       )
// //                       .reduce((acc, val) => acc + val, 0)}
// //                   </td>
// //                 ))}
// //               <td className="px-4 py-2">
// //                 {users
// //                   .map((userId) =>
// //                     userData[userId]
// //                       .slice(0, numDays + daysToShowAfterToggle)
// //                       .reduce((acc, val) => acc + parseInt(val, 10), 0)
// //                   )
// //                   .reduce((acc, val) => acc + val, 0)}
// //               </td>
// //             </tr>
// //           </tbody>
// //         </table>
// //       </div>
// //     </div>
// //   );
// // };

// // export default App;

// /// v2

// "use client";
// import { useAllUserQuery } from "@/app/features/bazar/bazarApi";
// import React, { useEffect, useState } from "react";

// const App: React.FC = () => {
//   const users = ["user1", "user2", "user3"];
//   const numDays = 30; // Total number of days
//   const daysToShowInitially = 15; // Number of days to show initially
//   const daysToShowAfterToggle = 16; // Number of days to show after toggle

//   const [userData, setUserData] = useState<
//     Record<string, string[]> | undefined
//   >(undefined);

//   useEffect(() => {
//     // Load data from localStorage if available
//     const storedData = localStorage.getItem("userData");
//     if (storedData) {
//       setUserData(JSON.parse(storedData));
//     } else {
//       // Initialize data with all values set to 0
//       const data: Record<string, string[]> = {};
//       users.forEach((userId) => {
//         const userDataArray: string[] = Array(numDays).fill("0");
//         data[userId] = userDataArray;
//       });
//       setUserData(data);
//     }
//   }, []);

//   const handleInputChange = (userId: string, day: number, newValue: string) => {
//     setUserData((prevData) => {
//       const newData = { ...prevData };
//       newData[userId] = [...newData[userId]];
//       newData[userId][day] = newValue;

//       // Save the updated data to localStorage
//       localStorage.setItem("userData", JSON.stringify(newData));

//       return newData;
//     });
//   };

//   const [showAdditionalDays, setShowAdditionalDays] = useState<
//     Record<string, boolean>
//   >({});

//   const toggleAdditionalDays = (userId: string) => {
//     setShowAdditionalDays((prev) => ({
//       ...prev,
//       [userId]: !prev[userId],
//     }));
//   };

//   if (!userData) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div className="container mx-auto mt-8">
//       <h1 className="text-2xl font-bold mb-4">User-Specific Date Data</h1>
//       <table className="table-auto">
//         <thead>
//           <tr>
//             <th className="px-2 py-2 text-sm"></th>
//             {Array.from({ length: numDays }, (_, day) => (
//               <th key={`day_${day + 1}`} className="px-4 py-2">
//                 Day {day + 1}
//               </th>
//             ))}
//           </tr>
//         </thead>
//         <tbody>
//           {users.map((userId) => (
//             <tr key={`user_${userId}`}>
//               <td className="px-2 py-2">User {userId}</td>
//               {userData[userId].map((value, day) => (
//                 <td key={`user_${userId}_day_${day + 1}`} className="px-2 py-2">
//                   <input
//                     min={0}
//                     max={9}
//                     className="w-10 bg-inherit border pl-2"
//                     type="number"
//                     value={value}
//                     onChange={(e) => {
//                       handleInputChange(userId, day, e.target.value);
//                     }}
//                   />
//                 </td>
//               ))}
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       <div className="mb-8">
//         <h2 className="text-xl font-semibold">Grand Total</h2>
//         <table className="table-auto w-full mb-4">
//           <thead>
//             <tr>
//               <th className="px-4 py-2">User</th>
//               {userData[users[0]].slice(0, numDays).map((_, day) => (
//                 <th key={`grand_total_day_${day + 1}`} className="px-4 py-2">
//                   {day + 1}
//                 </th>
//               ))}
//               {showAdditionalDays[users[0]] &&
//                 userData[users[0]]
//                   .slice(numDays, numDays + daysToShowAfterToggle)
//                   .map((_, day) => (
//                     <th
//                       key={`grand_total_day_${day + numDays + 1}`}
//                       className="px-4 py-2"
//                     >
//                       {day + numDays + 1}
//                     </th>
//                   ))}
//             </tr>
//           </thead>
//           <tbody>
//             {users.map((userId) => (
//               <tr key={`grand_total_user_${userId}`}>
//                 <td className="px-4 py-2"> {userId}</td>
//                 {userData[userId].slice(0, numDays).map((value, day) => (
//                   <td
//                     key={`grand_total_user_${userId}_day_${day + 1}`}
//                     className="px-4 py-2"
//                   >
//                     {value}
//                   </td>
//                 ))}
//                 {showAdditionalDays[userId] &&
//                   userData[userId]
//                     .slice(numDays, numDays + daysToShowAfterToggle)
//                     .map((value, day) => (
//                       <td
//                         key={`grand_total_user_${userId}_day_${
//                           day + numDays + 1
//                         }`}
//                         className="px-6 py-2"
//                       >
//                         {value}
//                       </td>
//                     ))}
//               </tr>
//             ))}
//             <tr>
//               <td className="px-4 py-2">Total</td>
//               {userData[users[0]]
//                 .slice(0, numDays + daysToShowAfterToggle)
//                 .map((_, day) => (
//                   <td
//                     key={`grand_total_all_day_${day + 1}`}
//                     className="px-4 py-2"
//                   >
//                     {users
//                       .map((userId) =>
//                         userData[userId][day]
//                           ? parseInt(userData[userId][day], 10)
//                           : 0
//                       )
//                       .reduce((acc, val) => acc + val, 0)}
//                   </td>
//                 ))}
//               <td className="px-6 py-2">
//                 {users
//                   .map((userId) =>
//                     userData[userId]
//                       .slice(0, numDays + daysToShowAfterToggle)
//                       .reduce((acc, val) => acc + parseInt(val, 10), 0)
//                   )
//                   .reduce((acc, val) => acc + val, 0)}
//               </td>
//             </tr>
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default App;

// ("use client");

// const App: React.FC = () => {
//   const { data: userData, isLoading, isError } = useAllUserQuery();

//   const numDays = 30; // Total number of days
//   const daysToShowInitially = 15; // Number of days to show initially
//   const daysToShowAfterToggle = 16; // Number of days to show after toggle

//   const [users, setUsers] = useState<{ _id: string; name: string }[]>([]);
//   const [userDaysData, setUserDaysData] = useState<
//     Record<string, string[]> | undefined
//   >(undefined);

//   useEffect(() => {
//     if (userData) {
//       // Extract the list of users with _id and name from the fetched data
//       const usersList = userData?.users?.map((user) => ({
//         _id: user._id,
//         name: user.name,
//       }));
//       setUsers(usersList);

//       // Load user-specific data from the fetched data, or initialize if not present
//       const storedData = localStorage.getItem("userData");
//       if (storedData) {
//         setUserDaysData(JSON.parse(storedData));
//       } else {
//         const initialData: Record<string, string[]> = {};
//         usersList.forEach((user) => {
//           const userDataArray: string[] = Array(numDays).fill("0");
//           initialData[user._id] = userDataArray;
//         });
//         setUserDaysData(initialData);
//         localStorage.setItem("userData", JSON.stringify(initialData));
//       }
//     }
//   }, [userData, numDays, isLoading]);

//   const handleInputChange = (userId: string, day: number, newValue: string) => {
//     setUserDaysData((prevData) => {
//       const newData = { ...prevData };
//       newData[userId] = [...(newData[userId] || [])]; // Ensure user data array exists
//       newData[userId][day] = newValue;

//       // Save the updated data to localStorage
//       localStorage.setItem("userData", JSON.stringify(newData));

//       return newData;
//     });
//   };

//   const [showAdditionalDays, setShowAdditionalDays] = useState<
//     Record<string, boolean>
//   >({});

//   const toggleAdditionalDays = (userId: string) => {
//     setShowAdditionalDays((prev) => ({
//       ...prev,
//       [userId]: !prev[userId],
//     }));
//   };

//   const handleAddUser = (newUser: { _id: string; name: string }) => {
//     // Initialize the data for the new user with default values
//     const newData: Record<string, string[]> = { ...userDaysData };
//     newData[newUser._id] = Array(numDays).fill("0");

//     // Update users and userDaysData state
//     setUsers([...users, newUser]);
//     setUserDaysData(newData);

//     // Save the updated data to localStorage, replacing old data
//     localStorage.setItem("userData", JSON.stringify(newData));
//   };

//   if (isLoading) {
//     return <div>Loading...</div>;
//   }

//   if (isError) {
//     return <div>Error loading user data.</div>;
//   }
//   console.log(userDaysData);

//   return (
//     <div className="container mx-auto mt-8">
//       <h1 className="text-2xl font-bold mb-4">User-Specific Date Data</h1>
//       <table className="table-auto">
//         <thead>
//           <tr>
//             <th className="px-2 py-2 text-sm"></th>
//             {Array.from({ length: numDays }, (_, day) => (
//               <th key={`day_${day + 1}`} className="px-4 py-2">
//                 Day {day + 1}
//               </th>
//             ))}
//           </tr>
//         </thead>
//         <tbody>
//           {users.map((user) => (
//             <tr key={`user_${user._id}`}>
//               <td className="px-2 py-2">User {user.name}</td>
//               {userDaysData?.[user._id]?.map((value, day) => (
//                 <td
//                   key={`user_${user._id}_day_${day + 1}`}
//                   className="px-2 py-2"
//                 >
//                   <input
//                     min={0}
//                     max={9}
//                     className="w-10 bg-inherit border pl-2"
//                     type="number"
//                     value={value}
//                     onChange={(e) => {
//                       handleInputChange(user._id, day, e.target.value);
//                     }}
//                   />
//                 </td>
//               ))}
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       <div className="mb-8">
//         <h2 className="text-xl font-semibold">Grand Total</h2>
//         <table className="table-auto w-full mb-4">
//           <thead>
//             <tr>
//               <th className="px-4 py-2">User</th>
//               {userDaysData?.[users[0]?._id]
//                 ?.slice(0, numDays)
//                 .map((_, day) => (
//                   <th key={`grand_total_day_${day + 1}`} className="px-4 py-2">
//                     {day + 1}
//                   </th>
//                 ))}
//               {showAdditionalDays[users[0]?._id] &&
//                 userDaysData?.[users[0]?._id]
//                   .slice(numDays, numDays + daysToShowAfterToggle)
//                   .map((_, day) => (
//                     <th
//                       key={`grand_total_day_${day + numDays + 1}`}
//                       className="px-4 py-2"
//                     >
//                       {day + numDays + 1}
//                     </th>
//                   ))}
//             </tr>
//           </thead>
//           <tbody>
//             {users.map((user) => (
//               <tr key={`grand_total_user_${user._id}`}>
//                 <td className="px-4 py-2"> {user.name}</td>
//                 {userDaysData?.[user._id]
//                   ?.slice(0, numDays)
//                   .map((value, day) => (
//                     <td
//                       key={`grand_total_user_${user._id}_day_${day + 1}`}
//                       className="px-4 py-2"
//                     >
//                       {value}
//                     </td>
//                   ))}
//                 {showAdditionalDays[user._id] &&
//                   userDaysData?.[user._id]
//                     .slice(numDays, numDays + daysToShowAfterToggle)
//                     .map((value, day) => (
//                       <td
//                         key={`grand_total_user_${user._id}_day_${
//                           day + numDays + 1
//                         }`}
//                         className="px-6 py-2"
//                       >
//                         {value}
//                       </td>
//                     ))}
//               </tr>
//             ))}
//             <tr>
//               <td className="px-4 py-2">Total</td>
//               {userDaysData?.[users[0]?._id]
//                 ?.slice(0, numDays + daysToShowAfterToggle)
//                 ?.map((_, day) => (
//                   <td
//                     key={`grand_total_all_day_${day + 1}`}
//                     className="px-4 py-2"
//                   >
//                     {users
//                       ?.map((user) =>
//                         userDaysData?.[user._id]?.[day]
//                           ? parseInt(userDaysData?.[user._id][day], 10)
//                           : 0
//                       )
//                       .reduce((acc, val) => acc + val, 0)}
//                   </td>
//                 ))}
//               <td className="px-6 py-2">
//                 {users
//                   ?.map((user) =>
//                     userDaysData?.[user._id]
//                       ?.slice(0, numDays + daysToShowAfterToggle)
//                       ?.reduce((acc, val) => acc + parseInt(val, 10), 0)
//                   )
//                   ?.reduce((acc, val) => acc + val, 0)}
//               </td>
//             </tr>
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default App;
