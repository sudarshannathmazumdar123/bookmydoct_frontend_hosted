"use client";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useEffect, useLayoutEffect, useState } from "react";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  ChevronLeft,
  ChevronRight,
  Edit,
  Eye,
  Plus,
  Trash,
  X,
} from "lucide-react";
import CustomButton from "@/components/ui/CustomButton";
import AddDoctor from "@/components/clinic-admin/AddDoctor";
import useClinicAdminPanelStore from "@/store/clinicAdminPanelStore";
import { getClinicDoctors } from "@/lib/utils";
import ViewDoctor from "@/components/clinic-admin/ViewDoctor";
import toast from "react-hot-toast";
import EditDoctor from "@/components/clinic-admin/EditDoctor";
import { flushSync } from "react-dom";
import { specializations } from "@/lib/constants";

export default function ClinicAdmin() {
  const [isAddDrawerOpen, setIsAddDrawerOpen] = useState(false);
  const [isViewDrawerOpen, setIsViewDrawerOpen] = useState(false);
  const [isEditDrawerOpen, setIsEditDrawerOpen] = useState(false);
  const [activeDoctorId, setActiveDoctorId] = useState(null);
  const [currentTab, setCurrentTab] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const { doctors, isLoading, fetchDoctors, deleteDoctor, setActiveTab } =
    useClinicAdminPanelStore();

  useLayoutEffect(() => {
    setActiveTab("doctors");
  }, []);

  const handleViewDrawerOpen = (id) => {
    setIsViewDrawerOpen(false);
    setActiveDoctorId(null);
  };
  const handleEditDrawerOpen = (id) => {
    setIsEditDrawerOpen(false);
    setActiveDoctorId(null);
  };

  const handleDeleteDoctor = async (id) => {
    await deleteDoctor(id);
  };

  const handleViewDoctor = (id) => {
    setActiveDoctorId(id);
    setIsViewDrawerOpen(true);
  };

  const handleEditDoctor = (id) => {
    setActiveDoctorId(id);
    setIsEditDrawerOpen(true);
  };

  const handleDeleteDoctorAlert = (id) => {
    toast((t) => (
      <div className="w-full">
        <div className="flex justify-between items-center">
          <div className="flex gap-2 items-center w-full">
            <p>Are you sure you want to delete this doctor?</p>
          </div>
          <div className="flex gap-2 items-center">
            <Button variant="outline" onClick={() => toast.dismiss(t.id)}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={() => {
                handleDeleteDoctor(id);
                toast.dismiss(t.id);
              }}
            >
              Delete
            </Button>
          </div>
        </div>
      </div>
    ));
  };

  useLayoutEffect(() => {
    fetchDoctors();
  }, []);

  const filteredDoctors =
    currentTab === "All"
      ? doctors
      : doctors?.filter((doctor) => doctor.specialization === currentTab);

  const itemsPerPage = 10;
  const totalPages = Math.ceil(filteredDoctors?.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentDoctors = filteredDoctors?.slice(startIndex, endIndex);

  return (
    <div className="p-6 space-y-8 w-full">
      <div className="flex-1 overflow-auto">
        <header className="flex flex-col gap-y-2 sm:gap-y-0 sm:flex-row justify-between items-center w-full mb-5">
          <h1 className="text-2xl font-semibold ">Doctors</h1>
          <CustomButton
            className={"max-w-[200px] flex gap-2 items-center"}
            handleClick={() => setIsAddDrawerOpen(true)}
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Doctor
          </CustomButton>
        </header>
        <main className="w-full h-full">
          <Tabs
            value={currentTab}
            onValueChange={setCurrentTab}
            className="w-full h-full"
          >
            <div className="border-b-2 w-full">
              <div className="flex overflow-x-auto">
                <TabsList className="bg-white  rounded-none">
                  {specializations.map((spec) => (
                    <TabsTrigger key={spec} value={spec} className="font-bold">
                      {" "}
                      <span
                        className={`${
                          currentTab === spec &&
                          "text-primary border-b-4 border-primary"
                        }`}
                      >
                        {spec}{" "}
                      </span>
                    </TabsTrigger>
                  ))}
                </TabsList>
              </div>
            </div>
            <div className="my-4">
              <span className="font-bold"> {filteredDoctors?.length} </span> in
              total
            </div>
            {specializations.map((spec) => (
              <TabsContent key={spec} value={spec}>
                <div className="rounded-lg border bg-white">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-muted">
                        <TableHead>FULL NAME</TableHead>
                        <TableHead>EMAIL</TableHead>
                        <TableHead>PHONE</TableHead>
                        <TableHead>SPECIALIZATION</TableHead>
                        <TableHead>REG. NO</TableHead>
                        {/* <TableHead>AVAILABILITY</TableHead> */}
                        <TableHead className="w-[100px]">ACTION(S)</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {currentDoctors?.map((doctor) => (
                        <TableRow key={doctor._id}>
                          <TableCell>{doctor.fullName}</TableCell>
                          <TableCell>{doctor.email}</TableCell>
                          <TableCell>{doctor.phoneNumber}</TableCell>
                          <TableCell>{doctor.specialization}</TableCell>
                          <TableCell>{doctor.registrationNumber}</TableCell>
                          {/* <TableCell>{doctor.availability}</TableCell> */}
                          <TableCell>
                            <div className="flex gap-2">
                              <Eye
                                className="h-4 w-4 text-primary hover:cursor-pointer"
                                onClick={() => handleViewDoctor(doctor._id)}
                              />

                              <Edit
                                className="h-4 w-4 text-green-500 hover:cursor-pointer"
                                onClick={() => handleEditDoctor(doctor._id)}
                              />

                              <Trash
                                className="h-4 w-4 text-red-500 hover:cursor-pointer"
                                onClick={() =>
                                  handleDeleteDoctorAlert(doctor._id)
                                }
                              />
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
                <div className="mt-4 flex items-center self-end justify-between">
                  <p className="text-sm text-gray-500">
                    Showing {startIndex + 1} to{" "}
                    {Math.min(endIndex, filteredDoctors?.length)} of{" "}
                    {filteredDoctors?.length} results
                  </p>
                  <div className="flex gap-2 items-center">
                    <ChevronLeft
                      className={`h-5 w-5 ${
                        currentPage === 1 && " opacity-20"
                      }`}
                      onClick={() =>
                        setCurrentPage((prev) => Math.max(prev - 1, 1))
                      }
                      disabled={currentPage === 1}
                    />

                    <span className="font-bold rounded-2xl bg-muted p-2 text-primary h-8 w-8 flex justify-center items-center">
                      {" "}
                      {currentPage}{" "}
                    </span>

                    <ChevronRight
                      className={`h-5 w-5 ${
                        currentPage === totalPages && " opacity-20"
                      }`}
                      onClick={() =>
                        setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                      }
                      disabled={currentPage === totalPages}
                    />
                  </div>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </main>
      </div>

      <AddDoctor
        isAddDrawerOpen={isAddDrawerOpen}
        setIsAddDrawerOpen={setIsAddDrawerOpen}
      />
      <ViewDoctor
        isDrawerOpen={isViewDrawerOpen}
        setIsDrawerOpen={handleViewDrawerOpen}
        doctor={doctors?.find((doctor) => doctor._id === activeDoctorId)}
      />
      <EditDoctor
        isDrawerOpen={isEditDrawerOpen}
        setIsDrawerOpen={handleEditDrawerOpen}
        oldDoctor={doctors?.find((doctor) => doctor._id === activeDoctorId)}
      />
    </div>
  );
}
