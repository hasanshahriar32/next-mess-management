import React, { useEffect, useState } from "react";
import { P, Subtitle, Title } from "../ui/Heading/Heading";
import { useAppSelector } from "@/app/hooks";
import {
  useAllUserQuery,
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

const DashboardComponent = () => {
  const totalBazar = useAppSelector((state) => state.meal.totalBazarAmount);
  const totalMill = useAppSelector((state) => state.meal.grandTotal);
  console.log(totalMill);
  console.log(totalBazar);
  const average = (totalBazar / totalMill).toFixed(2);
  const { data: allUser, isLoading, isError, error } = useAllUserQuery();
  console.log(allUser?.users?.length);
  const { data: session } = useSession();
  const sessionEmail: any = session?.user?.email;
  const { data: singleUser } = useGetSingleUserQuery(sessionEmail);
  const [month, setMonth] = useState("");
  console.log(month);
  const [name, setName] = useState("");
  const handleRemove = () => {};
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
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr className="text-white">
              <th></th>
              <th>Name</th>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {allUser?.users?.map((data: any, index: any) => {
              return (
                <tr key={index}>
                  <th>{index + 1}</th>
                  <td>{data?.name}</td>
                  <td>{data?.email}</td>
                  <td className="flex gap-5">
                    {singleUser?.user?.role === "Admin" ? (
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
                        <P>Only Admin Can Take Action</P>
                      </>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
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
        <div className="grid grid-cols-2  text-white p-3 font-semibold rounded-lg cursor-pointer border-2 border-white">
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
        <div className="grid grid-cols-2  text-white p-3 font-semibold rounded-lg cursor-pointer border-2 border-white">
          <div className="flex flex-col justify-between">
            <P className="text-white">Total Bazar</P>
            <P className="text-white">{totalBazar} BDT</P>
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
        <div className="grid grid-cols-2  text-white p-3 font-semibold rounded-lg cursor-pointer border-2 border-white">
          <div className="flex flex-col justify-between">
            {" "}
            <P className="text-white">Total Mill</P>
            <P className="text-white">{totalMill}</P>
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
        <div className="grid grid-cols-2  text-white p-3 font-semibold rounded-lg cursor-pointer border-2 border-white">
          <div className="flex flex-col justify-between">
            {" "}
            <P className="text-white">Mill Rate</P>
            <P className="text-white">{average} BDT</P>
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
      <div>
        <P className="mb-5">All Users</P>
        <div className="grid grid-cols-3 items-center gap-10">
          <div className="col-span-2">
            <div className="  border-2 border-white rounded-lg px-6 py-3">
              {content}
            </div>
            <div>
              <P className="my-5">Home Rent And Bills</P>

              <div>
                <div>
                  <select
                    name="month"
                    value={month}
                    onChange={(e) => setMonth(e.target.value)}
                    className=" text-black bg-transparent select select-bordered w-full "
                  >
                    {months?.map((month) => {
                      return (
                        <>
                          <option>{month}</option>
                        </>
                      );
                    })}
                  </select>
                </div>
              </div>
              <HomeRentAndBills month={month}></HomeRentAndBills>
            </div>
          </div>
          <div className="col-span-1">
            <div className="h-44 ">
              <h2>Chart</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardComponent;
