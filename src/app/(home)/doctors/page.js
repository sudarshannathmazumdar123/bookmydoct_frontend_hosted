'use client'

import { useLayoutEffect, useState } from 'react'
import Image from 'next/image'
import { Input } from "@/components/ui/input"

import { Search } from 'lucide-react'
import useAuthStore from '@/store/authStore'

import { useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { userStore } from '@/store/userStore'
import DoctorCard from '@/components/common/DoctorCard'
import LoadingAnimation from '@/components/common/Loading'

export default function DoctorList() {
    const [isLoading, setIsLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState('')
    const [searchResults, setSearchResults] = useState([]);
    const { doctors } = useAuthStore();
    const { getDoctorsByClinicId, search } = userStore();
    const params = useSearchParams();
    const clinicId = params.get('clinicId');

    useEffect(() => {
        if (clinicId) {
            setIsLoading(true);
            getDoctorsByClinicId(clinicId).then((doctors) => {

                const docs = doctors?.map(
                    (doctor) => (
                        {
                            id: doctor._id,
                            name: doctor?.fullName,
                            specialization: doctor?.specialization,
                            image: "/doctor.png",
                            description: `${doctor?.fullName} has ${doctor.experience} years of experience as ${doctor?.specialization}`,
                            qualification: doctor?.medicalDegree,
                        }
                    )
                )

                setSearchResults(docs);
                setIsLoading(false);
            }).catch((error) => {
                console.log(error);
                setIsLoading(false);
            })
        }
    }, [clinicId])

    useEffect(() => {
        if (!clinicId) {
            setIsLoading(true);
            search("", "doctor", searchTerm).then((data) => {
                const docs = data?.data?.map(
                    (doctor) => (
                        {
                            id: doctor._id,
                            name: doctor?.fullName,
                            specialization: doctor?.specialization,
                            image: "/doctor.png",
                            description: `${doctor?.fullName} has ${doctor.experience ? doctor.experience : 'significant'} years of experience as ${doctor?.specialization}`,
                            qualification: doctor?.medicalDegree,
                        }
                    )
                )
                setSearchResults(docs);
                setIsLoading(false);
            }).catch((err) => {
                console.log(err);
                setIsLoading(false);
            })


        }
    }, [doctors, searchTerm])

    return (
        <div className="container mx-auto px-4 py-8 min-h-screen">
            <h1 className="text-3xl font-bold text-center mb-8">{clinicId ? 'Clinic' : 'Our'} Doctors</h1>
            <div className="mb-6 relative">
                <Input
                    type="text"
                    placeholder="Search doctors by name or specialization..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                />
                <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
            <div className='flex justify-center items-center p-0'>
                {isLoading ? <LoadingAnimation />
                    :
                    searchResults?.length === 0 ? <p className="text-center text-gray-500 mt-8">No doctors found. Try a different search term.</p>
                        :
                        <div className="grid grid-cols-1 w-full md:grid-cols-2 lg:grid-cols-3 gap-6 place-items-center">
                            {searchResults?.map((doctor) => (
                                <DoctorCard key={doctor.id} doctor={doctor} />
                            ))}
                        </div>
                }
            </div>
        </div>
    )
}