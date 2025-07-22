"use client";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { X, Plus } from "lucide-react";
import useClinicAdminPanelStore from "@/store/clinicAdminPanelStore";
import useAuthStore from "@/store/authStore";
import toast from "react-hot-toast";
import { specializations } from "@/lib/constants";
import useSuperAdminStore from "@/store/superAdminStore";

export default function EditDoctor({
  isDrawerOpen,
  setIsDrawerOpen,
  oldDoctor,
}) {
  console.log("oldDoctor :: ", oldDoctor);

  const { updateDoctor, isLoading } = useClinicAdminPanelStore();
  const { user } = useAuthStore();
  const { specializations, getSpecializations } = useSuperAdminStore();
  const [loadingSpecializations, setLoadingSpecializations] = useState(true);
  const [schedule, setSchedule] = useState(oldDoctor?.schedule);
  const [doctor, setDoctor] = useState({});
  const handleAddSchedule = () => {
    setSchedule([
      ...schedule,
      {
        id: schedule.length + 1,
        day: "MON",
        startTime: "09:00",
        endTime: "17:00",
        maxSlots: "00",
      },
    ]);
  };

  useEffect(() => {
    const fetchSpecializations = async () => {
      try {
        await getSpecializations();
      } catch (error) {
        console.error("Error fetching specializations:", error);
      } finally {
        setLoadingSpecializations(false);
      }
    };
    fetchSpecializations();
  }, []);

  useEffect(() => {
    if (oldDoctor) {
      setDoctor({
        fullName: oldDoctor?.fullName,
        doctorNotes: oldDoctor?.doctorNotes,
        email: oldDoctor?.email,
        phoneNumber: oldDoctor?.phoneNumber,
        specialization: oldDoctor?.specialization,
        registrationNumber: oldDoctor?.registrationNumber,
        fee: oldDoctor?.fees?.find((fee) => fee.clinicId === user?.clinicId)
          ?.fee,
        qualification: oldDoctor?.medicalDegree,
        experience: oldDoctor?.experience,
      });

      setSchedule(
        oldDoctor?.appointmentsSchedule
          .find((clinic) => clinic.clinicId === user.clinicId)
          .schedule.map((schedule) => {
            return {
              id: schedule._id,
              day: schedule.day,
              startTime: schedule.startTime,
              endTime: schedule.endTime,
              maxSlots: schedule.maxSlots,
            };
          })
      );
    }
  }, [oldDoctor]);

  const handleInputChange = (e) => {
    setDoctor({
      ...doctor,
      [e?.target.name]: e?.target.value,
    });
  };
  const handleSlotChange = (name, value, id) => {
    setSchedule(
      schedule.map((schedule) => {
        if (schedule.id == id) {
          if (name === "startTime") {
            if (
              Number(value.slice(0, 2)) > Number(schedule.endTime.slice(0, 2))
            ) {
              toast.error("Start time cannot be greater than end time");
              return schedule;
            }
          }
          if (name === "endTime") {
            if (
              Number(schedule.startTime.slice(0, 2)) > Number(value.slice(0, 2))
            ) {
              toast.error("Start time cannot be greater than end time");
              return schedule;
            }
          }
          return {
            ...schedule,
            [name]: value,
          };
        }
        return schedule;
      })
    );
  };
  const handleRemoveSchedule = (id) => {
    setSchedule(schedule.filter((schedule) => schedule.id !== id));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateDoctor(
        { ...doctor, appointmentsSchedule: schedule },
        oldDoctor._id
      );
      setIsDrawerOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Sheet open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
      <SheetContent className="w-[600px] sm:min-w-[550px]">
        <SheetHeader className="flex items-center justify-center">
          <SheetTitle>Edit Doctor</SheetTitle>
        </SheetHeader>
        <ScrollArea className="h-[calc(100vh-80px)] pr-4 ">
          <form className="space-y-4 py-4 px-3">
            <div className="space-y-2">
              <Label htmlFor="registrationNumber">Registration Number</Label>
              <Input
                id="registrationNumber"
                placeholder="Enter registration number"
                name="registrationNumber"
                onChange={handleInputChange}
                value={doctor?.registrationNumber}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name</Label>
              <Input
                id="fullName"
                placeholder="Enter full name"
                name="fullName"
                onChange={handleInputChange}
                value={doctor?.fullName}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="doctorNotes">Doctor Notes</Label>
              <Input
                id="doctorNotes"
                placeholder="Enter Doctor Notes"
                name="doctorNotes"
                onChange={handleInputChange}
                value={doctor?.doctorNotes}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                placeholder="Enter phone number"
                type="tel"
                name="phoneNumber"
                onChange={handleInputChange}
                value={doctor?.phoneNumber}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                placeholder="Enter email"
                type="email"
                name="email"
                onChange={handleInputChange}
                value={doctor?.email}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="specialization">Specialization</Label>
              <Select
                name="specialization"
                onValueChange={(value) =>
                  handleInputChange({
                    target: {
                      name: "specialization",
                      value,
                    },
                  })
                }
                value={doctor?.specialization}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select specialization" />
                </SelectTrigger>
                <SelectContent>
                  {loadingSpecializations ? (
                    <SelectItem value="" disabled>
                      Loading...
                    </SelectItem>
                  ) : (
                    specializations?.map((specialization) => (
                      <SelectItem key={specialization} value={specialization}>
                        {specialization}
                      </SelectItem>
                    ))
                  )}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="qualification">Qualification</Label>
              <Input
                id="qualification"
                placeholder="Enter qualification"
                type="text"
                name="qualification"
                onChange={handleInputChange}
                value={doctor?.qualification}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="experience">Experience</Label>
              <Input
                id="experience"
                placeholder="Enter experience"
                type="number"
                name="experience"
                onChange={handleInputChange}
                value={doctor?.experience}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="fee">Fee</Label>
              <Input
                id="fee"
                placeholder="Enter fee"
                type="number"
                name="fee"
                onChange={handleInputChange}
                value={doctor?.fee}
              />
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between gap-2">
                <Label className="text-primary text-lg">Schedule</Label>
                <div
                  className="flex items-center justify-between hover:cursor-pointer text-primary gap-1"
                  onClick={handleAddSchedule}
                >
                  <Plus className="w-4 h-4" />
                  <span className="text-sm">Add Schedule </span>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between gap-2 pr-8">
                  <Label>Day</Label>
                  <Label> From</Label>
                  <Label> To</Label>
                  <Label>Max. Tokens</Label>
                </div>
                {schedule?.map((day) => (
                  <div
                    key={day?.id}
                    className="flex items-center justify-between gap-2"
                  >
                    <Select
                      onValueChange={(value) =>
                        handleSlotChange("day", value, day?.id)
                      }
                      value={day?.day}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="MON">Mon</SelectItem>
                        <SelectItem value="TUE">Tue</SelectItem>
                        <SelectItem value="WED">Wed</SelectItem>
                        <SelectItem value="THU">Thu</SelectItem>
                        <SelectItem value="FRI">Fri</SelectItem>
                        <SelectItem value="SAT">Sat</SelectItem>
                        <SelectItem value="SUN">Sun</SelectItem>
                      </SelectContent>
                    </Select>

                    <Input
                      type="time"
                      className="w-24"
                      value={day?.startTime}
                      name="startTime"
                      onChange={(e) =>
                        handleSlotChange("startTime", e.target.value, day?.id)
                      }
                    />
                    <span>→</span>
                    <Input
                      type="time"
                      className="w-24"
                      name="endTime"
                      onChange={(e) =>
                        handleSlotChange("endTime", e.target.value, day?.id)
                      }
                      value={day?.endTime}
                    />
                    <Input
                      type="number"
                      className="w-24"
                      name="maxSlots"
                      onChange={(e) =>
                        handleSlotChange("maxSlots", e.target.value, day?.id)
                      }
                      value={day?.maxSlots}
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-red-500"
                      onClick={() => handleRemoveSchedule(day?.id)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-4">
              <Button variant="outline" onClick={setIsDrawerOpen}>
                Cancel
              </Button>
              <Button type="submit" onClick={handleSubmit} disabled={isLoading}>
                {isLoading ? "Processing..." : "Update"}
              </Button>
            </div>
          </form>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}
