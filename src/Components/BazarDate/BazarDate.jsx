"use client";
import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import Image from "next/image";
import { useSession } from "next-auth/react";
import axios from "axios";

export default function BazarDate() {
  const { data } = useSession();
  const [events, setEvents] = useState([]);
  const handleDeleteEvent = async (eventIdToDelete) => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      try {
        const response = await axios.delete(
          `https://inn.vercel.app/api/scheduler?id=${eventIdToDelete}`
        );

        if (response.status === 200) {
          setEvents(events.filter((event) => event._id !== eventIdToDelete));
        }
      } catch (error) {
        console.error("Error deleting event:", error);
      }
    }
  };

  const fetchEvents = async () => {
    try {
      const response = await axios.get("https://inn.vercel.app/api/scheduler");
      const schedules = response.data.schedules;

      const formattedEvents = schedules.map((schedule) => ({
        _id: schedule._id,
        title: schedule.title,
        description: schedule.details,
        name: schedule?.name,
        email: schedule?.email,
        image: schedule?.image,
        start: new Date(schedule.schedule),
        allDay: true,
      }));
      console.log(formattedEvents);
      setEvents(formattedEvents);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  // Fetch events on component mount
  useEffect(() => {
    fetchEvents();
  }, []);

  const handleDateClick = async (arg) => {
    if (
      window.confirm("Would you like to add an event to " + arg.dateStr + " ?")
    ) {
      const title = prompt("Enter Event Title");
      const description = prompt("Enter Event Description");

      if (title && description) {
        try {
          const response = await axios.post(
            "https://inn.vercel.app/api/scheduler",
            {
              name: data?.user?.name,
              email: data?.user?.email,
              image: data?.user?.image,
              schedule: arg.date.toISOString(),
              details: description,
              title: title,
            }
          );

          if (response.status === 201) {
            fetchEvents(); // Refresh events after adding
          }
        } catch (error) {
          console.error("Error adding event:", error);
        }
      }
    }
  };

  const renderEventContent = (eventInfo) => {
    return (
      <div className="flex justify-between items-center p-2 tooltip tooltip-accent bg-gray-100 rounded">
        <p className="font-semibold text-gray-800">{eventInfo.timeText}</p>
        <div
          data-tip={`${eventInfo.event._def.extendedProps?.name}`}
          className="tooltip tooltip-accent"
        >
          <Image
            className="object-cover rounded-full h-7 w-7"
            src={eventInfo.event._def.extendedProps?.image || ""}
            alt="avatar"
            width={30}
            height={30}
          />
        </div>
        <p className="text-gray-800">{eventInfo.event.title}</p>
        {data?.user?.email === eventInfo.event._def.extendedProps?.email && (
          <button
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded-sm"
            onClick={() =>
              handleDeleteEvent(eventInfo.event._def.extendedProps._id)
            }
          >
            Delete
          </button>
        )}
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
        weekends={false}
        nowIndicator={true}
        editable={true}
        selectable={true}
        selectMirror={true}
        eventContent={renderEventContent}
        events={events}
      />
    </div>
  );
}
