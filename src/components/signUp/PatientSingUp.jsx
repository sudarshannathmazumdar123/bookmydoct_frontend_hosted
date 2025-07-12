'use client';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeft, User, Eye, EyeOff } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import toast from 'react-hot-toast';
import useAuthStore from '@/store/authStore';
import { useRouter } from 'next/navigation';

export default function PatientSignUp() {
	const { signup, isLoading } = useAuthStore();
	const router = useRouter();
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		phoneNumber: '',
		address: '',
		password: '',
		confirmPassword: '',
	});

	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);
	const togglePassword = () => {
		setShowPassword(!showPassword);
	};

	const toggleConfirmPassword = () => {
		setShowConfirmPassword(!showConfirmPassword);
	};

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (formData.password !== formData.confirmPassword) {
			toast.error('Passwords do not match');
			return;
		}

		const userdata = {
			fullName: formData.name,
			phoneNumber: formData.phoneNumber,
			email: formData.email,
			address: formData.address,
			password: formData.password,
		};

		try {
			await signup(userdata, 'user');

			router.replace('/');
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className='min-h-screen flex items-center justify-center p-4'>
			<div className=' p-8 max-w-6xl w-full grid md:grid-cols-2 gap-8'>
				<div className='space-y-6 max-w-sm'>
					<div className='flex items-center'>
						<h1 className='text-2xl md:text-3xl font-bold'>Patient SignUp</h1>
					</div>
					<form onSubmit={handleSubmit} className='space-y-4'>
						<div className='space-y-2'>
							<Label htmlFor='name'>Full Name</Label>
							<Input
								id='name'
								name='name'
								value={formData.name}
								onChange={handleInputChange}
								required
								className='rounded-2xl p-2'
								placeholder='Enter your Full name'
							/>
						</div>
						<div className='space-y-2'>
							<Label htmlFor='email'>Email</Label>
							<Input
								id='email'
								name='email'
								type='email'
								value={formData.email}
								onChange={handleInputChange}
								required
								className='rounded-2xl p-2'
								placeholder='example.email@gmail.com'
							/>
						</div>
						<div className='space-y-2'>
							<Label htmlFor='phoneNumber'>Phone Number</Label>
							<Input
								id='phoneNumber'
								name='phoneNumber'
								type='tel'
								value={formData.phoneNumber}
								onChange={handleInputChange}
								required
								className='rounded-2xl p-2'
								placeholder='+912545454545'
							/>
						</div>
						<div className='space-y-2'>
							<Label htmlFor='address'>Address</Label>
							<Input
								id='address'
								name='address'
								value={formData.address}
								onChange={handleInputChange}
								required
								className='rounded-2xl p-2'
								placeholder='Enter your address'
							/>
						</div>
						<div className='space-y-2'>
							<Label htmlFor='password'>Password</Label>
							<div className='relative'>
								<Input
									id='password'
									name='password'
									type={showPassword ? 'text' : 'password'}
									value={formData.password}
									onChange={handleInputChange}
									required
									className='rounded-2xl p-2 pr-10'
									placeholder='Enter at least 8+ characters'
								/>
								<button
									type='button'
									onClick={togglePassword}
									className='absolute right-3 top-1/2 -translate-y-1/2'
								>
									{showPassword ? (
										<EyeOff className='h-5 w-5 text-gray-500' />
									) : (
										<Eye className='h-5 w-5 text-gray-500' />
									)}
								</button>
							</div>
						</div>
						<div className='space-y-2'>
							<Label htmlFor='confirmPassword'>Confirm Password</Label>
							<div className='relative'>
								<Input
									id='confirmPassword'
									name='confirmPassword'
									type={showConfirmPassword ? 'text' : 'password'}
									value={formData.confirmPassword}
									onChange={handleInputChange}
									required
									className='rounded-2xl p-2 pr-10'
									placeholder='Confirm your password'
								/>
								<button
									type='button'
									onClick={toggleConfirmPassword}
									className='absolute right-3 top-1/2 -translate-y-1/2'
								>
									{showConfirmPassword ? (
										<EyeOff className='h-5 w-5 text-gray-500' />
									) : (
										<Eye className='h-5 w-5 text-gray-500' />
									)}
								</button>
							</div>
						</div>
						<Button type='submit' className='w-full rounded-2xl' disabled={isLoading}>
							{isLoading ? 'Processing...' : 'Sign up'}
						</Button>
					</form>
					<div className='text-center'>
						Already have an account?{' '}
						<Link href='/signin/patient' className=' text-primary hover:underline'>
							Sign in
						</Link>
					</div>
				</div>
				<div className='hidden md:block relative rounded-xl overflow-hidden'>
					<Image
						src='/plc1.png'
						alt='Medical illustration'
						layout='fill'
						objectFit='cover'
					/>
					{/* <div className='absolute inset-0 bg-gradient-to-br from-green-500/50 to-teal-500/50' /> */}
				</div>
			</div>
		</div>
	);
}
