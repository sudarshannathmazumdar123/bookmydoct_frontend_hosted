import Image from "next/image"
import CustomButton from "../ui/CustomButton"
import { useRouter } from "next/navigation"

export default function ClinicCard ({clinic}) {
    const router = useRouter();
    return(
        <div  className="rounded-lg min-h-[300px] flex flex-col-reverse sm:flex-row justify-between shadow-md overflow-hidden w-full bg-muted p-4">

            <div className="flex flex-col justify-between items-center sm:items-start mt-4 sm:mb-0 sm:ml-4">
                <p className="text-xl mb-2">{clinic?.name}</p>
                <p className="text-sm text-muted-foreground max-sm:text-center mb-2">{clinic?.address}</p>

                <CustomButton className="mt-4 max-w-[180px] bg-white border-primary border" handleClick={() => {
                    router.push(`/doctors?clinicId=${clinic.id}`)
                }}>
                    <span className="text-primary text-sm lg:text-[16px] font-medium">View Doctors</span>
                </CustomButton>
            </div>
            <div className="w-full sm:w-auto md:ml-4 flex justify-center">
                <Image
                    src={clinic?.image}
                    alt={clinic?.name}
                    className="rounded-lg object-cover"
                    width={230}
                    height={250}
                />
            </div>

        </div>
    )
}