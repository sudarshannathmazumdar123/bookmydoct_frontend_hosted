import Image from "next/image";
import CustomButton from "../ui/CustomButton";
import { useRouter } from "next/navigation";
import { MapPin, Star, GraduationCap, Stethoscope } from "lucide-react";

export default function DoctorCard({ doctor }) {
  const router = useRouter();

  console.log("src :: components :: common :: doctorcard :: doctor: ", doctor);

  return (
    <div
      key={doctor.id}
      className="group relative bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
    >
      <div className="flex flex-col md:flex-row">
        {/* Image Section */}
        <div className="relative w-full md:w-1/3 h-[250px] md:h-auto">
          <Image
            src="/doctor.png"
            height={1000}
            width={1000}
            alt={doctor?.name}
            className="object-cover group-hover:scale-105 w-full h-full transition-transform duration-300"
          />
        </div>

        {/* Content Section */}
        <div className="flex-1 p-6">
          <div className="space-y-4">
            {/* Name and Rating */}
            <div className="flex justify-between items-start">
              <h3
                className="text-2xl font-bold text-gray-900 truncate hover:cursor-pointer"
                title={doctor?.name}
              >
                {doctor?.name.length > 20
                  ? `${doctor?.name.slice(0, 18)}...`
                  : doctor?.name}
              </h3>
              {/* <div className="flex items-center gap-1">
                                <Star className="w-5 h-5 fill-yellow-400 stroke-yellow-400" />
                                <span className="text-sm font-medium">4.8</span>
                            </div> */}
            </div>

            {/* Qualification and Specialization */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-gray-600">
                <GraduationCap className="w-5 h-5" />
                <span>{doctor?.qualification}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Stethoscope className="w-5 h-5" />
                <span>{doctor?.specialization}</span>
              </div>
              {/* <div className="flex items-center gap-2 text-gray-600">
                                <MapPin className="w-5 h-5" />
                                <span>Mumbai, Maharashtra</span>
                            </div> */}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4 py-4 border-y">
              <div className="text-center flex items-center gap-3">
                <p className="text-lg font-bold text-primary">
                  {doctor?.experience}
                </p>
                <p className="text-sm text-gray-500">Years Exp.</p>
              </div>
              <div className="text-center flex items-center gap-3">
                <p className="text-lg font-bold text-primary">4.8</p>
                <p className="text-sm text-gray-500">Rating</p>
              </div>
            </div>

            <CustomButton
              className="mt-4 max-w-[180px] bg-white border-primary border"
              handleClick={() => {
                router.push(`/appointment/${doctor.id}`);
              }}
            >
              <span className="text-primary text-sm lg:text-[16px] font-medium">
                Book Appointment
              </span>
            </CustomButton>
          </div>
        </div>
      </div>
    </div>
  );
}
