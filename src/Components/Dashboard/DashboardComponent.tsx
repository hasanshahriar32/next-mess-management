import React, { useEffect, useState } from "react";
import { P, Subtitle, Title } from "../ui/Heading/Heading";
import { useAppSelector } from "@/app/hooks";
import {
  useAllUserQuery,
  useGetBazarQuery,
  useGetMealCountQuery,
  useGetSingleUserQuery,
} from "@/app/features/bazar/bazarApi";
import { BiEdit } from "react-icons/bi";
import { AiOutlineDelete } from "react-icons/ai";
import { useSession } from "next-auth/react";
import { PureComponent } from "react";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell,
  PieChart,
  Pie,
} from "recharts";
import AllHomeRentAndBills from "./AllHomeRentAndBills/AllHomeRentAndBills";
import HomeRentAndBills from "./HomerentAndBills/HomerentAndBills";
import AllBazar from "./AllBazar/AllBazar";
import Link from "next/link";
import Image from "next/image";

const DashboardComponent = () => {
  const { data: allMealCount } = useGetMealCountQuery();
  const { data: allBazar } = useGetBazarQuery();
  const allUsersMonth = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const [userMonth, setUserMonth] = useState(
    allUsersMonth[new Date().getMonth()]
  );
  const bazarFilterData = allBazar?.bazars?.filter(
    (bazar: any) => bazar?.bazarStatus === true
  );
  const filteredBazarData = bazarFilterData?.filter((bazar: any) =>
    bazar?.month.includes(userMonth)
  );
  console.log(filteredBazarData);
  let totalBazarAmount: any = 0;

  if (filteredBazarData && filteredBazarData.length > 0) {
    totalBazarAmount = filteredBazarData.reduce(
      (sum: any, bazar: any) => sum + bazar.amount,
      0
    );
  } else {
    console.log("No filtered data available.");
  }

  const groupedData: { [key: string]: any } = {};
  allMealCount?.mealCount?.forEach((data: any) => {
    const key = `${data.month}-${data.mealYear}`;
    console.log(key);
    if (!groupedData[key]) {
      groupedData[key] = {
        totalMeal: data.mealNumber,
        month: data.month,
        year: data.mealYear,
      };
    } else {
      groupedData[key].totalMeal += data.mealNumber;
    }
  });
  const mealInfo = Object?.values(groupedData);
  console.log(mealInfo);
  // const personMealInfo: { [key: string]: any } = {};
  // filteredBazarData?.forEach((data: any) => {
  //   if (!personMealInfo[data.user]) {
  //     personMealInfo[data.user] = {
  //       userName: data.user, // Add the username
  //       totalMeal: data.mealNumber,
  //       month: data.month,
  //       year: data.mealYear,
  //     };
  //   } else {
  //     personMealInfo[data.user].totalMeal += data.mealNumber;
  //   }
  // });
  const usersMealInfo = Object?.values(mealInfo);
  const totalMealOfMonth = usersMealInfo
    .filter((data: any) => data?.month === userMonth)
    .reduce((totalMeal: number, info: any) => totalMeal + info.totalMeal, 0);
  console.log(totalMealOfMonth);

  let averageBazarPerMeal = 0;
  if (totalBazarAmount !== 0) {
    averageBazarPerMeal = totalBazarAmount / totalMealOfMonth; // Replace totalMealCount with the actual count
  }
  console.log(averageBazarPerMeal);

  const average = {};
  const { data: allUser, isLoading, isError, error } = useAllUserQuery();
  console.log(allUser?.users?.length);
  const { data: session } = useSession();
  const sessionEmail: any = session?.user?.email;
  const { data: singleUser } = useGetSingleUserQuery(sessionEmail);
  console.log(singleUser);
  const [name, setName] = useState("");

  const handleRemove = () => {};

  let filteredUsers = allUser?.users;
  if (userMonth !== "") {
    filteredUsers = filteredUsers?.filter(
      (user: any) => userMonth === user.month
    );
  }
  let content;
  if (isLoading && !isError) {
    content = (
      <div className="h-screen flex justify-center items-center ">
        <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-cyan-500"></div>
      </div>
    );
  } else if (!isLoading && isError && !allUser?.users) {
    content = <P>There is An Error</P>;
  } else if (!isLoading && !isError && allUser?.users?.length === 0) {
    content = <P>Bazar Not Found</P>;
  } else if (!isLoading && !isError && allUser?.users?.length > 0) {
    content = (
      <>
        {filteredUsers && filteredUsers?.length > 0 ? (
          <>
            <div className="overflow-x-auto">
              <table className="table">
                <thead>
                  <tr className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 px-4 py-2 font-semibold rounded-lg">
                    <th></th>
                    <th>Image</th>
                    <th>Name</th>

                    <th>Email</th>
                    <th>Action</th>
                    <th>Report Card</th>
                    <th>Profile</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers?.map((data: any, index: any) => {
                    return (
                      <tr key={index}>
                        <th>{index + 1}</th>
                        <td>
                          <Image
                            src={data?.selectedImage}
                            alt=""
                            width={30}
                            height={30}
                            className="rounded-full"
                          ></Image>
                        </td>
                        <td>{data?.name}</td>

                        <td>{data?.email}</td>
                        <td className="flex gap-5">
                          {singleUser?.user?.role === "superAdmin" ? (
                            <>
                              {" "}
                              <button>
                                <BiEdit className="text-xl"></BiEdit>
                              </button>
                              <button>
                                <AiOutlineDelete className="text-xl"></AiOutlineDelete>
                              </button>
                            </>
                          ) : (
                            <>
                              <P>For Admin </P>
                            </>
                          )}
                        </td>
                        <td>
                          {data?.reportCardStatus === false ? (
                            <>
                              <Link
                                href={`/dashboard/report-card/${data?.email}`}
                              >
                                <button> Make Report Card</button>
                              </Link>
                            </>
                          ) : (
                            <>Report Card Done</>
                          )}
                        </td>
                        <td>
                          <Link href={`dashboard/users-profile/${data?.email}`}>
                            Profile
                          </Link>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </>
        ) : (
          <>
            <P>No User Found For This month </P>
          </>
        )}
      </>
    );
  }

  const data = [
    {
      name: "Page A",
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: "Page B",
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: "Page C",
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: "Page D",
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: "Page E",
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: "Page F",
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: "Page G",
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
  ];
  const barChartData = [
    {
      name: "Page A",
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: "Page B",
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: "Page C",
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: "Page D",
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: "Page E",
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: "Page F",
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: "Page G",
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
  ];
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const UserName = ["Pervez Hossain", "Sakib Vai Pro", "Raihan", "Hasan"];

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];
  return (
    <div>
      <Title>OverView</Title>
      <div className="grid grid-cols-4 gap-10 my-10">
        <div className="grid grid-cols-2  text-white p-5 font-semibold rounded-lg cursor-pointer border-2 border-white">
          <div className="flex flex-col justify-between">
            {" "}
            <P className="text-white">Total User</P>
            <P className="text-white">{allUser?.users?.length}</P>
            <P className="text-white">View All</P>
          </div>
          <div>
            <div className="h-16 ">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart width={300} height={100} data={data}>
                  <Tooltip
                    contentStyle={{ background: "transparent", border: "none" }}
                    labelStyle={{ display: "none" }}
                    position={{ x: -10, y: 40 }}
                  ></Tooltip>
                  <Line
                    type="monotone"
                    dataKey="pv"
                    stroke="rgb(6 182 212) "
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <P className="text-end text-[#06B6D4]">45%</P>
            <P className="text-end text-white">This Month</P>
          </div>
        </div>
        <div className="grid grid-cols-2  text-white p-5 font-semibold rounded-lg cursor-pointer border-2 border-white">
          <div className="flex flex-col justify-between">
            <P className="text-white">Total Bazar</P>
            <P className="text-white">{totalBazarAmount} BDT</P>
            <P className="text-white">View All</P>
          </div>
          <div>
            <div className="h-16 ">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart width={300} height={100} data={data}>
                  <Tooltip
                    contentStyle={{ background: "transparent", border: "none" }}
                    labelStyle={{ display: "none" }}
                    position={{ x: -10, y: 40 }}
                  ></Tooltip>
                  <Line
                    type="monotone"
                    dataKey="pv"
                    stroke="rgb(6 182 212) "
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <P className="text-end text-[#06B6D4]">45%</P>
            <P className="text-end text-white">This Month</P>
          </div>
        </div>
        <div className="grid grid-cols-2  text-white p-5 font-semibold rounded-lg cursor-pointer border-2 border-white">
          <div className="flex flex-col justify-between">
            {" "}
            <P className="text-white">Total Mill</P>
            <P className="text-white">{totalMealOfMonth}</P>
            <P className="text-white">View All</P>
          </div>
          <div>
            <div className="h-16 ">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart width={300} height={100} data={data}>
                  <Tooltip
                    contentStyle={{ background: "transparent", border: "none" }}
                    labelStyle={{ display: "none" }}
                    position={{ x: -10, y: 40 }}
                  ></Tooltip>
                  <Line
                    type="monotone"
                    dataKey="pv"
                    stroke="rgb(6 182 212) "
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <P className="text-end text-[#06B6D4]">45%</P>
            <P className="text-end text-white">This Month</P>
          </div>
        </div>
        <div className="grid grid-cols-2  text-white p-5 font-semibold rounded-lg cursor-pointer border-2 border-white">
          <div className="flex flex-col justify-between">
            {" "}
            <P className="text-white">Mill Rate</P>
            <P className="text-white">{averageBazarPerMeal.toFixed(2)} BDT</P>
            <P className="text-white">View All</P>
          </div>
          <div>
            <div className="h-16 ">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart width={300} height={100} data={data}>
                  <Tooltip
                    contentStyle={{ background: "transparent", border: "none" }}
                    labelStyle={{ display: "none" }}
                    position={{ x: -10, y: 40 }}
                  ></Tooltip>
                  <Line
                    type="monotone"
                    dataKey="pv"
                    stroke="rgb(6 182 212) "
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <P className="text-end text-[#06B6D4]">45%</P>
            <P className="text-end text-white">This Month</P>
          </div>
        </div>
      </div>
      <div className="   my-16 border-2   border-white rounded-lg p-5 min-h-72">
        <AllBazar></AllBazar>
      </div>
      <div className="my-16 border-2 border-white rounded-lg p-5">
        <HomeRentAndBills></HomeRentAndBills>
      </div>

      <div>
        <div className=" border-2 border-white rounded-lg px-6 py-3">
          <div className="flex justify-between my-5">
            <Subtitle className="">All Users</Subtitle>
            <div>
              <select
                name="userMonth"
                required
                value={userMonth}
                onChange={(e) => setUserMonth(e.target.value)}
                className="border-2 border-white select select-bordered w-full"
              >
                <option value="">Filter by Month</option>
                {allUsersMonth?.map((month) => (
                  <option key={month} value={month}>
                    {month}
                  </option>
                ))}
              </select>
            </div>
          </div>
          {content}
        </div>
      </div>
    </div>
  );
};

export default DashboardComponent;
