import api from "@/lib/axios";
import toast from "react-hot-toast";
import { create } from "zustand";
import { persist } from "zustand/middleware";

const useClinicAdminPanelStore = create(
  persist((set) => ({
    ActiveTab: "doctors",
    doctors: [],
    appointments: [],
    setActiveTab: (tab) => set({ ActiveTab: tab }),
    isLoading: false,
    clinicDetails: null,
    fetchDoctors: async () => {
      try {
        set({ isLoading: true });
        const res = await api.get("/clinic/doctors");
        set({ doctors: res.data.doctors });
        set({ isLoading: false });
      } catch (err) {
        console.log(err);
        set({ isLoading: false });
      }
    },
    addDoctor: async (doctor) => {
      try {
        set({ isLoading: true });
        const res = await api.post("/clinic/doctors/", doctor);
        set((state) => ({ doctors: [...state.doctors, res.data.doctor] }));
        toast.success("Doctor added successfully");
        set({ isLoading: false });
      } catch (err) {
        console.log(err);
        toast.error(err.response.data.message);
        set({ isLoading: false });
        throw err;
      }
    },
    updateDoctor: async (doctor, id) => {
      try {
        set({ isLoading: true });
        const res = await api.put(`/clinic/doctors/${id}`, doctor);
        set(async (state) => {
          await state.fetchDoctors();
        });
        toast.success("Doctor updated successfully");
        set({ isLoading: false });
      } catch (err) {
        toast.error(err.response.data.message);
        set({ isLoading: false });
        throw err;
      }
    },
    deleteDoctor: async (id) => {
      try {
        set({ isLoading: true });
        await api.delete(`/clinic/doctors/${id}`);
        set((state) => ({
          doctors: state.doctors.filter((doctor) => doctor._id !== id),
        }));
        toast.success("Doctor deleted successfully");
        set({ isLoading: false });
      } catch (err) {
        toast.error(err.response?.data.message || "Error deleting doctor");
        set({ isLoading: false });
      }
    },
    getClinicDetails: async () => {
      try {
        set({ isLoading: true });
        const res = await api.get("/clinic/");
        console.log("clinic details :: ", res.data.clinicDetails);
        set({ clinicDetails: res.data.clinicDetails });
        set({ isLoading: false });
      } catch (err) {
        console.log(err);
        set({ isLoading: false });
      }
    },
    updateClinicDetails: async (clinicDetails) => {
      try {
        set({ isLoading: true });
        const res = await api.put("/clinic/", clinicDetails);
        toast.success("Clinic details updated successfully");
        set({ clinicDetails: res.data.clinic });
        set({ isLoading: false });
      } catch (err) {
        console.log(err);
        toast.error(
          err.response?.data.message || "Error updating clinic details"
        );
        set({ isLoading: false });
      }
    },
    getAppointments: async () => {
      try {
        set({ isLoading: true });
        const res = await api.get("/clinic/appointments");
        set({ appointments: res.data.appointments });
        set({ isLoading: false });
      } catch (err) {
        console.log(err);
        set({ isLoading: false });
      }
    },
    getLabTests: async (pageNumber) => {
      try {
        set({ isLoading: true });
        const res = await api.get(`/clinic/labs?page=${pageNumber}&limit=10`);
        set({ isLoading: false });
        return res.data;
      } catch (err) {
        console.log(err);
        set({ isLoading: false });
      }
    },
    addLabTest: async (labTest) => {
      try {
        set({ isLoading: true });
        const res = await api.post("/clinic/labs", labTest);
        toast.success("Lab test added successfully");
        set({ isLoading: false });
        return res.data.labTest;
      } catch (err) {
        console.log(err);
        toast.error(err.response.data.message);
        set({ isLoading: false });
      }
    },
    deleteLabTest: async (id) => {
      try {
        set({ isLoading: true });
        await api.delete(`/clinic/labs/${id}`);
        toast.success("Lab test deleted successfully");
        set({ isLoading: false });
      } catch (err) {
        console.log(err);
        toast.error(err.response.data.message);
        set({ isLoading: false });
      }
    },
    editTest: async (id, labTest) => {
      try {
        set({ isLoading: true });
        const res = await api.put(`/clinic/labs/${id}`, labTest);
        toast.success("Lab test updated successfully");
        set({ isLoading: false });
        return res.data.labTest;
      } catch (err) {
        console.log(err);
        toast.error(err.response.data.message);
        set({ isLoading: false });
      }
    },
    getAllAppointments: async (pageNumber) => {
      try {
        set({ isLoading: true });
        const res = await api.get(
          `/clinic/labs/appointments?page=${pageNumber}&limit=10`
        );
        set({ isLoading: false });
        return res.data;
      } catch (err) {
        console.log(err);
        set({ isLoading: false });
      }
    },
  }))
);

export default useClinicAdminPanelStore;
