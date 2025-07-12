"use client"

import { useEffect, useLayoutEffect, useState } from "react";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { ChevronLeft, ChevronRight, Edit, Eye, Plus, Trash, X } from "lucide-react";
import useClinicAdminPanelStore from "@/store/clinicAdminPanelStore";

export default function ClinicAdmin() {
    const [currentPage, setCurrentPage] = useState(1)
    const { getAllAppointments, setActiveTab, } = useClinicAdminPanelStore();
    const [labTests, setLabTests] = useState([]);
    const [totalPages, setTotalPages] = useState(1);

    const itemsPerPage = 10
    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage

    useLayoutEffect(() => {
        setActiveTab('viewRequests')
    }, [])

    useEffect(() => {
        getAllAppointments(currentPage).then((res) => {
            setLabTests(res?.appointments);
            setTotalPages(res?.totalPages);
        })
    }, [])

    return (
        <div className="p-6 space-y-8 w-full">
            <div className="flex-1 overflow-auto">
                <header className="flex flex-col gap-y-2 sm:gap-y-0 sm:flex-row justify-between items-center w-full mb-5">
                    <h1 className="text-2xl font-semibold ">Test Requests</h1>
                </header>
                <main className="w-full h-full">
                    <div className="w-full h-full">
                        <div  >
                            <div className="rounded-lg border bg-white">
                                <Table>
                                    <TableHeader>
                                        <TableRow className="bg-muted">
                                            <TableHead>Patient Name</TableHead>
                                            <TableHead>Age</TableHead>
                                            <TableHead>Gender</TableHead>
                                            <TableHead>PhoneNumber</TableHead>
                                            <TableHead>Address</TableHead>
                                            <TableHead>Test</TableHead>
                                            <TableHead>Appointment Date</TableHead>
                                            {/* <TableHead className="w-[100px]">ACTION(S)</TableHead> */}
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {labTests?.map((test) => (
                                            <TableRow key={test._id}>
                                                <TableCell>{test.fullName}</TableCell>
                                                <TableCell>{test.age}</TableCell>
                                                <TableCell>{test.gender}</TableCell>
                                                <TableCell>{test.phoneNumber}</TableCell>
                                                <TableCell>{test.address}</TableCell>
                                                <TableCell>{test.testNames}</TableCell>
                                                <TableCell>{test.appointmentDate}</TableCell>
                                                {/* <TableCell>
                                                    <div className="flex gap-2">
                                                        <Edit className="h-4 w-4 text-green-500 hover:cursor-pointer" onClick={() => handleEditTest(test._id)} />
                                                        <Trash className="h-4 w-4 text-red-500 hover:cursor-pointer" onClick={() => handleDeleteLabTestAlert(test._id)} />
                                                    </div>
                                                </TableCell> */}
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>
                            <div className="mt-4 flex items-center self-end justify-between">
                                <p className="text-sm text-gray-500">
                                    Showing {labTests?.length === 0 ? "0" : startIndex + 1} to {Math.min(endIndex, labTests?.length)}
                                </p>
                                <div className="flex gap-2 items-center">
                                    <ChevronLeft className={`h-5 w-5 ${currentPage === 1 && " opacity-20"}`} onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                        disabled={currentPage === 1} />

                                    <span className="font-bold rounded-2xl bg-muted p-2 text-primary h-8 w-8 flex justify-center items-center"> {currentPage} </span>

                                    <ChevronRight className={`h-5 w-5 ${currentPage === totalPages && " opacity-20"}`} onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                                        disabled={currentPage === totalPages} />
                                </div>
                            </div>
                        </div>

                    </div>
                </main>
            </div>

            {/* <ViewDoctor isDrawerOpen={isViewDrawerOpen} setIsDrawerOpen={handleViewDrawerOpen} doctor={doctors?.find(doctor => doctor._id === activeDoctorId)} /> */}
        </div>
    )
}