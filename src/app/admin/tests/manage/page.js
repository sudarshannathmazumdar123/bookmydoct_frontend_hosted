"use client"

import { useEffect, useLayoutEffect, useState } from "react";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Edit, Eye, Plus, Trash, X } from "lucide-react";
import CustomButton from "@/components/ui/CustomButton";
import useClinicAdminPanelStore from "@/store/clinicAdminPanelStore";
import toast from "react-hot-toast";
import EditDoctor from "@/components/clinic-admin/EditDoctor";
import AddLabTest from "@/components/clinic-admin/AddLabTest";
import EditLabTest from "@/components/clinic-admin/EditLabTest";

export default function ClinicAdmin() {
    const [isAddDrawerOpen, setIsAddDrawerOpen] = useState(false);
    const [isEditDrawerOpen, setIsEditDrawerOpen] = useState(false);
    const [activeTestId, setActiveTestId] = useState(null);
    const [currentPage, setCurrentPage] = useState(1)
    const { getLabTests, deleteLabTest, setActiveTab, addLabTest, editTest } = useClinicAdminPanelStore();
    const [labTests, setLabTests] = useState([]);
    const [totalPages, setTotalPages] = useState(1);

    const itemsPerPage = 10
    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage

    const handleAddDoctor = async (labTest) => {
        try {
            const res = await addLabTest(labTest);
            setIsAddDrawerOpen(false);
            setLabTests([...labTests, res]);
        } catch (error) {
            console.log(error);
        }
    }

    useLayoutEffect(() => {
        setActiveTab('manageTests')
    }, [])

    const handleEditDrawerOpen = (id) => {
        setIsEditDrawerOpen(false);
        setActiveTestId(null);
    };

    const handleDeleteLabTest = async (id) => {
        try {
            await deleteLabTest(id);
            setLabTests(labTests.filter((labTest) => labTest.id !== id));
        } catch (error) {
            console.log(error)
        }
    }

    const handleEditTest = (id) => {
        setActiveTestId(id);
        setIsEditDrawerOpen(true);
    }

    const updateTest = async (test) => {
        try {
            const res = await editTest(activeTestId, test);
            setLabTests(labTests.map((labTest) => labTest._id === activeTestId ? res : labTest));
            setIsEditDrawerOpen(false);
        } catch (error) {
            console.log(error)
        }
    }

    const handleDeleteLabTestAlert = (id) => {
        toast((t) => (
            <div className="w-full">
                <div className="flex justify-between items-center">
                    <div className="flex gap-2 items-center w-full">
                        <p>Are you sure you want to delete this Lab Test?</p>
                    </div>
                    <div className="flex gap-2 items-center">
                        <Button variant="outline" onClick={() => toast.dismiss(t.id)}>Cancel</Button>
                        <Button variant="destructive" onClick={() => { handleDeleteLabTest(id); toast.dismiss(t.id) }}>Delete</Button>
                    </div>
                </div>
            </div>
        ))

    }

    useEffect(() => {
        getLabTests(currentPage).then((res) => {
            setLabTests(res?.labTests);
            setTotalPages(res?.totalPages);
        })
    }, [])

    return (
        <div className="p-6 space-y-8 w-full">
            <div className="flex-1 overflow-auto">
                <header className="flex flex-col gap-y-2 sm:gap-y-0 sm:flex-row justify-between items-center w-full mb-5">
                    <h1 className="text-2xl font-semibold ">Tests</h1>
                    <CustomButton className={"max-w-[200px] flex gap-2 items-center"} handleClick={() => setIsAddDrawerOpen(true)}>
                        <Plus className="mr-2 h-4 w-4" />
                        Add Lab Test
                    </CustomButton>
                </header>
                <main className="w-full h-full">
                    <div className="w-full h-full">
                        <div  >
                            <div className="rounded-lg border bg-white">
                                <Table>
                                    <TableHeader>
                                        <TableRow className="bg-muted">
                                            <TableHead>Test Name</TableHead>
                                            <TableHead>Description</TableHead>
                                            <TableHead>Price</TableHead>
                                            <TableHead className="w-[100px]">ACTION(S)</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {labTests?.map((test) => (
                                            <TableRow key={test._id}>
                                                <TableCell>{test.name}</TableCell>
                                                <TableCell>{test.description}</TableCell>
                                                <TableCell>{test.price}</TableCell>
                                                <TableCell>
                                                    <div className="flex gap-2">
                                                        <Edit className="h-4 w-4 text-green-500 hover:cursor-pointer" onClick={() => handleEditTest(test._id)} />
                                                        <Trash className="h-4 w-4 text-red-500 hover:cursor-pointer" onClick={() => handleDeleteLabTestAlert(test._id)} />
                                                    </div>
                                                </TableCell>
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

            <AddLabTest isAddDrawerOpen={isAddDrawerOpen} setIsAddDrawerOpen={setIsAddDrawerOpen} handleAddDoctor={handleAddDoctor} />
            {/* <ViewDoctor isDrawerOpen={isViewDrawerOpen} setIsDrawerOpen={handleViewDrawerOpen} doctor={doctors?.find(doctor => doctor._id === activeDoctorId)} /> */}
            <EditLabTest isDrawerOpen={isEditDrawerOpen} setIsDrawerOpen={handleEditDrawerOpen} oldLabTest={labTests?.find(test => test._id === activeTestId)} handleEditTest={updateTest} />

        </div>
    )
}