"use client";
import { PrimaryButton } from "@/Components/ui/Buttons/PrimaryButton";
import Container from "@/Components/ui/Container/container";
import { P, Title } from "@/Components/ui/Heading/Heading";
import {
  useAddHomeAndBillsMutation,
  useGetHomeAndBillsQuery,
  useGetSelectHomeRentAndBillsQuery,
  useGetSingleHomeRentAndBillsQuery,
  useGetSingleSelectHomeRentAndBillsQuery,
} from "@/app/features/bazar/bazarApi";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

interface HomeRentAndBillsInterface {
  bills: number;
  homeRent: number;
  name: string;
  email: string;
  month: string;
  homeRentAndBills: boolean;
  homeRentDate: string;
  dayOfMonth: number;
  year: number;
}
import React, { FormEvent, useState } from "react";
const AddHomeRentAndBills = () => {
  const [homeRent, setHomeRent] = useState("");
  const [bills, setBills] = useState("");
  const [month, setMonth] = useState("");
  const [homeRentDate, setHomeRentData] = useState("");
  const [message, setMessage] = useState(false);
  const { data } = useSession();
  const router = useRouter();

  const sessionEmail: any = data?.user?.email;
  const { data: getHomeRentAndBills } =
    useGetSingleSelectHomeRentAndBillsQuery(sessionEmail);
  console.log(getHomeRentAndBills?.homeRentAndBills);

  const { data: myHomeRentAndBills } = useGetHomeAndBillsQuery();
  console.log(myHomeRentAndBills);
  const [AddHomeRentAndBills] = useAddHomeAndBillsMutation();
  const resetForm = () => {
    setHomeRent("");
    setBills("");
    setMonth("");
    setHomeRentData("");
  };

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

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const dateObject = new Date(homeRentDate);
    const monthName = dateObject.toLocaleString("default", { month: "long" });
    const year = dateObject.getFullYear();
    const dayOfMonth = dateObject.getDate();
    const expensesInfo: HomeRentAndBillsInterface = {
      bills: parseFloat(bills),
      homeRent: parseFloat(homeRent),
      month,
      homeRentDate,
      dayOfMonth,
      year,
      homeRentAndBills: false,
      name: data?.user?.name ?? "",
      email: data?.user?.email ?? "",
    };
    console.log(expensesInfo);
    try {
      const response = await AddHomeRentAndBills(expensesInfo);
      console.log(response);
      if ("data" in response) {
        setMessage(true);
      }
    } catch (error) {}
  };

  const isFormSubmitted = message === true;
  return (
    <div className="mt-16">
      <Container>
        <div>
          <Title className="mb-3 ">
            Name: {getHomeRentAndBills?.homeRentAndBills?.user}
          </Title>
          <P className="text-[#06B6D4]">
            Home Rent: {getHomeRentAndBills?.homeRentAndBills?.homeRent} BDT
          </P>
          <P className="text-[#06B6D4]">
            Month: {getHomeRentAndBills?.homeRentAndBills?.month}
          </P>

          {/* Loop through bills and display each bill type */}
          {getHomeRentAndBills?.homeRentAndBills?.bills?.map(
            ({ netBill, gasBill, electricityBill }: any, index: number) => {
              return (
                <div key={index}>
                  {netBill !== undefined && <P>Net Bill: {netBill} BDT</P>}
                  {gasBill !== undefined && <P>Gas Bill: {gasBill} BDT</P>}
                  {electricityBill !== undefined && (
                    <P>Electricity Bill: {electricityBill} BDT</P>
                  )}
                </div>
              );
            }
          )}
          <hr className="w-52 my-2"></hr>
          {/* Calculate and display total bills */}
          {getHomeRentAndBills?.homeRentAndBills?.bills && (
            <P className="">
              Total Bills:{" "}
              {getHomeRentAndBills?.homeRentAndBills?.bills.reduce(
                (total: number, bill: any) =>
                  total +
                  (bill.netBill || 0) +
                  (bill.gasBill || 0) +
                  (bill.electricityBill || 0),
                0
              )}{" "}
              BDT
            </P>
          )}
        </div>
        <div>
          <Title className="my-5">Provide Home Rent And Bills</Title>
        </div>
        {isFormSubmitted === true ? (
          <>
            <div>
              <P>
                Thanks for providing Home Rent And Bills! Waiting for Admin
                Approval.
              </P>
            </div>
          </>
        ) : (
          <>
            {" "}
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-2 gap-5">
                <select
                  name="month"
                  value={month}
                  onChange={(e) => setMonth(e.target.value)}
                  className=" select select-bordered w-full "
                >
                  <option className="selected">Select Month</option>
                  {months?.map((month) => {
                    return (
                      <>
                        <option>{month}</option>
                      </>
                    );
                  })}
                </select>
                <input
                  value={homeRentDate}
                  required
                  type="date"
                  onChange={(e) => setHomeRentData(e.target.value)}
                  className="input input-bordered w-full "
                ></input>
                <input
                  placeholder="HomeRent"
                  value={homeRent}
                  required
                  onChange={(e) => setHomeRent(e.target.value)}
                  className="input input-bordered w-full "
                ></input>
                <input
                  placeholder="Bills"
                  value={bills}
                  required
                  onChange={(e) => setBills(e.target.value)}
                  className="input input-bordered w-full mb-5"
                ></input>
              </div>
              <button
                className={`
    ${
      !homeRent ||
      !bills ||
      isNaN(parseFloat(homeRent)) ||
      isNaN(parseFloat(bills)) ||
      parseFloat(homeRent) !==
        getHomeRentAndBills?.homeRentAndBills?.homeRent ||
      parseFloat(bills) !==
        getHomeRentAndBills?.homeRentAndBills?.bills?.reduce(
          (total: number, bill: any) =>
            total +
            (bill.netBill || 0) +
            (bill.gasBill || 0) +
            (bill.electricityBill || 0),
          0
        )
        ? "bg-gray-400 cursor-not-allowed rounded-lg px-4 py-2"
        : "text-white bg-gradient-to-r from-cyan-500 to-blue-500 px-4 py-2 font-semibold rounded-lg"
    }
`}
                disabled={
                  !homeRent ||
                  !bills ||
                  isNaN(parseFloat(homeRent)) ||
                  isNaN(parseFloat(bills)) ||
                  parseFloat(homeRent) !==
                    getHomeRentAndBills?.homeRentAndBills?.homeRent ||
                  parseFloat(bills) !==
                    getHomeRentAndBills?.homeRentAndBills?.bills?.reduce(
                      (total: number, bill: any) =>
                        total +
                        (bill.netBill || 0) +
                        (bill.gasBill || 0) +
                        (bill.electricityBill || 0),
                      0
                    )
                }
              >
                Submit
              </button>
            </form>
          </>
        )}
      </Container>
    </div>
  );
};

export default AddHomeRentAndBills;
