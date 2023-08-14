"use client";
import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import resourceTimelinePlugin from "@fullcalendar/resource-timeline";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list"; // Import the listPlugin for month view
// import bootstrapPlugin from "@fullcalendar/bootstrap"; // Import the bootstrapPlugin for styling

export default class BazarDate extends React.Component {
  state = {
    events: [],
  };

  render() {
    return (
      <div>
        <FullCalendar
          plugins={[
            // resourceTimelinePlugin,
            dayGridPlugin,
            interactionPlugin,
            timeGridPlugin,
            listPlugin, // Add the listPlugin
          ]}
          themeSystem="bootstrap" // Use the bootstrap theme
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            // right: "resourceTimelineWeek,timeGridWeek,dayGridMonth,listMonth", // Add the week, month, and year views
            right: "timeGridWeek,dayGridMonth,listMonth", // Add the week, month, and year views
          }}
          initialView="dayGridMonth"
          dateClick={this.handleDateClick}
          weekends={false}
          nowIndicator={true}
          editable={true}
          selectable={true}
          selectMirror={true}
          // resources={[
          //   { id: "a", title: "Auditorium A" },
          //   { id: "b", title: "Auditorium B", eventColor: "green" },
          //   { id: "c", title: "Auditorium C", eventColor: "orange" },
          // ]}
          eventContent={this.renderEventContent}
          events={this.state.events}
        />
      </div>
    );
  }

  renderEventContent = (eventInfo) => {
    return (
      <div>
        <p>{eventInfo.timeText}</p>
        <p>{eventInfo.event.title}</p>
        <button
          className="btn btn-error btn-sm btn-outline"
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
