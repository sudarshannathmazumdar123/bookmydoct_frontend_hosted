"use client"

import { Button } from "@/components/ui/button"
import CustomButton from "@/components/ui/CustomButton"
import Overlay from "@/components/ui/overlay"
import Image from "next/image"
import Link from "next/link"


export default function AboutUs() {
    return (
        <div>
            <section className="md:pl-[132px] relative w-full py-12 md:py-24 lg:py-32 bg-[url('/aboutusHero.png')] bg-cover bg-center">
                <Overlay />
                <div className="container z-10 relative px-4 md:px-6 ">
                    <div className="flex flex-col space-y-4  text-white">
                        <h1 className="text-3xl font-bold  sm:text-4xl md:text-5xl lg:text-6xl/none">
                            Connecting Compassion
                        </h1>
                        <p className=" max-w-[700px] text-gray-200 md:text-xl">
                            Bringing healthcare professionals and patients closer.
                        </p>
                        <Link href={'/signup'}>
                            <CustomButton className='w-[150px]'>
                                <span className="mx-[15px] text-sm font-medium">Get Started</span>
                            </CustomButton>
                        </Link>
                    </div>
                </div>
            </section>
            <section className="w-full flex justify-center items-center">
                <div className="container px-4 py-12 md:py-16 lg:py-24 lg:px-0 lg:mx-[100px] w-full ">
                    <div className="flex flex-col lg:flex-row lg:items-start justify-center gap-8 mx-auto">
                        {/* About Us Content */}
                        <div className="space-y-8 w-full lg:w-1/2">
                            <div>
                                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tighter">About us</h1>
                                <p className="mt-4 text-gray-500 dark:text-gray-400">
                                    At BookMyDoct, we prioritize compassionate and personalized healthcare, ensuring every patient receives the
                                    utmost care and attention.
                                </p>
                            </div>

                            <div className="space-y-8">
                                <div className="border-b-2 pb-4">
                                    <h2 className="text-xl font-semibold mb-3">Innovation</h2>
                                    <p className="text-gray-500 dark:text-gray-400">
                                        Our clinic/hospital revolutionizes healthcare by integrating cutting-edge technology with a patient-first approach,
                                        making advanced treatments accessible to all.
                                    </p>
                                </div>

                                <div className="border-b-2 pb-4">
                                    <h2 className="text-xl font-semibold mb-3">Customer-Centric</h2>
                                    <p className="text-gray-500 dark:text-gray-400">
                                        We are dedicated to building lasting relationships with our patients, providing continuous support and care
                                        throughout their healthcare journey.
                                    </p>
                                </div>

                                <div className="border-b-2 pb-4">
                                    <h2 className="text-xl font-semibold mb-3">Expertise</h2>
                                    <p className="text-gray-500 dark:text-gray-400">
                                        Our team comprises seasoned professionals with decades of experience, committed to delivering exceptional
                                        healthcare services.
                                    </p>
                                </div>

                                <div>
                                    <h2 className="text-xl font-semibold mb-3">Integrity</h2>
                                    <p className="text-gray-500 dark:text-gray-400">
                                        Transparency and honesty are the cornerstones of our practice, ensuring open communication and trust with our
                                        patients at every step.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Building Image */}
                        <div className="w-full lg:w-2/5">
                            <div className="relative rounded-2xl overflow-hidden h-[400px] md:h-[600px] lg:h-[800px]">
                                <Image
                                    alt="Modern medical facility exterior"
                                    className="object-cover"
                                    fill
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                    src="/building.png"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-12 px-4 bg-[#F3F4F6FF] text-primary w-full text-center">
                <h2 className="text-3xl font-bold mb-4">Book Your Visit</h2>
                <p className="mb-8 text-black">Schedule an appointment today to receive personalized care at your convenience.</p>
                <Link href="/">
                    <CustomButton className='w-[150px] mx-auto'>Get strated</CustomButton>
                </Link>
            </section>
        </div>
    )
}
