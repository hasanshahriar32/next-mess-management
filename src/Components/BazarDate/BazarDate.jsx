"use client";
import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import resourceTimelinePlugin from "@fullcalendar/resource-timeline";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";

export default class BazarDate extends React.Component {
  state = {
    events: [],
  };

  render() {
    return (
      <div className="container mx-auto p-4">
        <FullCalendar
          plugins={[
            dayGridPlugin,
            interactionPlugin,
            timeGridPlugin,
            listPlugin,
          ]}
          themeSystem="bootstrap"
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "timeGridWeek,dayGridMonth,listMonth",
          }}
          initialView="dayGridMonth"
          dateClick={this.handleDateClick}
          weekends={false}
          nowIndicator={true}
          editable={true}
          selectable={true}
          selectMirror={true}
          eventContent={this.renderEventContent}
          events={this.state.events}
        />
      </div>
    );
  }

  renderEventContent = (eventInfo) => {
    return (
      <div className="flex justify-between items-center p-2 bg-gray-100 rounded">
        <p className="font-semibold text-gray-800">{eventInfo.timeText}</p>
        <p className="text-gray-800">{eventInfo.event.title}</p>
        <button
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded-sm"
          onClick={() => this.handleDeleteEvent(eventInfo.event)}
        >
          Delete
        </button>
      </div>
    );
  };

  handleDeleteEvent = (eventToDelete) => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      this.setState({
        events: this.state.events.filter((event) => event !== eventToDelete),
      });
    }
  };

  handleDateClick = (arg) => {
    if (
      window.confirm("Would you like to add an event to " + arg.dateStr + " ?")
    ) {
      const title = prompt("Enter Event Title");
      const description = prompt("Enter Event Description");
      if (title && description) {
        this.setState({
          events: [
            ...this.state.events,
            {
              title: title,
              description: description,
              start: arg.date,
              allDay: true,
            },
          ],
        });
      }
    }
  };
}
