"use client";
import { use, useEffect, useLayoutEffect, useState } from "react";
import Header from "./Header";
import Sidebar from "./SideBar";

import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import LoadingAnimation from "../common/Loading";
import useAuthStore from "@/store/authStore";

const Layout = ({ children }) => {
    const [isLoading, setIsloading] = useState(false);
    const validateTokens = useAuthStore(state => state.validateTokens)
    const user = useAuthStore(state => state.user)


    const [open, setOpen] = useState(false);
    return (
        <div className="flex h-screen bg-gray-100">
            <Sidebar open={open} />
            <div className="flex-1 flex flex-col overflow-hidden">
                <Header open={open} setOpen={setOpen} />
                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
                    <div className="container mx-auto px-6 py-8">
                        {isLoading ? <LoadingAnimation /> : children}
                    </div>
                </main>
            </div>
        </div>
    )
}

export default Layout;