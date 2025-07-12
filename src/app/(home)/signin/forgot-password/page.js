'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Mail } from 'lucide-react'
import toast from 'react-hot-toast'
import { forgetPassword, resetPassword } from '@/lib/utils'
import useAuthStore from '@/store/authStore'
import { useRouter, useSearchParams } from 'next/navigation'
import { Suspense } from 'react'

function ForgotPasswordEmailOTP() {
    const params = useSearchParams();
    const [email, setEmail] = useState('')
    const [otp, setOtp] = useState('')
    const [step, setStep] = useState(1)
    const [newPassword, setNewPassword] = useState('');
    const { forgetPassword, resetPassword, isLoading } = useAuthStore();
    const router = useRouter();

    const handleEmailSubmit = async (e) => {
        e.preventDefault()
        if (!email) {
            setError('Please enter your email address')
            return
        }

        const role = params.get('role');
        try {
            await forgetPassword(email, role);
            setStep(2)
        }
        catch (error) {
            console.log(error);
        }


    }

    const handleOtpSubmit = async (e) => {
        e.preventDefault()
        const role = params.get('role');
        if (!otp) {
            toast.error('Please enter the OTP')
            return
        }

        await resetPassword(email, otp, newPassword, role);
        if (role === 'user') {
            router.push('/signin/patient')
        } else if (role === 'clinic') {
            router.push('/signin/clinic')
        }

    }


    return (
        <div>
            <div className="container mx-auto p-4 flex items-center justify-center min-h-screen">
                <Card className="w-full max-w-md">
                    <CardHeader>
                        <CardTitle className="text-2xl font-bold">Forgot Password</CardTitle>
                    </CardHeader>
                    <CardContent>

                        {step === 1 ? (
                            <form onSubmit={handleEmailSubmit}>
                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="email">Email</Label>
                                        <div className="relative">
                                            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                            <Input
                                                id="email"
                                                type="email"
                                                placeholder="Enter your email address"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                className="pl-10"
                                            />
                                        </div>
                                    </div>
                                    <Button type="submit" className="w-full" disabled={isLoading}> {isLoading ? "Processing..." : "Send OTP"}</Button>
                                </div>
                            </form>
                        ) : (
                            <form onSubmit={handleOtpSubmit}>
                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="otp">One-Time Password</Label>
                                        <Input
                                            id="otp"
                                            type="text"
                                            placeholder="Enter the OTP sent to your email"
                                            value={otp}
                                            onChange={(e) => setOtp(e.target.value)}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="newPassword">New Password</Label>
                                        <Input
                                            id="newPassword"
                                            type="password"
                                            placeholder="Enter your new password"
                                            value={newPassword}
                                            onChange={(e) => setNewPassword(e.target.value)}
                                        />
                                    </div>
                                    <Button type="submit" className="w-full" disabled={isLoading}> {isLoading ? "Processing..." : "Reset Password"}</Button>
                                </div>
                            </form>
                        )}
                    </CardContent>
                    {step === 2 && (<CardFooter className="flex justify-center">
                        <Button variant="link" onClick={() => setStep(1)}>
                            Back to Email Entry
                        </Button>
                    </CardFooter>)}
                </Card>
            </div>
        </div>
    )
}

export default function Page() {
    return (
        <Suspense>
            <ForgotPasswordEmailOTP />
        </Suspense>
    )
}