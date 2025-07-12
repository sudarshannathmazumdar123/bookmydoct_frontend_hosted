import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import api from '@/lib/axios'
import Cookies from 'js-cookie'
import toast from 'react-hot-toast'
import { jwtDecode } from 'jwt-decode'



const useAuthStore = create(
    persist(
        (set, get) => ({
            user: null,
            isLoading: false,
            isTokenValid: (token) => {
                if (!token) return false;
                try {
                    const decoded = jwtDecode(token);
                    return decoded.exp * 1000 > Date.now();
                } catch {
                    return false;
                }
            },
            validateTokens: async (role) => {
                const token = Cookies.get('token');
                const refreshToken = Cookies.get('refreshToken');

                try {
                    if (get().isTokenValid(token)) {
                        return;
                    }
                    Cookies.remove('token');
                    if (refreshToken) {
                        const response = await api.get('/auth/get-access-token', {
                            headers: {
                                Authorization: `Bearer ${refreshToken}`
                            }
                        })

                        Cookies.set('token', response.data.token);
                        return;
                    }
                    throw new Error('Invalid session');
                } catch (e) {
                    set({
                        user: null,
                        isLoading: false,
                    });
                    Cookies.remove('token');
                    Cookies.remove('refreshToken');
                    toast.error('Session expired. Please login again.');
                }
            },
            signup: async (userData, role) => {
                set({ isLoading: true })
                try {
                    const response = await api.post(`/auth/${role}/signup`, userData)
                    set({
                        user: response.data.userObject,
                        isLoading: false,
                    })
                    console.log(response);
                    if (role == "clinic") {
                        toast((t) => (
                            <span className='flex'>
                                <p>Registration successful! Please wait for the super admin to verify details</p>
                                <button onClick={() => toast.dismiss(t.id)}>
                                    Dismiss
                                </button>
                            </span>
                        ));
                    } else {
                        Cookies.set('token', response.data.token)
                        Cookies.set('refreshToken', response.data.refreshToken)
                        toast.success('Signup successful')
                    }
                } catch (error) {
                    set({
                        isLoading: false
                    })
                    console.log("signup error", error);
                    toast.error(error.response?.data?.message || 'Signup failed')
                    throw error
                }
            },

            login: async (credentials, role) => {
                set({ isLoading: true })

                try {
                    const response = await api.post(`/auth/${role}/login`, credentials)
                    set({
                        user: response.data.userObject,
                        isLoading: false,
                    })

                    Cookies.set('token', response.data.token, {
                        secure: true,
                        sameSite: 'strict'
                    });
                    Cookies.set('refreshToken', response.data.refreshToken, {
                        secure: true,
                        sameSite: 'strict'
                    });
                    toast.success('Login successful')
                } catch (error) {
                    set({
                        isLoading: false
                    })
                    console.log(error);
                    if (role === 'clinic' && error.toString().includes("No refresh token")) {
                        toast.error("Clinic details are not verified yet pls contact admin");
                    } else {
                        toast.error(error.response?.data?.message || 'Login failed');
                    }
                    throw error
                }
            },

            logout: () => {
                try {
                    set({
                        user: null,
                        error: null,
                    })
                    Cookies.remove('token')
                    Cookies.remove('refreshToken')
                    toast.success('Logout successful');
                } catch (error) {
                    toast.error('Logout failed');
                }

            },

            updateUser: async (userData, role) => {
                set({ isLoading: true })
                try {
                    const response = await api.put(`/auth/${role}/edit`, userData)
                    set({
                        isLoading: false,
                        user: response.data.user,
                    })
                    toast.success('User updated successfully')
                    return response.data
                }
                catch (error) {
                    set({

                        isLoading: false
                    })
                    toast.error(error.response?.data?.message || 'Update failed')
                    throw error
                }
            },
            forgetPassword: async (email, role) => {
                try {
                    set({ isLoading: true })
                    const res = await api.post(`/auth/${role}/forgot-password`, { email });
                    toast.success('OTP sent to your registered email')
                    set({ isLoading: false })
                    return res.data;
                } catch (error) {

                    set({

                        isLoading: false
                    })
                    toast.error(error.response?.data?.message || 'Error Sending OTP')
                    throw error
                }
            },
            resetPassword: async (email, otp, password, role) => {
                try {
                    set({ isLoading: true })
                    const res = await api.post(`/auth/${role}/reset-password`, { email, otp, newPassword: password });
                    toast.success('Password reset successful')
                    set({ isLoading: false })
                    return res.data;
                } catch (error) {
                    set({

                        isLoading: false
                    })
                    toast.error(error.response?.data?.message || 'Wrong OTP')
                }
            },
            changePassword: async (oldPassword, newPassword, role) => {
                try {
                    set({ isLoading: true })
                    const res = await api.post(`/auth/${role}/change-password`, { oldPassword, newPassword });

                    toast.success('Password changed successfully')
                    set({ isLoading: false })
                    return res.data;
                } catch (error) {
                    set({
                        isLoading: false
                    })
                    toast.error(error.response?.data.message || 'Something went wrong')
                }
            },
        }),

        // isloading, error, doctors remove from persist

        {
            name: 'auth-storage',
            storage: createJSONStorage(() => localStorage),
            partialize: (state) => ({
                user: state.user,
            }),
            onRehydrateStorage: (state) => {
                return (state, error) => {
                    if (error) {
                        console.log('an error happened during hydration', error)
                    }
                }
            },
        }
    )
)

export default useAuthStore
