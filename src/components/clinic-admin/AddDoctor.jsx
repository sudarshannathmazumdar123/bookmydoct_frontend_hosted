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
import toast from "react-hot-toast";
import useClinicAdminPanelStore from "@/store/clinicAdminPanelStore";
import useSuperAdminStore from "@/store/superAdminStore";

export default function AddDoctor({ isAddDrawerOpen, setIsAddDrawerOpen }) {
  const { addDoctor, isLoading } = useClinicAdminPanelStore();
  const { specializations, getSpecializations } = useSuperAdminStore();
  const [loadingSpecializations, setLoadingSpecializations] = useState(true);
  const [schedule, setSchedule] = useState([
    {
      id: "1",
      day: "Mon",
      startTime: "09:00",
      endTime: "12:00",
      maxSlots: "10",
    },
  ]);
  const [doctor, setDoctor] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    specialization: "",
    qualification: "",
    experience: "",
    registrationNumber: "",
    fee: "",
    appointmentsSchedule: schedule.map((schedule) => {
      return {
        day: schedule.day,
        startTime: schedule.startTime,
        endTime: schedule.endTime,
        maxSlots: schedule.maxSlots,
      };
    }),
  });

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
    setDoctor({
      ...doctor,
      appointmentsSchedule: schedule.map((schedule) => {
        return {
          day: schedule.day.toUpperCase(),
          startTime: schedule.startTime,
          endTime: schedule.endTime,
          maxSlots: schedule.maxSlots,
        };
      }),
    });
  }, [schedule]);

  const handleInputChange = (e, name = "", value = "") => {
    setDoctor({
      ...doctor,
      [name ? name : e.target.name]: value ? value : e.target.value,
    });
  };

  const handleAddSchedule = () => {
    setSchedule([
      ...schedule,
      {
        id: (schedule.length + 1).toString(),
        day: "Mon",
        startTime: "09:00",
        endTime: "17:00",
        maxSlots: "00",
      },
    ]);
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
      await addDoctor(doctor);
      setIsAddDrawerOpen(false);
      setDoctor({
        fullName: "",
        email: "",
        phoneNumber: "",
        specialization: "",
        registrationNumber: "",
        qualification: "",
        experience: "",
        fee: "100",
        appointmentsSchedule: [],
      });
      setSchedule([
        {
          id: "1",
          day: "Mon",
          startTime: "09:00",
          endTime: "12:00",
          maxSlots: "00",
        },
      ]);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Sheet open={isAddDrawerOpen} onOpenChange={setIsAddDrawerOpen}>
      <SheetContent className="w-[600px] sm:min-w-[550px]">
        <SheetHeader className="flex items-center justify-center">
          <SheetTitle>Add Doctor</SheetTitle>
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
              <Label htmlFor="fullName">Doctor Notes</Label>
              <Input
                id="doctorNotes"
                placeholder="Enter doctor notes"
                name="doctorNotes"
                onChange={handleInputChange}
                value={doctor?.doctorNotes}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                placeholder="+912456789048"
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
                  handleInputChange(value, "specialization", value)
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
                {schedule.map((day) => (
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
                        <SelectItem value="Mon">Mon</SelectItem>
                        <SelectItem value="Tue">Tue</SelectItem>
                        <SelectItem value="Wed">Wed</SelectItem>
                        <SelectItem value="Thu">Thu</SelectItem>
                        <SelectItem value="Fri">Fri</SelectItem>
                        <SelectItem value="Sat">Sat</SelectItem>
                        <SelectItem value="Sun">Sun</SelectItem>
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
                      placeholder="Max Slots"
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
              <Button
                variant="outline"
                onClick={() => setIsAddDrawerOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit" onClick={handleSubmit} disabled={isLoading}>
                {isLoading ? "Processing..." : "Save"}
              </Button>
            </div>
          </form>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}
