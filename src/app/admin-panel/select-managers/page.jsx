"use client";
import * as React from "react";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { StaticDateRangePicker } from "@mui/x-date-pickers-pro/StaticDateRangePicker";
import { FormControlLabel, Switch } from "@mui/material";
import { useSession } from "next-auth/react";
import axios from "axios";
import { env } from "process";

const shortcutsItems = [
  {
    label: "This Week",
    getValue: () => {
      const today = dayjs();
      return [today.startOf("week"), today.endOf("week")];
    },
  },
  {
    label: "Last Week",
    getValue: () => {
      const today = dayjs();
      const prevWeek = today.subtract(7, "day");
      return [prevWeek.startOf("week"), prevWeek.endOf("week")];
    },
  },
  {
    label: "Last 7 Days",
    getValue: () => {
      const today = dayjs();
      return [today.subtract(7, "day"), today];
    },
  },
  {
    label: "Current Month",
    getValue: () => {
      const today = dayjs();
      return [today.startOf("month"), today.endOf("month")];
    },
  },
  {
    label: "Next Month",
    getValue: () => {
      const today = dayjs();
      const startOfNextMonth = today.endOf("month").add(1, "day");
      return [startOfNextMonth, startOfNextMonth.endOf("month")];
    },
  },
  { label: "Reset", getValue: () => [null, null] },
];

function SelectedDatesDisplay({ selectedDates }) {
  const { data } = useSession();
  const sessionEmail = data?.user?.email;
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const title = form.title.value;
    const email = form.email.value;
    // console.log(title, email);
    const dataToPost = {
      email,
      validity: {
        startDate: `${selectedDates[0].format("YYYY-MM-DD")}`,
        endDate: `${selectedDates[1].format("YYYY-MM-DD")}`,
      },
      adminMaker: sessionEmail,
      administrationTitle: title,
    };
    console.log(dataToPost);
    try {
      const response = await axios.post(
        `https://inn.vercel.app/api/admin/manage-manager`,
        dataToPost
      );
      console.log(response);
      if (response.status === 201) {
        // fetchEvents(); // Refresh events after adding
        alert(response?.data?.message);
      }
    } catch (error) {
      console.error("Error adding event:", error);
      alert(error?.response?.data?.message);
    }
  };
  return (
    <div className="hero min-h-screen ">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Select new admin!</h1>
          <h2>Selected Dates:</h2>
          {selectedDates[0] && (
            <p>Start Date: {selectedDates[0].format("YYYY-MM-DD")}</p>
          )}
          {selectedDates[1] && (
            <p>End Date: {selectedDates[1].format("YYYY-MM-DD")}</p>
          )}
        </div>
        <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <form onSubmit={handleSubmit} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="email"
                name="email"
                className="input input-bordered"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Title of Administration</span>
              </label>
              <input
                type="text"
                placeholder="title"
                name="title"
                className="input input-bordered"
              />
              {/*
              <label className="label">
                <a href="#" className="label-text-alt link link-hover">
                  Forgot password?
                </a>
              </label>*/}
            </div>
            <div className="form-control mt-6">
              <button type="submit" className="btn btn-warning">
                Set Admin
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default function DateRangePickerWithDisplay() {
  const [isDesktop, setIsDesktop] = React.useState(
    typeof window !== "undefined" ? window.innerWidth >= 768 : false
  );

  const [selectedDates, setSelectedDates] = React.useState([null, null]);

  React.useEffect(() => {
    const handleResize = () => {
      setIsDesktop(
        typeof window !== "undefined" ? window.innerWidth >= 768 : false
      );
    };

    if (typeof window !== "undefined") {
      window.addEventListener("resize", handleResize);
      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }
  }, []);

  const handleDateChange = (newDates) => {
    setSelectedDates(newDates);
    console.log("Selected dates:", newDates);
  };

  const [future, setFuture] = React.useState(false);
  const handleChangeDense = (event) => {
    setFuture(event.target.checked);
  };

  return (
    <div className="hero min-h-screen ">
      <div className="hero-content flex-col ">
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <StaticDateRangePicker
            slotProps={{
              shortcuts: {
                items: shortcutsItems,
              },
              actionBar: { actions: [] },
            }}
            calendars={isDesktop ? 2 : 1}
            disablePast={future}
            onChange={handleDateChange}
            value={selectedDates}
          />
          <FormControlLabel
            control={<Switch checked={future} onChange={handleChangeDense} />}
            label="Disable Past"
          />
        </LocalizationProvider>
        <SelectedDatesDisplay selectedDates={selectedDates} />
      </div>
    </div>
  );
}
