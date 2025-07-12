"use client";

import { Calendar, momentLocalizer } from "react-big-calendar";
import "../../../../node_modules/react-big-calendar/lib/css/react-big-calendar.css";
import moment from "moment";
import { useEffect, useLayoutEffect, useState } from "react";
import useAuthStore from "@/store/authStore";
import AppointmentPopup from "@/components/common/AppointmentCard";
import { userStore } from "@/store/userStore";
export default function Appointments() {
  const { getAppointments } = userStore();
  const { isLoading } = useAuthStore();
  const localizer = momentLocalizer(moment);
  const [appointments, setAppointmetns] = useState([]);
  const [eventss, setEvents] = useState([]);
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  const fetchAppointments = async () => {
    const res = await getAppointments();
    setAppointmetns(res);
    setEvents(
      res.map((appointment) => {
        const dates = appointment.appointmentDate.split("-").map(Number);
        const startTime = appointment.appointmentTimeFrom
          .split(":")
          .map(Number);
        const endTime = appointment.appointmentTimeTo.split(":").map(Number);
        return {
          id: appointment._id,
          title: appointment.doctorName,
          start: new Date(
            dates[2],
            dates[1] - 1,
            dates[0],
            startTime[0],
            startTime[1]
          ),
          end: new Date(
            dates[2],
            dates[1] - 1,
            dates[0],
            endTime[0],
            endTime[1]
          ),
        };
      })
    );
  };
  useLayoutEffect(() => {
    fetchAppointments();
  }, []);

  useEffect(() => {}, [eventss]);

  return (
    <div className="container p-6 space-y-8 w-full mx-auto">
      <header className="flex justify-between items-center w-full">
        <h1 className="text-2xl font-semibold ">My Appointments</h1>
      </header>
      {/* Show the card of the selected appointment */}
      <div className="h-[600px]">
        {isLoading && (
          <div className="flex justify-center items-center h-full">
            <h1 className="text-2xl font-semibold ">No Appointments</h1>
          </div>
        )}

        {eventss.length === 0 && !isLoading && (
          <div className="flex justify-center items-center h-full">
            <h1 className="text-2xl font-semibold ">No Appointments</h1>
          </div>
        )}
        {eventss.length > 0 && !isLoading && (
          <Calendar
            events={eventss}
            localizer={localizer}
            style={{ height: 500 }}
            onSelectEvent={(event) => {
              setSelectedAppointment(
                appointments.find((appointment) => appointment._id === event.id)
              );
            }}
            popup={true}
          />
        )}
      </div>
      {selectedAppointment && (
        <AppointmentPopup
          appointment={selectedAppointment}
          onClose={() => setSelectedAppointment(null)}
        />
      )}
    </div>
  );
}
