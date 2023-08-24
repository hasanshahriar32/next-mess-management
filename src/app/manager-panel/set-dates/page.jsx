"use client";
import "./DateSelect.module.css";
// import * as React from "react";
// import { updateSampleSection } from "./sample-base";
import { CalendarComponent } from "@syncfusion/ej2-react-calendars";
import React from "react";
import { registerLicense } from "@syncfusion/ej2-base";
registerLicense(
  `Ngo9BigBOggjHTQxAR8/V1NGaF1cXGNCf1FpRmJGdld5fUVHYVZUTXxaS00DNHVRdkdgWXdcdHVTRmVZWURxXUU=`
);
const DateSelect = () => {
  let calendarInstance;

  // //get data from localstorage
  // const data = window.localStorage.getItem("selectedMealDate");

  // //split by comma
  // const dataSplit = data?.split(",");
  // //convert to date
  // const dataDate = dataSplit?.map((item) => new Date(item));

  // //retrieve data from localstorage
  // const data = window.localStorage.getItem("selectedMealDate");
  // //split by comma
  // const dataSplit = data?.split(",");
  // //convert to date
  // const dataDate = dataSplit?.map((item) => new Date(item));
  // //set to selectedValues
  const selectedValues = [];

  const [modmindate, setmodMindate] = React.useState(new Date());
  const [modmaxdate, setmodMaxdate] = React.useState(new Date());

  //if mealDate is available then retrieve it

  React.useEffect(() => {
    const meal = window.localStorage.getItem("mealDate");
    console.log(meal);
    if (meal != null) {
      const mealDates = meal?.split(" ");

      const mealDate1 = mealDates[0];
      const mealDate2 = mealDates[1];

      setmodMindate(mealDate1);
      setmodMaxdate(mealDate2);
    }
  }, []);

  // set min and max date
  const updateMinSection = (e) => {
    const minDateValue = new Date(document.getElementById("minDate").value);
    // calendarInstance.min = minDateValue;
    // calendarInstance.dataBind();
    console.log(e.target.value);
    setmodMindate(e.target.value);
    // setMindate(minDate);
  };
  const updateMaxSection = (e) => {
    const minDateValue = new Date(document.getElementById("minDate").value);
    // calendarInstance.min = minDateValue;
    // calendarInstance.dataBind();
    console.log(e.target.value);
    setmodMaxdate(e.target.value);
    // setMindate(minDate);
  };

  // range
  const minDate = modmindate;
  const maxDate = modmaxdate;
  // const selectedDateForMeal = [];
  function onchange(args) {
    /*Displays selected date in the label*/
    // document.getElementById("date_label").textContent =
    //   "Selected Value: " + args.value.toLocaleDateString();

    var element = document.getElementById("multiselect");
    element.innerHTML = "";
    for (var index = 0; index < calendarInstance?.values.length; index++) {
      element.insertBefore(
        document.createTextNode(calendarInstance.values[index].toString()),
        element.childNodes[0]
      );
      // make a  line break and list the selected dates
      element.insertBefore(document.createElement("br"), element.childNodes[0]);
      console.log(calendarInstance.values[index].toString() + " ");
      // selectedDateForMeal.push(calendarInstance.values[index].toString());
      //if data already exists then remove it
      //if data already exists then remove it
      if (selectedValues.includes(args.value)) {
        const index = selectedValues.indexOf(args.value);
        if (index > -1) {
          selectedValues.splice(index, 1);
        }
      }
      //if data does not exist then add it
      else {
        selectedValues.push(args.value);
      }

      //set to localstorage
      //if there already is a value in localstorage then add the new after it
      const meal = localStorage.getItem("selectedMealDate");
      if (meal) {
        localStorage.setItem("selectedMealDate", meal + "," + args.value);
      }
      //if same date is selected twice then remove it
      else if (meal === args.value) {
        localStorage.removeItem("selectedMealDate");
      }
      //if there is no value in localstorage then add the new value
      else {
        localStorage.setItem("selectedMealDate", args.value);
      }
    }
  }
  const setSubmit = () => {
    localStorage.setItem("mealDate", modmindate + " " + modmaxdate);
  };

  const setSlot = (e) => {
    e.preventDefault();
    const slot = e.target.slot.value;
    // localStorage.setItem("slot",slot);
    const mealDate = selectedValues;
    console.log(slot);
    console.log(selectedValues);
  };

  return (
    <div className="text-xl lg:text-4xl py-6 text-center">
      <h1>Set dates for bazar picking</h1>
      <p className="text-sm lg:text-xl py-3 text-center">
        The users will be able to pick their bazar dates from the dates you set.
        You can set multiple dates.
      </p>
      <div
        className="hero  "
        // style={{ backgroundImage: `url("https://placeimg.com/1000/800/tech")` }}
      >
        <div className="hero-content flex-col lg:flex-row gap-5 ">
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
                <CalendarComponent
                  id="calendar"
                  isMultiSelection={true}
                  values={selectedValues}
                  min={minDate}
                  max={maxDate}
                  ref={(scope) => {
                    calendarInstance = scope;
                  }}
                  change={onchange.bind(this)}
                  created={onchange.bind(this)}
                  style={{ width: "100%" }}
                ></CalendarComponent>
              </div>
            </div>
          </div>

          <div className="text-lg">
            {/* min and max  */}
            <div className="my-3">
              <label style={{ paddingTop: "22px" }}>From Date </label>
              <input
                type="date"
                id="minDate"
                onChange={updateMinSection}
                className="e-input input input-ghost mr-5"
              />
              <label style={{ paddingTop: "22px" }}>To Date </label>
              <input
                type="date"
                id="maxDate"
                className="e-input input input-ghost"
                onChange={updateMaxSection}
                //set value 7 days from today
                // defaultValue={
                //   new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000)
                //     .toISOString()
                //     .split("T")[0]
                // }
              />
              <button
                type="submit"
                className="btn btn-secondary btn-outline mx-2"
                onClick={setSubmit}
              >
                Set
              </button>
            </div>

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
                <div id="multiselect"></div>
              </div>
              <form onSubmit={setSlot}>
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
                    className="input input-ghost input-bordered"
                    required={true}
                  />
                </div>
                {/* //add selectedValues to the form responsse  */}

                <button
                  className="btn btn-success my-3 btn-outline"
                  type="submit"
                >
                  Confirm
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DateSelect;
