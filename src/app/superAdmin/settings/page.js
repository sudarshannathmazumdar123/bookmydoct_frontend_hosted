"use client";

import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Eye, EyeOff } from "lucide-react";
import toast from 'react-hot-toast';
import useAuthStore from '@/store/authStore';

const ChangePassword = () => {
    const [formData, setFormData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });

    const [errors, setErrors] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });

    const { changePassword } = useAuthStore();


    const [showPasswords, setShowPasswords] = useState({
        current: false,
        new: false,
        confirm: false
    });

    const [isSubmitting, setIsSubmitting] = useState(false);

    const validateForm = () => {
        let tempErrors = {};
        let isValid = true;

        // Current password validation
        if (!formData.currentPassword) {
            tempErrors.currentPassword = 'Current password is required';
            isValid = false;
        }

        // New password validation
        if (!formData.newPassword) {
            tempErrors.newPassword = 'New password is required';
            isValid = false;
        } else if (formData.newPassword.length < 8) {
            tempErrors.newPassword = 'Password must be at least 8 characters long';
            isValid = false;
        } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.newPassword)) {
            tempErrors.newPassword = 'Password must contain uppercase, lowercase and numbers';
            isValid = false;
        }

        // Confirm password validation
        if (!formData.confirmPassword) {
            tempErrors.confirmPassword = 'Please confirm your password';
            isValid = false;
        } else if (formData.newPassword !== formData.confirmPassword) {
            tempErrors.confirmPassword = 'Passwords do not match';
            isValid = false;
        }

        setErrors(tempErrors);
        return isValid;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        setIsSubmitting(true);
        try {

            await changePassword(formData.currentPassword, formData.newPassword, "admin");

            setFormData({
                currentPassword: '',
                newPassword: '',
                confirmPassword: ''
            });

        } catch (error) {
            setErrors(prev => ({
                ...prev,
                currentPassword: 'Failed to change password. Please try again.'
            }));
        } finally {
            setIsSubmitting(false);
        }
    };

    const togglePasswordVisibility = (field) => {
        setShowPasswords(prev => ({
            ...prev,
            [field]: !prev[field]
        }));
    };

    return (
        <Card className="w-full max-w-md mx-auto">
            <CardHeader>
                <CardTitle className="text-2xl">Change Password</CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="currentPassword">Current Password</Label>
                        <div className="relative">
                            <Input
                                id="currentPassword"
                                name="currentPassword"
                                type={showPasswords.current ? 'text' : 'password'}
                                value={formData.currentPassword}
                                onChange={handleChange}
                                className={errors.currentPassword ? 'border-red-500' : ''}
                            />
                            <button
                                type="button"
                                onClick={() => togglePasswordVisibility('current')}
                                className="absolute right-3 top-1/2 -translate-y-1/2"
                            >
                                {showPasswords.current ?
                                    <EyeOff className="h-4 w-4 text-gray-500" /> :
                                    <Eye className="h-4 w-4 text-gray-500" />
                                }
                            </button>
                        </div>
                        {errors.currentPassword && (
                            <p className="text-sm text-red-500">{errors.currentPassword}</p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="newPassword">New Password</Label>
                        <div className="relative">
                            <Input
                                id="newPassword"
                                name="newPassword"
                                type={showPasswords.new ? 'text' : 'password'}
                                value={formData.newPassword}
                                onChange={handleChange}
                                className={errors.newPassword ? 'border-red-500' : ''}
                            />
                            <button
                                type="button"
                                onClick={() => togglePasswordVisibility('new')}
                                className="absolute right-3 top-1/2 -translate-y-1/2"
                            >
                                {showPasswords.new ?
                                    <EyeOff className="h-4 w-4 text-gray-500" /> :
                                    <Eye className="h-4 w-4 text-gray-500" />
                                }
                            </button>
                        </div>
                        {errors.newPassword && (
                            <p className="text-sm text-red-500">{errors.newPassword}</p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="confirmPassword">Confirm New Password</Label>
                        <div className="relative">
                            <Input
                                id="confirmPassword"
                                name="confirmPassword"
                                type={showPasswords.confirm ? 'text' : 'password'}
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                className={errors.confirmPassword ? 'border-red-500' : ''}
                            />
                            <button
                                type="button"
                                onClick={() => togglePasswordVisibility('confirm')}
                                className="absolute right-3 top-1/2 -translate-y-1/2"
                            >
                                {showPasswords.confirm ?
                                    <EyeOff className="h-4 w-4 text-gray-500" /> :
                                    <Eye className="h-4 w-4 text-gray-500" />
                                }
                            </button>
                        </div>
                        {errors.confirmPassword && (
                            <p className="text-sm text-red-500">{errors.confirmPassword}</p>
                        )}
                    </div>

                    <Button
                        type="submit"
                        className="w-full"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? 'Changing Password...' : 'Change Password'}
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
};

export default ChangePassword;