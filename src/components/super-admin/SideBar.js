"use client";
import Link from 'next/link'
import { Home, DollarSign, Users, Settings, BarChart, Hospital, PenTool } from 'lucide-react'
import { useState } from 'react'

const Sidebar = ({ open }) => {
    return (
        <div className={`bg-primary text-white w-64 space-y-6 py-7 px-2 absolute inset-y-0 left-0 transform ${open ? "" : "-translate-x-full"} md:relative md:translate-x-0 transition duration-200 ease-in-out z-10`}>
            <Link href="/" className="text-white flex items-center space-x-2 px-4">
                <BarChart className="w-8 h-8" />
                <span className="text-2xl font-extrabold">Admin Panel</span>
            </Link>
            <nav>

                <Link href="/superAdmin/commissions" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white">
                    <DollarSign className="inline-block mr-2 w-5 h-5" /> Commissions
                </Link>
                <Link href="/superAdmin/settings" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white">
                    <Settings className="inline-block mr-2 w-5 h-5" /> Settings
                </Link>
                <Link href="/superAdmin/verifyClinics" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white">
                    <Hospital className="inline-block mr-2 w-5 h-5" /> Verify Clinics
                </Link>
                <Link href="/superAdmin/specializations" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white">
                    <PenTool className="inline-block mr-2 w-5 h-5" /> Manage Specializations
                </Link>
            </nav>
        </div>

    )
}

export default Sidebar

