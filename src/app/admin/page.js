"use client";
import useClinicAdminPanelStore from "@/store/clinicAdminPanelStore";
import { useRouter } from "next/navigation";
import { useEffect } from "react"


export default function ClinicAdmin() {
    const router = useRouter();
    const { ActiveTab } = useClinicAdminPanelStore();
    useEffect(() => {
        router.push(`/admin/${ActiveTab}`)
    })
    return (
        <div>
            <h1>Clinic Admin</h1>
        </div>
    )
}