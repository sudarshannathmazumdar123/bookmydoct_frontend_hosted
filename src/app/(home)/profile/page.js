'use client'

import { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { User, Mail, Phone, MapPin, Lock, LogOut, Pencil } from 'lucide-react'
import useAuthStore from '@/store/authStore'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import '../../globals.css'

export default function UserProfile() {
    const [isEditing, setIsEditing] = useState(false)
    const [Updateduser, setUpdatedUser] = useState({
        fullName: '',
        email: '',
        phoneNumber: '',
        address: ''
    })
    const [password, setPassword] = useState({
        currentPassword: '',
        newPassword: '',
        confirmNewPassword: ''
    })
    const { user, changePassword, isLoading, updateUser } = useAuthStore();
    const router = useRouter();

    useEffect(() => {
        if (!user) {
            router.replace('/')
        } else if (!isEditing && user) {
            setUpdatedUser({
                fullName: user.fullName,
                email: user.email,
                phoneNumber: user.phoneNumber,
                address: user.address
            })
        }
    }, [user])

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setUpdatedUser(prevUser => ({ ...prevUser, [name]: value }))
    }

    const handleUpdateUser = async (e) => {
        e.preventDefault();
        if (!Updateduser.fullName || !Updateduser.email || !Updateduser.phoneNumber || !Updateduser.address) {
            toast.error('Please fill all the fields')
            return
        }
        await updateUser(Updateduser, user.role);
        router.refresh();
        setIsEditing(false)
    }

    const handleChangePassword = async (e) => {
        e.preventDefault();
        if (!password.currentPassword || !password.newPassword || !password.confirmNewPassword) {
            toast.error('Please fill all the fields')
            return
        }
        if (password.newPassword !== password.confirmNewPassword) {
            toast.error('New Password and confirm New password do not match')
            return
        }

        await changePassword(password.currentPassword, password.newPassword, user.role);
        router.push('/profile');

    }


    return (
        <div className='bg-muted min-h-[100vh] flex justify-center items-center'>
            <div className="container mx-auto p-4">
                <Card className="max-w-2xl mx-auto">
                    <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle className="text-2xl font-bold flex items-center justify-center">User Profile</CardTitle>
                        <div className="flex items-center space-x-4">
                            <Avatar className="w-10 hover:cursor-pointer " onClick={() => setIsEditing(!isEditing)}>
                                <AvatarFallback className="">
                                    <Pencil className="w-3 h-3" />
                                </AvatarFallback>
                            </Avatar>
                        </div>

                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center space-x-4 mb-6">
                            <Avatar className="w-8 h-8 md:w-16 md:h-16 ">
                                <AvatarFallback className=""><User className='w-4 h-4  md:w-8 md:h-8' /></AvatarFallback>
                            </Avatar>
                            <div>
                                <h2 className="text-xl md:text-2xl font-bold">{user?.fullName}</h2>
                                <p className="text-sm md:text-lg text-gray-500">{user?.email}</p>
                            </div>
                        </div>
                        <form>
                            <div className="space-y-4">
                                <div className="flex items-center space-x-4">
                                    <User className="text-gray-400" />
                                    <div className="flex-grow">
                                        <Label htmlFor="fullName">Full Name</Label>
                                        <Input
                                            id="fullName"
                                            name="fullName"
                                            value={Updateduser?.fullName}
                                            onChange={handleInputChange}
                                            disabled={!isEditing}
                                        />
                                    </div>
                                </div>
                                <div className="flex items-center space-x-4">
                                    <Mail className="text-gray-400" />
                                    <div className="flex-grow">
                                        <Label htmlFor="email">Email</Label>
                                        <Input
                                            id="email"
                                            name="email"
                                            type="email"
                                            value={Updateduser?.email}
                                            onChange={handleInputChange}
                                            disabled={!isEditing}
                                        />
                                    </div>
                                </div>
                                <div className="flex items-center space-x-4">
                                    <Phone className="text-gray-400" />
                                    <div className="flex-grow">
                                        <Label htmlFor="phoneNumber">Phone Number</Label>
                                        <Input
                                            id="phoneNumber"
                                            name="phoneNumber"
                                            value={Updateduser?.phoneNumber}
                                            onChange={handleInputChange}
                                            disabled={!isEditing}
                                        />
                                    </div>
                                </div>
                                <div className="flex items-center space-x-4">
                                    <MapPin className="text-gray-400" />
                                    <div className="flex-grow">
                                        <Label htmlFor="address">Address</Label>
                                        <Input
                                            id="address"
                                            name="address"
                                            value={Updateduser?.address}
                                            onChange={handleInputChange}
                                            disabled={!isEditing}
                                        />
                                    </div>
                                </div>
                            </div>

                        </form>
                    </CardContent>
                    <CardFooter className="w-full">
                        <div className={`w-full flex flex-col justify-center items-center  md:items-end gap-2`}>

                            {isEditing && (
                                <Button type="submit" onClick={handleUpdateUser} disabled={isLoading}>{isLoading ? "Processing..." : "Save Changes"}</Button>
                            )}
                            <div className="flex flex-col justify-center items-center md:flex-row max-sm:mt-4">
                                <Dialog>
                                    <DialogTrigger asChild>
                                        <Button variant="outline" className="bg-muted rounded-lg">
                                            <Lock className="w-4 h-4 mr-2" />
                                            Change Password
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent>
                                        <DialogHeader>
                                            <DialogTitle>Change Password</DialogTitle>
                                        </DialogHeader>
                                        <form className="space-y-4" onSubmit={handleChangePassword}>
                                            <div>
                                                <Label htmlFor="currentPassword">Current Password</Label>
                                                <Input id="currentPassword" type="text" value={password.currentPassword} onChange={(e) => setPassword({ ...password, currentPassword: e.target.value })} />
                                            </div>
                                            <div>
                                                <Label htmlFor="newPassword">New Password</Label>
                                                <Input id="newPassword" type="text" value={password.newPassword} onChange={(e) => setPassword({ ...password, newPassword: e.target.value })} />
                                            </div>
                                            <div>
                                                <Label htmlFor="confirmPassword">Confirm New Password</Label>
                                                <Input id="confirmPassword" type="text" value={password.confirmNewPassword} onChange={(e) => setPassword({ ...password, confirmNewPassword: e.target.value })} />
                                            </div>
                                            <Button type="submit" disabled={isLoading}>{isLoading ? "Processing..." : "Update Password"}</Button>
                                        </form>
                                    </DialogContent>
                                </Dialog>
                            </div>

                        </div>
                    </CardFooter>
                </Card>
            </div>
        </div>
    )
}