import Image from "next/image";
import CustomButton from "../ui/CustomButton";
import { useRouter } from "next/navigation";

export default function DoctorCard({ doctor }) {
  const router = useRouter();
  return (
    <div
      key={doctor.id}
      className="rounded-lg flex flex-col-reverse sm:flex-row justify-between min-h-[300px] shadow-md overflow-hidden w-full bg-muted p-4"
    >
      <div className="flex flex-col justify-between items-center sm:items-start mt-4 sm:mb-0 sm:ml-4">
        <p className="text-xl mb-2">{doctor?.name}</p>
        <p className="text-sm text-muted-foreground max-sm:text-center mb-2">
          {doctor?.qualification}
        </p>
        <p className="text-sm text-muted-foreground max-sm:text-center mb-2">
          {doctor?.specialization}
        </p>
        <p className="text-sm text-muted-foreground max-sm:text-center mb-2">
          {doctor?.description}
        </p>

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
      <div className="w-full sm:w-auto md:ml-4 flex justify-center">
        <Image
          src={doctor?.image}
          alt={doctor?.name}
          className="rounded-lg object-cover"
          width={230}
          height={250}
        />
      </div>
    </div>
  );
}
