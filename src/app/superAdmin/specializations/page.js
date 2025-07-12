'use client';
import { useEffect, useState } from 'react';
import useSuperAdminStore from '@/store/superAdminStore';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Loader2, Plus, Trash2 } from 'lucide-react';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

export default function SpecializationsPage() {
    const [loading, setLoading] = useState(true);
    const [newSpecialization, setNewSpecialization] = useState('');
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const { specializations, getSpecializations, addSpecialization, deleteSpecialization } = useSuperAdminStore();

    const fetchSpecializations = async () => {
        try {
            await getSpecializations();
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSpecializations();
    }, []);

    const handleAdd = async (e) => {
        e.preventDefault();
        if (!newSpecialization.trim()) return;

        try {
            await addSpecialization({ specialization: newSpecialization.trim() });
            setNewSpecialization('');
            setIsDialogOpen(false);
        } catch (error) {
            console.error('Error adding specialization:', error);
        }
    };

    const handleDelete = async (specialization) => {
        try {
            await deleteSpecialization({ specialization });
        } catch (error) {
            console.error('Error deleting specialization:', error);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <Loader2 className="h-8 w-8 animate-spin" />
            </div>
        );
    }

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Specializations</h1>
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                        <Button className="flex items-center gap-2">
                            <Plus className="h-4 w-4" />
                            Add Specialization
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Add New Specialization</DialogTitle>
                        </DialogHeader>
                        <form onSubmit={handleAdd} className="space-y-4">
                            <Input
                                placeholder="Enter specialization name"
                                value={newSpecialization}
                                onChange={(e) => setNewSpecialization(e.target.value)}
                                className="w-full"
                            />
                            <Button type="submit" className="w-full">
                                Add Specialization
                            </Button>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {specializations?.map((specialization, idx) => (
                    <Card key={idx} className="shadow-md">
                        <CardContent className="flex justify-between items-center p-4">
                            <span className="text-lg">{specialization}</span>
                            <Button
                                variant="destructive"
                                size="icon"
                                onClick={() => handleDelete(specialization)}
                            >
                                <Trash2 className="h-4 w-4" />
                            </Button>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {specializations?.length === 0 && (
                <div className="text-center text-gray-500 mt-8">
                    No specializations found
                </div>
            )}
        </div>
    );
} 