"use client";

import React, { useEffect, useState } from "react";
import LoadingAnimation from "@/components/common/Loading";
import useSuperAdminStore from "@/store/superAdminStore";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const page = () => {
  const [loading, setLoading] = useState(true);
  const { getAllAppointments } = useSuperAdminStore();
  const [appointments, setAppointments] = useState([]);

  const fetchAllAppointments = async () => {
    try {
      const response = await getAllAppointments();
      setAppointments(response.appointments || []);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllAppointments();
  }, []);

  if (loading) {
    return <LoadingAnimation />;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">All Appointments</h1>

      {appointments.length === 0 ? (
        <div className="text-center text-gray-500 mt-8">
          No appointments found
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {appointments.map((appointment) => (
            <Card key={appointment._id} className="shadow">
              <CardHeader>
                <CardTitle className="text-lg">
                  {appointment.fullName}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                    <p>
                        <span className="font-semibold">Age: </span>
                        {appointment.age}
                    </p>
                    <p>
                        <span className="font-semibold">Doctor Name: </span>
                        {appointment.doctorName}
                    </p>
                    <p>
                        <span className="font-semibold">Clinic: </span>
                        {appointment.clinicName}
                    </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default page;
