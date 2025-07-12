'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {  EyeIcon, EyeOffIcon } from 'lucide-react';
import Link from 'next/link';
import useAuthStore from '@/store/authStore';
import toast from 'react-hot-toast';
import { useRouter, usePathname } from 'next/navigation';
import Image from 'next/image';

export default function SignIn({role}) {
	const router = useRouter();
	const {user} = useAuthStore();
	const [showPassword, setShowPassword] = useState(false);
	const { login, isLoading } = useAuthStore();
	const [formData, setFormData] = useState({
		email: '',
		password: '',
		rememberMe: false,
	});

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!formData.email || !formData.password) {
			toast.error('Please fill in all fields');
			return;
		}

		try {
			await login({ email: formData.email, password: formData.password }, role);

			if (role === 'clinic') {
				router.replace('/admin/doctors');
			} else if (role === 'admin'){
				
				router.push('/superAdmin');
			}else if (role === 'user') {
				router.replace('/');
			}
		} catch (error) {
			console.log(error);
		}
	};


	const handleForgetpassword = async () => {
		router.push(`/signin/forgot-password?role=${role}`);
	};

	return (
		<div className='m-10 min-h-screen justify-center items-center flex'>
			<div className='flex items-center w-full lg:w-[50%]  justify-center p-8'>
				<div className='max-w-md w-full space-y-8'>
					<div className='flex flex-col'>
						<h1 className='text-3xl font-bold mb-3'>Welcome Back to BookMyDoct</h1>
						<h1 className='text-xl font-bold'>Sign in as {role}</h1>
					</div>
					<form onSubmit={handleSubmit} className='space-y-6'>
						<div className='space-y-2'>
							<Label htmlFor='email'>Email</Label>
							<Input
								id='email'
								type='email'
								placeholder='example.email@gmail.com'
								value={formData.email}
								onChange={(e) => setFormData({ ...formData, email: e.target.value })}
								required
								className='rounded-2xl p-2'
							/>
						</div>
						<div className='space-y-2'>
							<Label htmlFor='password'>Password</Label>
							<div className='relative'>
								<Input
									id='password'
									type={showPassword ? 'text' : 'password'}
									placeholder='Enter at least 8+ characters'
									value={formData.password}
									onChange={(e) =>
										setFormData({ ...formData, password: e.target.value })
									}
									required
									className='rounded-2xl p-2'
								/>
								<button
									type='button'
									onClick={() => setShowPassword(!showPassword)}
									className='absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700'
								>
									{showPassword ? (
										<EyeOffIcon className='h-4 w-4' />
									) : (
										<EyeIcon className='h-4 w-4' />
									)}
								</button>
							</div>
						</div>
						<div className='flex w-full items-center justify-end'>
							<div
								onClick={handleForgetpassword}
								className='text-sm text-primary hover:underline'
							>
								Forgot password?
							</div>
						</div>
						<Button
							type='submit'
							className='w-full rounded-2xl bg-primary hover:opacity-80'
							disabled={isLoading}
						>
							{isLoading ? 'Processing..' : 'Sign in'}
						</Button>
					</form>
					{role !== 'admin' && <div className='text-center'>
						Don't have an account?{' '}
						<Link href={`/signup/${role}`} className='text-primary hover:underline'>
							Sign Up
						</Link>
					</div>}
				</div>
			</div>
			<div className='hidden md:block w-[50%] p-8 h-full '>
				<Image
				src={'/singinPatient.jpg'}
				width={1000}
				height={1000}
				alt='Sigin page for patient'
				className='h-full rounded-lg'
				/>
				
			</div>
		</div>
	);
}
