import Navbar from "@/components/home/Navbar";
import Footer from "@/components/home/Footer";
import { Toaster } from "react-hot-toast";
import './globals.css'
import { Suspense } from "react";
import LoadingAnimation from "@/components/common/Loading";



export default function RootLayout({ children }) {
    return (
        <html lang="en" suppressHydrationWarning suppressContentEditableWarning>
            <body className="w-full">
                <Suspense fallback={<LoadingAnimation />}>
                    <Navbar />
                    <Toaster position="top-center" reverseOrder={false} />
                    {children}
                    <Footer />
                </Suspense>
            </body>
        </html >
    );
}
