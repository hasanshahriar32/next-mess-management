"use client";
import DatePicker, { DateObject } from "react-multi-date-picker";
import DatePanel from "react-multi-date-picker/plugins/date_panel";
import DatePickerHeader from "react-multi-date-picker/plugins/date_picker_header";
import "react-multi-date-picker/styles/backgrounds/bg-dark.css";
import weekends from "react-multi-date-picker/plugins/highlight_weekends";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
export default function Page() {
  const [dates, setDates] = useState([]);
  const [managerData, setManagerData] = useState([]);
  const [datePickerOpen, setDatePickerOpen] = useState(true); // State to control open/close
  const { data } = useSession();
  const sessionEmail = data?.user?.email;
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://inn.vercel.app/api/admin/manage-manager/${sessionEmail}`
        );
        setManagerData(response?.data?.manager);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [sessionEmail]);
  return (
    <div className="text-xl lg:text-4xl py-6 text-center">
      <h1>Set dates for bazar picking</h1>
      <p className="text-sm lg:text-xl py-3 text-center">
        The users will be able to pick their bazar dates from the dates you set.
        You can set multiple dates.
      </p>
      <div
        className="hero  "
        style={{ backgroundImage: `url("https://placeimg.com/1000/800/tech")` }}
      >
        <div className="hero-content flex-col items-start lg:flex-row gap-5 ">
          <div className=" control-section  m-3 p-4 rounded-lg">
            {/* control  */}
            <div
              id="control_wrapper"
              style={{ maxWidth: "330px", margin: " 0 auto", float: "none" }}
              className=" multiselectWrapper "
            >
              <div
                style={{ maxwidth: " 300px", margin: "0 auto" }}
                className="calendar-control-section  text-md lg:text-lg"
              >
                <div>
                  <DatePicker
                    value={dates}
                    onChange={setDates}
                    minDate={new Date(managerData?.validity?.startDate)}
                    maxDate={new Date(managerData?.validity?.endDate)}
                    format="MMMM DD YYYY"
                    sort
                    plugins={[
                      <DatePanel position="bottom" key={1} />,
                      weekends([5, 6]),
                    ]}
                    className={`bg-dark ${
                      datePickerOpen ? "rmdp-expanded" : ""
                    }`} // Add 'rmdp-expanded' class conditionally
                    highlightToday={false}
                    onOpen={() => setDatePickerOpen(true)} // Set state to open when DatePicker is opened
                    onClose={() => setDatePickerOpen(false)} // Set state to close when DatePicker is closed
                    onOpenPickNewDate={false}
                    scrollSensitive={false}
                    mobileButtons={[
                      {
                        label: "RESET",
                        type: "button",
                        className: "rmdp-button rmdp-action-button",
                        onClick: () => setValue({}),
                      },
                    ]}
                  />
                  <></>
                </div>
              </div>
            </div>
            <form>
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-secondary">
                    Managing Slot Name
                  </span>
                </label>
                <input
                  type="text"
                  name="slot"
                  placeholder="Hasan's July management"
                  defaultValue={managerData?.administrationTitle}
                  className="input input-ghost input-bordered"
                  required={true}
                />
              </div>
              {/* //add selectedValues to the form responsse  */}

              <button
                className="btn btn-success my-3 btn-outline"
                type="submit"
              >
                Set Poll
              </button>
            </form>
          </div>

          <div className="text-lg">
            {/* min and max  */}

            {/* selected dates  */}
            <div className="">
              <label style={{ paddingTop: "22px" }}>
                Selected Management Dates
              </label>
              <div
                className="content-value"
                style={{
                  padding: "10px",
                  overflow: "auto",
                  maxHeight: "150px",
                  border: "1px solid rgba(0, 0, 0, 0.12)",
                  marginTop: "15px",
                  fontSize: "12px",
                }}
              >
                {dates.map((date) => (
                  <div key={date}>{new Date(date).toLocaleDateString()}</div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
