import { Microscope, Pill, Stethoscope, Video } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const services = [
  {
    icon: Microscope,
    title: "Book Lab Test",
    description:
      "Get accurate diagnostics with our state-of-the-art lab facilities.",
    action: "Book Now",
    href: "/bookLabTest",
    image: "/booklabtest.jpg",
  },
  // {
  //   icon: Pill,
  //   title: "Buy Medicine",
  //   description: "Order prescribed medications from our certified online pharmacy.",
  //   action: "Coming Soon",
  //   href: "/",
  //   image: "/medicine.jpg"
  // },
  {
    icon: Stethoscope,
    title: "Book Surgery",
    description:
      "Schedule consultations with expert surgeons for your medical needs.",
    action: "Coming Soon",
    href: "/",
    image: "/surgery.jpg",
  },
  // {
  //   icon: Video,
  //   title: "Online Video Consultation",
  //   description:
  //     "Get the consultation right from your home thorugh Video Consultation",
  //   action: "Coming Soon",
  //   href: "/",
  //   image: "/hero3.jpg",
  // },
];

export default function MedicalServices() {
  return (
    <div className="w-full max-w-5xl mx-auto py-12 space-y-16">
      {services.map((service, index) => (
        <div
          key={service.title}
          className={`flex flex-col md:flex-row items-center gap-8 ${
            index % 2 === 1 ? "md:flex-row-reverse" : ""
          }`}
        >
          <div className="flex-1 text-center md:text-left space-y-4">
            <div className="inline-block p-4 rounded-full bg-blue-50 mb-4">
              <service.icon
                className="w-12 h-12 text-[#1a237e]"
                strokeWidth={1.5}
              />
            </div>
            <h3 className="text-2xl font-bold text-primary">{service.title}</h3>
            <p className="text-gray-600">{service.description}</p>
            <Button
              variant="secondary"
              className="bg-primary text-white opacity-100 hover:bg-primary hover:opacity-80"
              asChild
            >
              <a href={service.href}>{service.action}</a>
            </Button>
          </div>
          <div className="flex-1">
            <Image
              src={service.image}
              alt={service.title}
              width={500}
              height={300}
              className="rounded-lg object-cover"
            />
          </div>
        </div>
      ))}
    </div>
  );
}
