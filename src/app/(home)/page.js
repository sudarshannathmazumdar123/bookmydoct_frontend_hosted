"use client";
import { Input } from "@/components/ui/input";
import { Calendar, MapPin, Phone, RotateCcw, Search } from "lucide-react";
import { useEffect, useLayoutEffect, useState } from "react";
import Image from "next/image";
import Overlay from "@/components/ui/overlay";
import CustomButton from "@/components/ui/CustomButton";
import useAuthStore from "@/store/authStore";
import "../globals.css";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { images, populatSpecializations } from "@/lib/constants";
import Icon from "@/components/ui/icon";
import DoctorCard from "@/components/common/DoctorCard";
import ClinicCard from "@/components/common/ClinicCard";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { userStore } from "@/store/userStore";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ImagesSlider } from "@/components/ui/images-slider";
import MedicalServices from "@/components/home/MedicalServices";
import LoadingAnimation from "@/components/common/Loading";
import { getCities } from "@/services/GetClities";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [avbDoctors, setAvbDoctors] = useState([]);
  const [city, setCity] = useState("");
  const [searchOn, setSearchOn] = useState("");
  const router = useRouter();
  const { search } = userStore();
  const params = useSearchParams();
  const [searchLoading, setSearchLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [cities, setCities] = useState([]);

  useLayoutEffect(() => {
    setIsLoading(true);
    getCities()
      .then((res) => {
        setCities(res);
        setIsLoading(false);
      })
      .catch((e) => {
        console.log(e);
        setIsLoading(false);
      });
  }, []);

  useLayoutEffect(() => {
    setIsLoading(true);
    search("", "doctor", "")
      .then((data) => {
        const availableDoctors = data.data.slice(0, 3).map((doctor) => ({
          id: doctor._id,
          name: doctor?.fullName,
          specialization: doctor?.specialization,
          image: "/doctor.png",
          description: `${doctor?.fullName} has ${
            doctor?.experience ? doctor.experience : "significant"
          } years of experience as ${doctor.specialization}`,
          qualification: doctor?.medicalDegree,
        }));
        setAvbDoctors(availableDoctors);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    const specialization = params.get("specialization");
    if (specialization) {
      setSearchOn("specialization");
      setSearchQuery(specialization);
    }
  }, []);

  useEffect(() => {
    if (searchQuery || city || searchOn) {
      if (searchOn === "none") {
        setIsSearching(false);
      } else {
        setIsSearching(true);
        setSearchLoading(true);
        search(city === "all" ? "" : city, searchOn, searchQuery)
          .then((data) => {
            if (searchOn === "clinic") {
              const clinics = data.data.map((clinic) => {
                return {
                  id: clinic._id,
                  name: clinic?.name,
                  address: clinic?.address,
                  image: "/hospital.png",
                  role: "clinic",
                };
              });
              setSearchResults(clinics);
              setSearchLoading(false);
            } else {
              const doctors = data.data.map((doctor) => {
                return {
                  id: doctor._id,
                  name: doctor?.fullName,
                  specialization: doctor?.specialization,
                  image: "/doctor.png",
                  description: `${doctor?.fullName} has ${
                    doctor?.experience ? doctor.experience : "significant"
                  } years of experience as ${doctor.specialization}`,
                  qualification: doctor?.medicalDegree,
                  role: "doctor",
                  experience: doctor?.experience,
                };
              });
              setSearchResults(doctors);
              setSearchLoading(false);
            }
          })
          .catch((err) => {
            console.log(err);
            setIsSearching(false);
            setSearchLoading(false);
          });
      }
    } else {
      setSearchResults([]);
      setIsSearching(false);
    }
  }, [searchQuery, city, searchOn]);

  return isLoading ? (
    <LoadingAnimation />
  ) : (
    <div className="flex flex-col min-h-screen ">
      <main className="flex-grow">
        {/* Hero Section */}
        <section className=" relative w-full ">
          <ImagesSlider className="h-[35rem] md:h-[40rem] " images={images}>
            <motion.div
              initial={{
                opacity: 0,
                y: -80,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.6,
              }}
              className="flex flex-col justify-center items-center"
            >
              <div className="container relative z-50 mx-auto w-full px-4 md:px-6 ">
                <div className="flex flex-col items-center  space-y-4 text-center text-white">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                    {searchQuery
                      ? `Finding ${searchQuery}`
                      : "Find and Book the Best Doctors Near You"}
                  </h1>
                  {!searchQuery && (
                    <p className="mx-auto max-w-[700px] text-gray-200 md:text-xl">
                      Get the care you need, when you need it.
                    </p>
                  )}
                  <div className="w-full max-w-2xl  z-10">
                    <div className="mx-auto flex flex-col gap-y-4 sm:gap-y-0 sm:flex-row gap-2 ">
                      <div className="flex gap-2 w-full ">
                        <Select onValueChange={(value) => setCity(value)}>
                          <SelectTrigger className="p-2 w-[50%] bg-white text-black rounded-2xl ">
                            <MapPin />
                            <SelectValue
                              className="w-fit text-black"
                              placeholder="Location"
                            />
                          </SelectTrigger>
                          <SelectContent className="bg-white text-black">
                            <SelectGroup className="w-full">
                              <SelectItem value="all">All</SelectItem>
                              {cities?.map((city, idx) => (
                                <SelectItem key={idx} value={city}>
                                  {city}
                                </SelectItem>
                              ))}
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                        <Select
                          onValueChange={(value) => setSearchOn(value)}
                          value={searchOn}
                        >
                          <SelectTrigger className="p-2 w-[50%] bg-white text-black rounded-2xl ">
                            <Search />
                            <SelectValue
                              className="w-fit text-black"
                              placeholder="Search"
                            />
                          </SelectTrigger>
                          <SelectContent className="bg-white text-black ">
                            <SelectGroup className="w-full">
                              <SelectItem value="none">None</SelectItem>
                              <SelectItem value="doctor">Doctors</SelectItem>
                              <SelectItem value="clinic">Clinics</SelectItem>
                              <SelectItem value="specialization">
                                Specialization
                              </SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </div>
                      <Input
                        id="search"
                        type="search"
                        placeholder="Doctor or Speciality or Clinic/Hospital name"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="rounded-2xl p-2 pl-3 text-black"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </ImagesSlider>
        </section>
        {isSearching ? (
          searchLoading ? (
            <div className="flex justify-center items-center h-screen">
              <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-solid"></div>
            </div>
          ) : (
            <div className="max-w-7xl mx-auto px-4 py-12">
              {searchResults.length === 0 && (
                <p className="text-center text-sm md:text-xl">
                  No Doctor or Clinic/Hospital found
                </p>
              )}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {searchResults.map((rs) => (
                  <div key={rs.id}>
                    {rs.role === "doctor" && <DoctorCard doctor={rs} />}
                    {rs.role === "clinic" && <ClinicCard clinic={rs} />}
                  </div>
                ))}
              </div>
            </div>
          )
        ) : (
          <>
            <section className="mx-auto px-5 md:px-16  w-full">
              <div className="grid grid-cols-1 z-50  relative -mt-6 md:grid-cols-3 place-items-start gap-4 bg-primary p-6 rounded-xl ">
                <Button
                  variant="ghost"
                  className="flex items-center gap-3 text-white hover:bg-white/10 h-auto py-4"
                  onClick={() => {
                    router.push("/");
                  }}
                >
                  <Search className="h-5 w-5" />
                  <div className="text-left">
                    <div className="font-semibold text-lg md:text-lg">
                      Search Doctor
                    </div>
                    <div className="text-sm md:text-base text-gray-300">
                      Find the best doctor for your check-up
                    </div>
                  </div>
                </Button>

                <Button
                  variant="ghost"
                  className="flex items-center gap-3 text-white hover:bg-white/10 h-auto py-4"
                  onClick={() => {
                    router.push("/specializations");
                  }}
                >
                  <Calendar className="h-5 w-5" />
                  <div className="text-left">
                    <div className="font-semibold text-lg md:text-lg">
                      Appointment
                    </div>
                    <div className="text-sm  md:text-base text-gray-300">
                      Schedule visit to healthcare professional
                    </div>
                  </div>
                </Button>

                <Button
                  variant="ghost"
                  className="flex items-center gap-3 text-white hover:bg-white/10 h-auto py-4"
                  onClick={() => {
                    router.push("/doctors");
                  }}
                >
                  <RotateCcw className="h-5 w-5" />
                  <div className="text-left">
                    <div className="font-semibold text-lg">Get Solution</div>
                    <div className="text-sm  md:text-base text-gray-300">
                      Get professional medical solutions
                    </div>
                  </div>
                </Button>
              </div>
            </section>
            <section className="w-full py-12 md:py-8 lg:py-15 ">
              <div className="container mx-auto px-4 md:px-6">
                <div className="text-center mb-10">
                  <h2 className="text-3xl font-bold mb-4 text-primary">
                    Our Medical Specialties
                  </h2>
                  <p className="text-gray-600">
                    Find the right specialist for your health needs
                  </p>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  {populatSpecializations?.map((specialization) => {
                    return (
                      <div
                        key={specialization.name}
                        className="flex items-center hover:cursor-pointer border border-black-50 rounded-md p-2 md:p-4 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
                        onClick={() => {
                          if (specialization.name === "View All") {
                            router.push("/specializations");
                          } else {
                            setSearchQuery(specialization.name);
                            setSearchOn("specialization");
                          }
                        }}
                      >
                        <div className="p-4 bg-primary rounded-full">
                          <Icon
                            name={specialization.icon}
                            className="w-4 h-4 md:h-6 md:w-6 text-primary-foreground"
                          />
                        </div>
                        <div className="flex flex-col ml-2 space-y-1">
                          <p className="font-bold text-sm md:text-lg">
                            {specialization.name}
                          </p>
                          <p className="text-xs md:text-sm text-gray-600">
                            {specialization.description}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </section>
            <section className="w-full py-12 md:py-8 lg:py-15 ">
              <MedicalServices />
            </section>

            <section className="w-full py-12 mx-auto">
              <div className="container mx-auto">
                <h2 className="text-3xl font-bold text-center mb-10 text-primary">
                  Available Doctors
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
                  {avbDoctors?.length !== 0 &&
                    avbDoctors?.map((doctor) => (
                      <div key={doctor.id}>
                        <DoctorCard doctor={doctor} />
                      </div>
                    ))}
                </div>
                {avbDoctors?.length === 0 && (
                  <div className="flex flex-col items-center justify-center">
                    <p className="text-lg font-semibold">
                      No doctors available
                    </p>
                  </div>
                )}
                {avbDoctors?.length !== 0 && (
                  <div className="flex justify-center">
                    <CustomButton
                      className="mt-8 max-w-[180px] bg-white border-primary border"
                      handleClick={() => {
                        router.push("/doctors");
                      }}
                    >
                      <span className="text-primary text-sm lg:text-[16px] font-medium">
                        View All Doctors
                      </span>
                    </CustomButton>
                  </div>
                )}
              </div>
            </section>
            <section className="py-12  bg-primary rounded-lg lg:mx-16 ">
              <h2 className="text-2xl font-bold text-white text-center mb-8">
                How It Works
              </h2>

              <div className="flex flex-col md:flex-row justify-center gap-8 max-w-4xl mx-auto">
                {[
                  {
                    icon: Search,
                    title: "Find a Doctor",
                    description:
                      "Search for doctors by specialty, location, or name",
                  },
                  {
                    icon: Calendar,
                    title: "Book Appointment",
                    description:
                      "Choose a convenient time slot and book instantly",
                  },
                  {
                    icon: Phone,
                    title: "Get Care",
                    title: "Visit the doctor and get the care you need",
                  },
                ].map((step, index) => (
                  <div
                    key={index}
                    className="flex flex-col items-center text-center"
                  >
                    <div className="bg-blue-100 p-4 rounded-full mb-4">
                      <step.icon className="w-8 h-8 text-blue-600" />
                    </div>
                    <h3 className="font-semibold mb-2 text-white">
                      {step.title}
                    </h3>
                    <p className="text-sm text-white">{step.description}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="py-12 bg-white">
              <div className="container mx-auto px-4 md:px-6 text-center">
                <h2 className="text-3xl font-bold text-primary mb-8">
                  Trusted by Our Growing Community
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="flex flex-col items-center">
                    <h3 className="text-4xl font-extrabold text-blue-600">
                      200+
                    </h3>
                    <p className="text-lg font-medium text-gray-700 mt-2">
                      Doctors
                    </p>
                    <p className="text-sm text-gray-500">
                      Available for appointments and consultations
                    </p>
                  </div>
                  <div className="flex flex-col items-center">
                    <h3 className="text-4xl font-extrabold text-blue-600">
                      15+
                    </h3>
                    <p className="text-lg font-medium text-gray-700 mt-2">
                      Hospitals
                    </p>
                    <p className="text-sm text-gray-500">
                      Partnered for your healthcare needs
                    </p>
                  </div>
                  <div className="flex flex-col items-center">
                    <h3 className="text-4xl font-extrabold text-blue-600">
                      1000+
                    </h3>
                    <p className="text-lg font-medium text-gray-700 mt-2">
                      Patients
                    </p>
                    <p className="text-sm text-gray-500">
                      Already booked their appointments
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <section className="mt-8 px-4 text-primary w-full flex flex-col md:flex-row justify-between items-center">
              <div className="flex flex-col items-start lg:pl-60 md:w-[70%] max-md:mb-14">
                <h2 className="text-3xl font-bold mb-4">
                  Ready to Find Your Doctor?
                </h2>
                <p className="mb-8 text-black">
                  Book your appointment now and start your journey to better
                  health.
                </p>
                <Link href="/">
                  <CustomButton className="mx-auto">Find a Doctor</CustomButton>
                </Link>
              </div>

              <div className="md:w-[30%] relative">
                <div className="relative inline-block">
                  {/* Soft blue gradient glow */}
                  <div className="absolute -inset-12 rounded-full bg-gradient-to-r from-blue-100 via-blue-200 to-blue-100 opacity-60 blur-2xl"></div>

                  {/* Secondary glow for depth */}
                  <div className="absolute -inset-8 rounded-full bg-gradient-to-r from-blue-200 via-blue-300 to-blue-200 opacity-40 blur-xl"></div>

                  {/* Image container */}
                  <div className="relative">
                    <Image
                      src={"/doct.png"}
                      height={300}
                      width={300}
                      alt="doctor"
                    />
                  </div>
                </div>
              </div>
            </section>
            <section className="w-full bg-muted pt-4">
              <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 ">
                <div className="relative flex items-center justify-center ">
                  {/* Phone mockups */}
                  <div className="relative mb-10 md:mb-0 w-[180px] md:w-[220px] aspect-[0.5/1]">
                    <div className="absolute left-[-40px] top-0 z-10">
                      <Image
                        src="/mobileScreen1.png"
                        width={200}
                        height={400}
                        alt="Bookmydoct App Screenshot 1"
                      />
                    </div>
                    <div className="absolute right-[-30px] top-[40px]">
                      <Image
                        src="/mobileScreen2.png"
                        width={200}
                        height={400}
                        alt="bookmydoct App Screenshot 2"
                      />
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-center lg:items-start gap-4 justify-center p-5 lg:p-0">
                  <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-primary">
                    BookMyDoct App Coming Soon!
                  </h1>
                  <ul className="space-y-2 flex flex-col items-center lg:items-start text-gray-600">
                    <li>✅ Online Doctor appointments Booking </li>
                    <li>✅ Online lab test Booking</li>
                  </ul>
                  <Link href="/contact">
                    <CustomButton className="max-w-[120px]">
                      Contact Us
                    </CustomButton>
                  </Link>
                </div>
              </div>
            </section>
          </>
        )}
      </main>
    </div>
  );
}
