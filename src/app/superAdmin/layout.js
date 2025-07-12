import Layout from '@/components/super-admin/Layout';
import '../globals.css';
import { Toaster } from 'react-hot-toast';


export default function AdminLayout({ children }) {
    return (
        <html>
            <body>
                <Toaster position="top-center" reverseOrder={false} />
                <Layout children={children} />
            </body>
        </html>
    )
}

