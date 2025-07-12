'use client';
import { useEffect, useState } from 'react';
import useSuperAdminStore from '@/store/superAdminStore';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import LoadingAnimation from '@/components/common/Loading';

export default function VerifyClinicsPage() {
    const [clinics, setClinics] = useState([]);
    const [loading, setLoading] = useState(true);
    const { getUnverifiedClinics, verifyClinic } = useSuperAdminStore();

    const fetchClinics = async () => {
        try {
            const response = await getUnverifiedClinics();
            setClinics(response.clinics || []);
        } finally {
            setLoading(false);
        }
    };

    const handleVerify = async (clinicId) => {
        try {
            await verifyClinic(clinicId);
            // Refresh the list after verification
            fetchClinics();
        } catch (error) {
            console.error('Error verifying clinic:', error);
        }
    };

    useEffect(() => {
        fetchClinics();
    }, []);

    if (loading) {
        return (
            <LoadingAnimation />
        );
    }

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">Verify Clinics</h1>

            {clinics.length === 0 ? (
                <div className="text-center text-gray-500 mt-8">
                    No unverified clinics found
                </div>
            ) : (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {clinics.map((clinic) => (
                        <Card key={clinic._id} className="shadow-lg">
                            <CardHeader>
                                <CardTitle className="text-lg">
                                    {clinic.clinicName}
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-2">
                                    <p>
                                        <span className="font-semibold">Email:</span>{' '}
                                        {clinic.email}
                                    </p>
                                    <p>
                                        <span className="font-semibold">Phone:</span>{' '}
                                        {clinic.phoneNumber}
                                    </p>
                                    <p>
                                        <span className="font-semibold">City:</span>{' '}
                                        {clinic.city}
                                    </p>
                                    <div className="pt-4">
                                        <Button
                                            onClick={() => handleVerify(clinic._id)}
                                            className="w-full bg-green-600 hover:bg-green-700"
                                        >
                                            Verify Clinic
                                        </Button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
}
