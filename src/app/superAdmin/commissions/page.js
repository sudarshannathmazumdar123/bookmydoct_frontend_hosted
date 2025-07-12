"use client"

import { useEffect, useLayoutEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import toast from "react-hot-toast"
import useSuperAdminStore from "@/store/superAdminStore"

export default function CommissionsPage() {
    const { bookingCommissionStore, labTestCommissionPercentageStore, platFormFeeStore, setConstants, fetchLatesConstants } = useSuperAdminStore();
    const [BookingCommission, setBookingCommission] = useState("")
    const [labCommision, setLabCommision] = useState("")
    const [errors, setErrors] = useState({ clinic: "", admin: "", platform: "" })
    const [platFormFee, setPlatFormFee] = useState("");
    const [isLoading, setIsloading] = useState(false);
    const [isUpdated, setIsUpdated] = useState(false);

    useLayoutEffect(() => {
        fetchLatesConstants();
    }, [])

    useEffect(() => {
        if (bookingCommissionStore) {
            setBookingCommission(bookingCommissionStore);
        }
        if (labTestCommissionPercentageStore) {
            setLabCommision(labTestCommissionPercentageStore);
        }
        if (platFormFeeStore) {
            setPlatFormFee(platFormFeeStore);
        }
    }, [bookingCommissionStore, labTestCommissionPercentageStore, platFormFeeStore])

    const validateCommission = (value) => {
        const num = parseFloat(value)
        return !isNaN(num) && num >= 0 && num <= 100
    }

    const validatePlatformFees = (value) => {
        const num = parseInt(value)
        return !isNaN(num) && num > 0
    }
    const handleSubmit = async (e) => {
        e.preventDefault()

        const newErrors = {
            clinic: validateCommission(BookingCommission) ? "" : "Invalid percentage (0-100)",
            admin: validateCommission(labCommision) ? "" : "Invalid percentage (0-100)",
            platform: validatePlatformFees(platFormFee) ? "" : "Platform Fees must be greater than 1",
        }

        setErrors(newErrors);

        if (newErrors.clinic === "" && newErrors.admin === "" && newErrors.platform === "") {
            // Here you would typically send this data to your backend
            const formdata = {
                platFormFee,
                bookingCommission: BookingCommission,
                labTestCommissionPercentage: labCommision
            }
            setIsloading(true);
            try {
                await setConstants(formdata);
                toast.success("Updated Sucessfully");
                setIsloading(false);
                setIsUpdated(false);
            } catch (err) {
                console.log(err);
                setIsloading(false);
            }
        }
    }

    return (
        <div className="flex flex-col justify-center items-center">
            <Card className="w-full max-w-2xl">
                <CardHeader>
                    <CardTitle>Set Commission Percentages</CardTitle>
                    <CardDescription>Define the commission percentages and platFormFees:</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit}>
                        <div className="grid w-full items-center gap-4">
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="clinicCommission">Booking Commission (%)</Label>
                                <Input
                                    id="clinicCommission"
                                    placeholder="Enter percentage"
                                    value={BookingCommission}
                                    onChange={(e) => { setIsUpdated(true); setBookingCommission(e.target.value) }}
                                />
                                {errors.clinic && <p className="text-sm text-red-500">{errors.clinic}</p>}
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="adminCommission">Admin Commission for Lab Tests (%)</Label>
                                <Input
                                    id="adminCommission"
                                    placeholder="Enter percentage"
                                    value={labCommision}
                                    onChange={(e) => { setIsUpdated(true); setLabCommision(e.target.value) }}
                                />
                                {errors.admin && <p className="text-sm text-red-500">{errors.admin}</p>}
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="adminCommission">Platform Fees:</Label>
                                <Input
                                    id="platFormFees"
                                    placeholder="Enter Amount"
                                    value={platFormFee}
                                    onChange={(e) => { setIsUpdated(true); setPlatFormFee(e.target.value) }}
                                />
                                {errors.platform && <p className="text-sm text-red-500">{errors.platform}</p>}
                            </div>
                        </div>
                        <CardFooter className="flex justify-end mt-4 px-0">
                            <Button type="submit" disabled={isLoading || !isUpdated}>{isLoading ? "processing.." : "Save Changes"}</Button>
                        </CardFooter>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}

