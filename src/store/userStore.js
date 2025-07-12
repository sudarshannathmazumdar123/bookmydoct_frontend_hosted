
import { create } from 'zustand'
import api from '@/lib/axios'
import toast from 'react-hot-toast'
import { getClinicDetails } from '@/lib/utils'

export const userStore = create((set) => ({
    loading: false,
    getDoctorById: async (id) => {
        try {
            set({ loading: true })
            const res = await api.get(`/user/doctor/${id}`);
            set({ loading: false })
            return res.data;
        } catch (error) {

            toast.error(error.response?.data?.message || 'Error fetching doctor')
            set({ loading: false })
        }
    },
    getClinics: async (doctor) => {
        try {
            const promiseArray = doctor?.clinics.map((clinicId) => {
                return api.get(`/user/clinic/${clinicId}`)
            })
            const clinics = await Promise.all(promiseArray);
            return clinics.map(c => c.data.clinicDetails);
        } catch (error) {

            toast.error(error.response?.data?.message || 'Error fetching clinics')
        }
    },
    bookAppointment: async (appointmentData) => {
        try {
            set({ loading: true })
            const res = await api.post('/user/appointments', appointmentData);
            set({ loading: false })
            return res.data;
        } catch (error) {

            set({ loading: false })
            toast.error(error.response?.data?.message || 'Error booking appointment')
        }
    },
    getAppointments: async () => {
        try {
            const res = await api.get('/user/appointments');
            return res.data.appointments;
        } catch (error) {
            toast.error(error.response?.data?.message || 'Error fetching appointments')
        }
    },
    getSlotDetails: async (doctorId, clinicId, scheduledId, appointmentDate) => {
        try {
            const res = await api.get(`/user/doctor/slots?doctorId=${doctorId}&clinicId=${clinicId}&scheduledId=${scheduledId}&appointmentDate=${appointmentDate}`);
            return res.data;
        } catch (error) {
            console.log(error)
        }
    },
    getDoctorsByClinicId: async (clinicId) => {
        try {
            const res = await api.get(`/user/doctors/clinics/${clinicId}`);

            return res.data.doctors;
        } catch (error) {
            toast.error(error.response?.data?.message || 'Error fetching doctors')
            console.log(error)
        }
    },
    getClinicDetails: async (clinicId) => {
        try {
            const res = await api.get(`/user/clinic/${clinicId}`);
            return res.data.clinicDetails;
        } catch (error) {
            toast.error(error.response?.data?.message || 'Error fetching clinic details')
        }
    },
    search: async (location, searchOn, query) => {
        try {
            const res = await api.get(`/user/get-all-data?location=${location}&searchOn=${searchOn}&query=${query}`);
            return res.data;
        } catch (error) {
            console.log(error)
        }
    },
    getLabClinics: async () => {
        try {
            const res = await api.get('/user/lab-clinics');
            return res.data;
        } catch (error) {
            toast.error(error.response?.data?.message || 'Error fetching labs')
        }
    },
    getLabtestsByClinic: async (clinicId) => {
        try {
            const res = await api.get(`/user/labs/${clinicId}`);
            return res.data;
        } catch (error) {
            toast.error(error.response?.data?.message || 'Error fetching lab tests')
        }
    },
    bookLabAppointment: async (appointmentData) => {
        try {
            const res = await api.post('/user/lab/appointments', appointmentData);
            return res.data;
        } catch (error) {
            toast.error(error.response?.data?.message || 'Error booking appointment')
        }
    },
    getAllAppointments: async (pageNumber) => {
        try {
            set({ isLoading: true });
            const res = await api.get(`/user/lab/appointments?page=${pageNumber}&limit=10`);

            set({ isLoading: false });
            return res.data;
        } catch (err) {
            console.log(err);
            set({ isLoading: false });
        }
    }
}))