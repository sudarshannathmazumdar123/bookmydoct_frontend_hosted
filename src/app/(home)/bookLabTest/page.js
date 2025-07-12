'use client'

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import CustomButton from "@/components/ui/CustomButton"
import { userStore } from "@/store/userStore"
import { format } from "date-fns"
import { Checkbox } from "@/components/ui/checkbox"
import Link from "next/link"
import useAuthStore from "@/store/authStore"
import { displayRazorpay } from "@/lib/razorpaymodel"

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Check, ChevronsUpDown, Hospital, X } from "lucide-react";
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"
import { Value } from "@radix-ui/react-select"

export default function Component() {
  const router = useRouter();
  const [isloading, setIsloading] = useState(false);

  const [labTestAppointment, setLabTestAppointment] = useState({
    fullName: "",
    phoneNumber: "",
    age: "",
    gender: "male",
    address: "",
    termsAccepted: false,
  });
  const [clinics, setClinics] = useState([]);
  const [labTests, setLabTests] = useState([]);
  const [selectedClinic, setSelectedClinic] = useState(null);
  const [open, setOpen] = useState(false);
  const [selectedTests, setSelectedTests] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [currentStep, setCurrentStep] = useState(1);
  const [inactiveNext, setInactiveNext] = useState(false);


  const { getLabClinics, getLabtestsByClinic, bookLabAppointment } = userStore();
  const { user } = useAuthStore();


  const handleNext = () => setCurrentStep(prev => prev + 1);
  const handleBack = () => setCurrentStep(prev => prev - 1);



  const toggleTest = (test) => {
    setSelectedTests(prev => {
      const exist = prev.find((t) => t._id == test._id);
      if (exist) {
        setTotalPrice(totalPrice - test.price);
        return prev.filter((t) => t._id != test._id);
      } else {
        setTotalPrice(totalPrice + test.price);
        return [...prev, test];

      }
    }
    );
  };

  const handleInputChange = (e) => {
    setLabTestAppointment({
      ...labTestAppointment,
      [e.target.name]: e.target.value,
    })
  }

  useEffect(() => {
    getLabClinics().then((res) => {
      setClinics(res)
    })
  }, [])

  const handleClinicChange = async (id) => {
    setSelectedClinic(id);
    const res = await getLabtestsByClinic(id);
    setLabTests(res)
    setSelectedTests([]);
    setTotalPrice(0);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const selectedLabTestsIds = selectedTests.map((test) => test._id);
    const appointment = { ...labTestAppointment, labTestIds: selectedLabTestsIds, clinicId: selectedClinic, appointmentDate: format(new Date(), 'dd-MM-yyyy') };

    if (!user) {
      router.replace('/signin/patient')
      toast.error('Please login to book an appointment')
    }
    setIsloading(true);
    try {
      const res = await bookLabAppointment(appointment);
      const options = {
        "key": `${res.key_id}`, // Enter the Key ID generated from the Dashboard
        "currency": "INR",
        "name": "BookMyDoct",
        "description": "Book Lab Test",
        "order_id": `${res.order_id}`, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
        "callback_url": `${process.env.NEXT_PUBLIC_API_URL}/user/payment-success/labtest/redirect`,
        "theme": {
          "color": "#3399cc"
        }
      };
      displayRazorpay(options);
      setIsloading(false);
    } catch (err) {
      console.log(err)
      setIsloading(false);
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-6 min-h-screen justify-center items-center">
      <h1 className="text-center text-3xl mb-4 font-bold">Book Lab Test</h1>
      <div className="mb-8">
        <div className="flex justify-center relative">
          {[1, 2, 3, 4].map((step) => (
            <div key={step} className="flex flex-col items-start">
              <div className="flex justify-center items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 
                ${currentStep >= step ? 'bg-blue-500 border-blue-500 text-white' : 'border-gray-300'}`}>
                  {currentStep > step ? <Check size={16} /> : step}
                </div>
                {
                  step !== 4 && <div className="h-0.5 bg-gray-300 w-16 md:w-24" />
                }
              </div>
              <div className="text-xs md:text-sm mt-2 text-center">
                {step === 1 ? 'Select Lab' :
                  step === 2 ? 'Choose Tests' :
                    step === 3 ? 'Fill Details' : 'Summary'}
              </div>

            </div>
          ))}
          {/* <div className="absolute top-4 left-0 right-0  -z-10" /> */}
        </div>
      </div>

      <Card>
        <CardContent className="p-6">
          {/* Step 1: Select Lab */}
          {currentStep === 1 && (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold mb-4">Select Diagnostic Lab</h2>
              <Select onValueChange={(value) => handleClinicChange(value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a lab" />
                </SelectTrigger>
                <SelectContent>
                  {clinics?.map((clinic) => (
                    <SelectItem key={clinic._id} value={clinic._id}>
                      {clinic.name}
                    </SelectItem>
                  ))}
                  {clinics?.length === 0 && <p>No clinics found...</p>}
                </SelectContent>
              </Select>
            </div>
          )}

          {/* Step 2: Select Tests */}
          {currentStep === 2 && (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold mb-4">Select Lab Tests</h2>
              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-between">
                    {selectedTests?.length !== 0
                      ? selectedTests.reduce((acc, test) => acc + test.name + ", ", "")
                      : "Select lab tests..."}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0">
                  <Command>
                    <CommandGroup className="max-h-64 overflow-auto">
                      {labTests?.map((test) => (
                        <CommandList
                          key={test._id}
                          onClick={() => toggleTest(test)}
                          className="flex items-center justify-between p-2"
                        >
                          <div className="flex items-center">
                            <Check className={`mr-2 h-4 w-4 ${selectedTests?.includes(test) ? "opacity-100" : "opacity-0"
                              }`} />
                            {test.name}
                            <span className="pl-3">(Rs. {test.price})</span>
                          </div>
                        </CommandList>
                      ))}
                    </CommandGroup>
                  </Command>
                </PopoverContent>
              </Popover>
              <div className="text-lg font-semibold">
                Total Price: ₹{totalPrice}
              </div>
            </div>
          )}

          {/* Step 3: Fill Details */}
          {currentStep === 3 && (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold mb-4">Personal Details</h2>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input
                    id="fullName"
                    value={labTestAppointment.fullName}
                    name="fullName"
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    name="phoneNumber"
                    value={labTestAppointment.phoneNumber}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <Label htmlFor="age">Age</Label>
                  <Input
                    id="age"
                    type="number"
                    name="age"
                    value={labTestAppointment.age}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <Label htmlFor="gender">Gender</Label>
                  <Select
                    onValueChange={(Value) => {
                      handleInputChange({
                        target: {
                          name: "gender",
                          value: Value
                        }
                      })
                    }}
                    defaultValue={labTestAppointment.gender}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="address">Address</Label>
                  <Input
                    name="address"
                    id="address"
                    value={labTestAppointment.address}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Summary */}
          {currentStep === 4 && (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold mb-4">Booking Summary</h2>
              <div className="space-y-2">
                <p><strong>Selected Lab:</strong> {clinics?.find(c => c._id === selectedClinic)?.name}</p>
                <p><strong>Selected Tests:</strong></p>
                <ul className="list-disc pl-5">
                  {selectedTests.map(test => (
                    <li key={test._id}>{test.name} - ₹{test.price}</li>
                  ))}
                </ul>
                <p><strong>Total Price:</strong> ₹{totalPrice}</p>
                <div className="border-t pt-2 mt-4">
                  <p><strong>Name:</strong> {labTestAppointment.fullName}</p>
                  <p><strong>Phone:</strong> {labTestAppointment.phoneNumber}</p>
                  <p><strong>Age:</strong> {labTestAppointment.age}</p>
                  <p><strong>Gender:</strong> {labTestAppointment.gender}</p>
                  <p><strong>Address:</strong> {labTestAppointment.address}</p>
                </div>
                <div className="flex items-center space-x-2 mt-4">
                  <Checkbox
                    id="terms"

                    checked={labTestAppointment.termsAccepted}

                    onCheckedChange={(checked) =>
                      handleInputChange({
                        target: {
                          name: "termsAccepted",
                          value: checked
                        }
                      })}
                  />
                  <label htmlFor="terms" className="text-sm">
                    I agree to the <Link href="/terms" className="text-blue-500">Terms and Conditions</Link> and
                    <Link href="/refund" className="text-blue-500"> Refund Policy</Link>
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-6">
            {currentStep > 1 && (
              <Button onClick={handleBack} variant="outline">
                Previous
              </Button>
            )}
            {currentStep < 4 ? (
              <Button onClick={handleNext} className="ml-auto">
                Next
              </Button>
            ) : (
              <Button
                onClick={handleSubmit}
                disabled={!labTestAppointment.termsAccepted || isloading}
                className="ml-auto"
              >
                {isloading ? "Processing..." : "Proceed to Payment"}
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

    </div>
  )
}