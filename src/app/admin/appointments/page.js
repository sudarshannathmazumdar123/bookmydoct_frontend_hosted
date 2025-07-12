"use client"

import useClinicAdminPanelStore from "@/store/clinicAdminPanelStore";
import { Calendar, Views, momentLocalizer } from "react-big-calendar";
import '../../../../node_modules/react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';
import { useEffect, useLayoutEffect, useState } from "react";
import AppointmentPopup from "@/components/common/AppointmentCard";
export default function Appointments() {
    const { getAppointments, appointments, setActiveTab } = useClinicAdminPanelStore();
    const [events, setEvents] = useState([]);
    useLayoutEffect(() => {
        getAppointments()
    }, [])
    const [selectedAppointment, setSelectedAppointment] = useState(null);

    useLayoutEffect(() => {
        setActiveTab('appointments')
    }, [])


    useEffect(() => {

        setEvents(appointments?.map(appointment => {
            const dates = appointment?.appointmentDate.split("-").map(Number);
            const startTime = appointment?.appointmentTimeFrom.split(":").map(Number);
            const endTime = appointment?.appointmentTimeTo?.split(":").map(Number);
            if (dates && startTime && endTime) {
                return {
                    id: appointment._id,
                    title: appointment.doctorName,
                    start: new Date(dates[2], dates[1] - 1, dates[0], startTime[0], startTime[1]),
                    end: new Date(dates[2], dates[1] - 1, dates[0], endTime[0], endTime[1])
                }
            }
        }))

    }, [appointments]);

    const localizer = momentLocalizer(moment);
    return (
        <div className="p-6 space-y-8 w-full">
            <header className="flex justify-between items-center w-full">
                <h1 className="text-2xl font-semibold ">Appointments</h1>

            </header>



            <div className="h-[600px]">
                {
                    events.length === 0 &&
                    <div className="flex justify-center items-center h-full">
                        <h1 className="text-2xl font-semibold ">No Appointments</h1>
                    </div>
                }
                {events.length > 0 &&
                    <Calendar
                        events={events}
                        localizer={localizer}
                        style={{ height: 500 }}
                        onSelectEvent={(event) => {
                            setSelectedAppointment(appointments.find(appointment => appointment._id === event.id));
                        }}
                        popup={true}
                    />
                }

            </div>
            {selectedAppointment && <AppointmentPopup appointment={selectedAppointment} onClose={() => setSelectedAppointment(null)} />}

        </div>
    )
}