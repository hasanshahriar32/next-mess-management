"use client";
import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import Image from "next/image";
import { useSession } from "next-auth/react";
// ... (previous imports and code)

export default function BazarDate() {
  const { data } = useSession();
  const [events, setEvents] = useState([]);
  const [tooltipEvent, setTooltipEvent] = useState(null);

  const handleDeleteEvent = (eventToDelete) => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      setEvents(events.filter((event) => event !== eventToDelete));
    }
  };

  const handleDateClick = (arg) => {
    if (
      window.confirm("Would you like to add an event to " + arg.dateStr + " ?")
    ) {
      const title = prompt("Enter Event Title");
      const description = prompt("Enter Event Description");
      if (title && description) {
        setEvents([
          ...events,
          {
            title: title,
            description: description,
            start: arg.date,
            allDay: true,
          },
        ]);
      }
    }
  };

  const handleEventMouseEnter = (arg) => {
    setTooltipEvent(arg.event);
  };

  const handleEventMouseLeave = () => {
    setTooltipEvent(null);
  };

  const renderEventContent = (eventInfo) => {
    return (
      <div
        className="flex justify-between items-center p-2 bg-gray-100 rounded"
        onMouseEnter={() => handleEventMouseEnter(eventInfo)}
        onMouseLeave={handleEventMouseLeave}
      >
        <p className="font-semibold text-gray-800">{eventInfo.timeText}</p>
        {/* set image  */}
        <Image
          className="object-cover rounded-full h-7 w-7"
          src={data?.user?.image || ""}
          alt="avatar"
          width={30}
          height={30}
        />
        <p className="text-gray-800">{eventInfo.event.title}</p>
        <button
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded-sm"
          onClick={() => handleDeleteEvent(eventInfo.event)}
        >
          Delete
        </button>
      </div>
    );
  };

  return (
    <div className="container mx-auto p-4">
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin, listPlugin]}
        themeSystem="bootstrap"
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "timeGridWeek,dayGridMonth,listMonth",
        }}
        initialView="dayGridMonth"
        dateClick={handleDateClick}
        eventMouseEnter={handleEventMouseEnter}
        eventMouseLeave={handleEventMouseLeave}
        weekends={false}
        nowIndicator={true}
        editable={true}
        selectable={true}
        selectMirror={true}
        eventContent={renderEventContent}
        events={events}
      />
      {tooltipEvent && (
        <div className="tooltip">
          <p>{tooltipEvent.title}</p>
          <p>{tooltipEvent.extendedProps.description}</p>
        </div>
      )}
    </div>
  );
}
