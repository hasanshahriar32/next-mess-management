"use client";
import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import interactionPlugin from "@fullcalendar/interaction";
import resourceTimelinePlugin from "@fullcalendar/resource-timeline";
import timeGridPlugin from "@fullcalendar/timegrid";
export default class BazarDate extends React.Component {
  render() {
    return (
      <FullCalendar
        // plugins={[dayGridPlugin]}
        // initialView="dayGridMonth"
        // weekends={false}
        // events={[
        //   { title: "event 1", date: "2023-08-01" },
        //   { title: "event 2", date: "2023-08-02" },
        // ]}
        plugins={[
          resourceTimelinePlugin,
          dayGridPlugin,
          interactionPlugin,
          timeGridPlugin,
        ]}
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "resourceTimelineWeek,dayGridMonth,timeGridWeek",
        }}
        initialView="dayGridMonth"
        weekends={false}
        nowIndicator={true}
        editable={true}
        selectable={true}
        selectMirror={true}
        resources={[
          { id: "a", title: "Auditorium A" },
          { id: "b", title: "Auditorium B", eventColor: "green" },
          { id: "c", title: "Auditorium C", eventColor: "orange" },
        ]}
        initialEvents={[
          { title: "nice event", start: new Date(), resourceId: "a" },
        ]}
        events={[
          { title: "event 1", date: "2023-08-01" },
          { title: "event 2", date: "2023-08-02" },
        ]}
      />
    );
  }
}
