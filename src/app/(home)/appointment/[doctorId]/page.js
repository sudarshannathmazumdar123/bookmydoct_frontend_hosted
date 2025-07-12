"use client";

import { use, useEffect, useLayoutEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import Overlay from "@/components/ui/overlay";
import { Card, CardContent } from "@/components/ui/card";
import useAuthStore from "@/store/authStore";
import toast from "react-hot-toast";
import api from "@/lib/axios";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { displayRazorpay } from "@/lib/razorpaymodel";
import { generateTimeSlots } from "@/lib/utils";
import { usePathname, useRouter } from "next/navigation";
import Cookies from "js-cookie";
import Link from "next/link";
import { userStore } from "@/store/userStore";
import LoadingAnimation from "@/components/common/Loading";
import { Check } from "lucide-react";

export default function AppointmentBookingForm() {
  const { getDoctorById, getSlotDetails, bookAppointment, loading } =
    userStore();
  const { user } = useAuthStore();
  const [formData, setFormData] = useState({
    clinicId: "",
    fullName: "",
    phoneNumber: "",
    age: "",
    gender: "male",
    healthInsured: false,
    billingAddress: "",
    termsAccepted: false,
    appointmentDate: "",
  });
  const path = usePathname();

  const [doctorPrice, setdoctorPrice] = useState(0);
  const [selectedClinic, setSelectedClinic] = useState(null);
  const [doctor, setDoctor] = useState(null);
  const [clinics, setClinics] = useState([]);
  const [availableSlots, setAvailableSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [platformFees, setPlatformFees] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [inactiveNext, setInactiveNext] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleNext = () => setCurrentStep((prev) => prev + 1);
  const handleBack = () => setCurrentStep((prev) => prev - 1);

  const fetchDoctor = async (docId) => {
    const res = await getDoctorById(docId);
    setDoctor(res.doctor);
    setPlatformFees(res.platformFee);
  };

  useLayoutEffect(() => {
    if (user?.role === "clinic") {
      toast.error(`Clinic can't book doctor appointment`);
      router.replace("/");
    } else {
      const docId = path.split("/").pop();
      fetchDoctor(docId);
    }
  }, []);

  const router = useRouter();

  const getClinics = async () => {
    try {
      setIsLoading(true);
      const promiseArray = doctor?.clinics.map((clinicId) => {
        return api.get(`/user/clinic/${clinicId}`);
      });
      const clinics = await Promise.all(promiseArray);
      setClinics(clinics.map((c) => c.data.clinicDetails));
      setIsLoading(false);
    } catch (e) {
      console.log(e);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (doctor) {
      getClinics();
    }
  }, [doctor]);

  useEffect(() => {
    if (doctor && selectedClinic && selectedSlot && formData?.appointmentDate) {
      getSlotDetails(
        doctor?._id,
        selectedClinic?._id,
        selectedSlot,
        format(new Date(formData.appointmentDate), "dd-MM-yyyy")
      ).then((res) => {
        if (res.bookedSlot === res.maxSlots || res.bookedSlot > res.maxSlots) {
          toast.error(
            `All slots are booked for this day. Please select another day.`
          );
          setAvailableSlots([]);
          setSelectedSlot(null);
        }
      });
    }
  }, [selectedSlot]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name, value) => {
    if (name === "appointmentDate" && value) {
      setFormData((prev) => ({ ...prev, [name]: value }));
      const dayOfWeek = value.toString().split(" ")[0].toUpperCase();
      setAvailableSlots([]);
      setSelectedSlot(null);
      doctor.appointmentsSchedule
        .find((a) => a.clinicId === selectedClinic._id)
        .schedule.map((s) => {
          if (s.day === dayOfWeek) {
            setAvailableSlots((slot) => [...slot, s]);
          }
        });
      return;
    }
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === "clinicId") {
      const clinic = clinics.find((c) => c._id === value);
      setSelectedClinic(clinic || null);
      setdoctorPrice(
        doctor?.fees.find((f) => f.clinicId === clinic._id)?.fee || 0
      );
    }
  };

  const handleCheckboxChange = (name, checked) => {
    setFormData((prev) => ({ ...prev, [name]: checked }));
  };

  const validateForm = () => {
    if (!formData.fullName) return false;
    if (!formData.phoneNumber) return false;
    if (!formData.age) return false;
    if (!formData.billingAddress) return false;
    if (!formData.termsAccepted) return false;
    return true;
  };

  const handleSubmit = async (e) => {
    if (!user) {
      router.replace("/signin/patient");
      toast.error("Please login to book an appointment");
    }
    e.preventDefault();
    if (validateForm()) {
      setIsSubmitting(true);
      try {
        const appointment = {
          ...formData,
          doctorId: doctor._id,
          appointmentDate: format(
            new Date(formData.appointmentDate),
            "dd-MM-yyyy"
          ),
          scheduledId: selectedSlot,
        };
        const res = await bookAppointment(appointment);
        const options = {
          key: `${res.key_id}`, // Enter the Key ID generated from the Dashboard
          currency: "INR",
          name: "BookMyDoct",
          description: "Book Appointment",
          order_id: `${res.order_id}`, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
          callback_url: `${process.env.NEXT_PUBLIC_API_URL}user/payment-success/appointment/redirect`,
          theme: {
            color: "#3399cc",
          },
        };
        displayRazorpay(options);
        setIsSubmitting(false);
      } catch (err) {
        console.log(err);
        setIsSubmitting(false);
      }
    } else {
      toast.error("Please fill all the fields");
    }
  };

  //function that returns true on the available day of doctor
  const isAvailable = (date) => {
    const day = new Date(date).getDay();
    const days = {
      0: "SUN",
      1: "MON",
      2: "TUE",
      3: "WED",
      4: "THU",
      5: "FRI",
      6: "SAT",
    };
    return (
      doctor.appointmentsSchedule
        .find((schedule) => schedule.clinicId === selectedClinic._id)
        .schedule.map((schedule) => schedule.day)
        .includes(days[day]) && new Date() < date
    );
  };

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="md:pl-[132px] relative w-full py-12 md:py-24 lg:py-32 bg-[url('/contactHero.png')] bg-cover bg-center">
        <Overlay />
        <div className="container z-10 relative px-4 md:px-6 ">
          <div className="flex flex-col space-y-4  text-white">
            <h1 className="text-3xl font-bold  sm:text-4xl md:text-5xl lg:text-6xl/none ">
              Book Appointment
            </h1>
            <p className=" max-w-[700px] text-gray-200 md:text-xl">
              Please fill up the details to book an appointment with{" "}
              {doctor?.fullName}.
            </p>
          </div>
        </div>
      </section>
      <div className="my-8">
        <div className="flex justify-center relative">
          {[1, 2, 3, 4].map((step) => (
            <div key={step} className="flex flex-col items-start">
              <div className="flex justify-center items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center border-2 
                ${
                  currentStep >= step
                    ? "bg-blue-500 border-blue-500 text-white"
                    : "border-gray-300"
                }`}
                >
                  {currentStep > step ? <Check size={16} /> : step}
                </div>
                {step !== 4 && (
                  <div className="h-0.5 bg-gray-300 w-16 md:w-24" />
                )}
              </div>
              <div className="text-xs md:text-sm mt-2 text-center">
                {step === 1
                  ? "Select Clinic"
                  : step === 2
                  ? "Select Time Slot"
                  : step === 3
                  ? "Fill Details"
                  : "Summary"}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Appointment Form */}
      {isLoading ? (
        <LoadingAnimation />
      ) : (
        <div className="max-w-3xl mx-auto px-4 py-8">
          <div className="space-y-6">
            {currentStep === 1 && (
              <div>
                <label
                  htmlFor="clinicId"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Select Clinic
                </label>
                <Select
                  onValueChange={(value) => {
                    handleSelectChange("clinicId", value);
                    setInactiveNext(false);
                  }}
                >
                  <SelectTrigger id="clinicId" className="h-12 bg-gray-50">
                    {selectedClinic?.name || "Select Clinic/Hospital"}
                  </SelectTrigger>
                  <SelectContent>
                    {clinics ? (
                      clinics?.map((clinic) => (
                        <SelectItem key={clinic._id} value={clinic._id}>
                          <div className="flex flex-col">
                            <span className="font-medium">{clinic.name}</span>
                            <span className="text-sm text-gray-500">
                              {clinic.address}
                            </span>
                          </div>
                        </SelectItem>
                      ))
                    ) : (
                      <p className="text-center p-2">Loading...</p>
                    )}
                  </SelectContent>
                </Select>
              </div>
            )}

            {selectedClinic && currentStep === 1 && (
              <Card>
                <CardContent className="pt-6">
                  <h3 className="font-semibold mb-2">
                    Selected Clinic/Hospital
                  </h3>
                  <p>{selectedClinic.name}</p>
                  <p className="text-sm text-gray-600">
                    {selectedClinic.address}
                  </p>
                </CardContent>
              </Card>
            )}
            {selectedClinic && currentStep === 2 && (
              <div>
                <div className="flex flex-col md:flex-row md:gap-5 space-y-1">
                  <Calendar
                    mode="single"
                    selected={formData.appointmentDate}
                    onSelect={(date) =>
                      handleSelectChange("appointmentDate", date)
                    }
                    className="rounded-md border"
                    disabled={(date) => !isAvailable(date)}
                  />
                </div>
              </div>
            )}
            {selectedClinic && currentStep === 2 && (
              <div>
                {formData.appointmentDate && availableSlots.length > 0 && (
                  <div>
                    <label htmlFor="time-slot">Select a Time Slot</label>
                    <Select onValueChange={(value) => setSelectedSlot(value)}>
                      <SelectTrigger id="time-slot" className="bg-muted">
                        <SelectValue placeholder="Choose a time slot" />
                      </SelectTrigger>
                      <SelectContent>
                        {availableSlots.map((s) => (
                          <SelectItem key={s._id} value={s._id}>
                            {s.startTime} - {s.endTime}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}
              </div>
            )}

            {currentStep === 3 && (
              <>
                <div>
                  <label
                    htmlFor="fullName"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Full Name
                  </label>
                  <Input
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    placeholder="Enter your full name"
                    className="bg-muted rounded-xl border-0"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="phoneNumber"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Phone Number
                    </label>
                    <Input
                      id="phoneNumber"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleInputChange}
                      placeholder="+1234567890"
                      className="bg-muted rounded-xl border-0"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="age"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Age
                    </label>
                    <Input
                      id="age"
                      name="age"
                      type="number"
                      value={formData.age}
                      onChange={handleInputChange}
                      className="bg-muted rounded-xl border-0"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="gender"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Gender
                  </label>
                  <Select
                    onValueChange={(value) =>
                      handleSelectChange("gender", value)
                    }
                    defaultValue={formData.gender}
                  >
                    <SelectTrigger
                      id="gender"
                      className="bg-muted rounded-xl border-0"
                    >
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label
                    htmlFor="billingAddress"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Billing Address
                  </label>
                  <Input
                    id="billingAddress"
                    name="billingAddress"
                    value={formData.billingAddress}
                    onChange={handleInputChange}
                    className="bg-muted rounded-xl border-0"
                  />
                </div>
              </>
            )}
            {currentStep > 3 && (
              <>
                <div className="space-y-4 mb-6">
                  <h2 className="text-xl font-semibold">Booking Summary</h2>
                  <div className="space-y-2 bg-muted p-4 rounded-xl">
                    <p>
                      <strong>Selected Clinic:</strong> {selectedClinic?.name}
                    </p>
                    <p>
                      <strong>Doctor Name:</strong> {doctor?.fullName}
                    </p>
                    <p>
                      <strong>Appointment Date:</strong>{" "}
                      {formData.appointmentDate
                        ? format(
                            new Date(formData.appointmentDate),
                            "dd MMMM yyyy"
                          )
                        : ""}
                    </p>
                    <div className="border-t border-gray-200 my-2 pt-2">
                      <p>
                        <strong>Patient Details:</strong>
                      </p>
                      <p>Name: {formData.fullName}</p>
                      <p>Phone: {formData.phoneNumber}</p>
                      <p>Age: {formData.age}</p>
                      <p>Gender: {formData.gender}</p>
                      <p>Address: {formData.billingAddress}</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Checkbox
                    id="healthInsured"
                    checked={formData.healthInsured}
                    onCheckedChange={(checked) =>
                      handleCheckboxChange("healthInsured", checked)
                    }
                  />
                  <div>
                    <label
                      htmlFor="healthInsured"
                      className="text-sm font-medium text-gray-700"
                    >
                      Health Insured
                    </label>
                    <p className="text-sm text-gray-500">
                      Check this if you have health insurance.
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Checkbox
                    id="termsAccepted"
                    checked={formData.termsAccepted}
                    onCheckedChange={(checked) =>
                      handleCheckboxChange("termsAccepted", checked)
                    }
                  />
                  <div>
                    <label
                      htmlFor="termsAccepted"
                      className="text-sm font-medium text-gray-700"
                    >
                      Accept Terms
                    </label>
                    <p className="text-sm text-gray-500">
                      I agree to the{" "}
                      <Link
                        href="/termsAndConditions"
                        className="text-blue-500 hover:underline"
                      >
                        Terms And Conditions
                      </Link>{" "}
                      and{" "}
                      <Link
                        href="/refundPolicy"
                        className="text-blue-500 hover:underline"
                      >
                        Refund Policy
                      </Link>{" "}
                      of the appointment booking.
                    </p>
                  </div>
                </div>

                <div className="text-left">
                  <p className="text-sm">
                    Doctor Fees:{" "}
                    {doctorPrice
                      ? `${doctorPrice} INR`
                      : "Select clinic to see"}{" "}
                  </p>
                  <p className="text-sm">
                    Doctor fees has to be paid at Clinic/Hospital later
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-semibold">
                    Platform Fees: {platformFees ? platformFees : "0"} INR
                  </p>
                </div>
              </>
            )}
            <div className="flex justify-between mt-6">
              {currentStep > 1 && (
                <Button onClick={handleBack} variant="outline">
                  Previous
                </Button>
              )}
              {currentStep < 4 ? (
                <Button
                  onClick={handleNext}
                  className="ml-auto"
                  disabled={inactiveNext}
                >
                  Next
                </Button>
              ) : (
                <Button
                  onClick={handleSubmit}
                  disabled={
                    !formData.termsAccepted || isLoading || isSubmitting
                  }
                  className="ml-auto"
                >
                  {isSubmitting ? "Processing..." : "Proceed to Payment"}
                </Button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
