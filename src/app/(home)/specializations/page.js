'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Stethoscope, Heart, Bone, Ear, Baby, Brain, Syringe, Pill, Search, Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import useSuperAdminStore from '@/store/superAdminStore'
import LoadingAnimation from '@/components/common/Loading'

const getIconForSpecialization = (specialization) => {
    switch (specialization.toLowerCase()) {
        case 'cardiologist':
            return <Heart className="w-6 h-6 text-red-500" />
        case 'orthopedic':
            return <Bone className="w-6 h-6 text-gray-600" />
        case 'audiologist':
            return <Ear className="w-6 h-6 text-blue-500" />
        case 'pediatrician':
            return <Baby className="w-6 h-6 text-pink-500" />
        case 'psychiatrist':
            return <Brain className="w-6 h-6 text-purple-500" />
        case 'radiologist':
            return <Syringe className="w-6 h-6 text-green-500" />
        case 'medicine':
            return <Pill className="w-6 h-6 text-blue-600" />
        default:
            return <Stethoscope className="w-6 h-6 text-gray-500" />
    }
}

export default function DoctorCategories() {
    const [searchTerm, setSearchTerm] = useState('')
    const [loading, setLoading] = useState(true)
    const router = useRouter()
    const { specializations, getSpecializations } = useSuperAdminStore()

    useEffect(() => {
        const fetchSpecializations = async () => {
            try {
                await getSpecializations()
            } catch (error) {
                console.error('Error fetching specializations:', error)
            } finally {
                setLoading(false)
            }
        }
        fetchSpecializations()
    }, [])

    const filteredSpecializations = specializations?.filter(spec =>
        spec.toLowerCase().includes(searchTerm.toLowerCase())
    ) || []

    if (loading) {
        return (
            <LoadingAnimation />
        )
    }

    return (
        <div className="container mx-auto px-4 py-8 min-h-screen">
            <h1 className="text-3xl font-bold text-center mb-8">Doctor Specializations</h1>
            <div className="mb-6 relative">
                <Input
                    type="text"
                    placeholder="Search specializations..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                />
                <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                <Card
                    className="hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
                    onClick={() => router.push('/doctors')}
                >
                    <CardContent className="p-4 flex items-center justify-center flex-col h-full">
                        <div className="mb-2">
                            <Stethoscope className="w-6 h-6 text-gray-500" />
                        </div>
                        <h2 className="text-lg font-semibold text-center">All</h2>
                    </CardContent>
                </Card>

                {filteredSpecializations.map((specialization, index) => (
                    <Card
                        key={index}
                        className="hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
                        onClick={() => router.push(`/?specialization=${specialization}`)}
                    >
                        <CardContent className="p-4 flex items-center justify-center flex-col h-full">
                            <div className="mb-2">
                                {getIconForSpecialization(specialization)}
                            </div>
                            <h2 className="text-lg font-semibold text-center">{specialization}</h2>
                        </CardContent>
                    </Card>
                ))}
            </div>
            {filteredSpecializations.length === 0 && (
                <p className="text-center text-gray-500 mt-8">No specializations found. Try a different search term.</p>
            )}
        </div>
    )
}