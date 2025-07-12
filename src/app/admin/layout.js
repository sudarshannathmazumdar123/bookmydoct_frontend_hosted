import Navbar from "@/components/clinic-admin/NavBar"
import '../globals.css';
import { Toaster } from "react-hot-toast";


export default function RootLayout({ children }) {

  return (
    <html lang="en">
      <body>
        <Toaster position="top-center" reverseOrder={false} />
        <Navbar children={children} />
      </body>
    </html>
  )
}
