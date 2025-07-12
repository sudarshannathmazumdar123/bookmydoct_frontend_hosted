'use client';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Hospital, ArrowLeft, Eye, EyeOff } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import useAuthStore from '@/store/authStore';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

export default function ClinicSignUp() {
	const { signup, isLoading } = useAuthStore();
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		phoneNumber: '',
		addressOne: '',
		addressTwo: '',
		city: '',
		state: '',
		pincode: '',
		adminName: '',
		adminEmail: '',
		password: '',
		confirmPassword: '',
		lattitude: '',
		longitude: '',
	});

	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);
	const router = useRouter();

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	useEffect(() => {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition((position) => {
				const { latitude, longitude } = position.coords;
				setFormData((prev) => ({
					...prev,
					lattitude: latitude,
					longitude: longitude,
				}));
			});
		} else {
			console.error('Geolocation is not supported by this browser.');
		}
	}, []);

	const handleSubmit = async (e) => {
		//ask for location

		e.preventDefault();
		const userdata = {
			name: formData.name,
			phoneNumber: formData.phoneNumber,
			email: formData.email,
			addressOne: formData.addressOne,
			addressTwo: formData.addressTwo,
			city: formData.city,
			state: formData.state,
			pincode: formData.pincode,
			password: formData.password,
			userName: formData.adminName,
			userEmail: formData.adminEmail,
			lattitude: formData.lattitude,
			longitude: formData.longitude,
		};

		try {
			await signup(userdata, 'clinic');
			router.replace('/signin/clinic');
		} catch (error) {}
	};

	const togglePassword = () => {
		setShowPassword(!showPassword);
	};

	const toggleConfirmPassword = () => {
		setShowConfirmPassword(!showConfirmPassword);
	};

	return (
		<div className='min-h-screen flex items-center justify-center p-4'>
			<div className='p-8 max-w-6xl w-full grid md:grid-cols-2 gap-8'>
				<div className='space-y-6'>
					<div className='flex items-center'>
						<h1 className='text-2xl md:text-3xl font-bold'>
							Clinic/Hospital SignUp
						</h1>
					</div>

					<form
						onSubmit={handleSubmit}
						className='space-y-4 grid grid-cols-1 md:grid-cols-2 gap-4'
					>
						<div className='space-y-2 md:col-span-2'>
							<Label htmlFor='name'>Clinic Name</Label>
							<Input
								id='name'
								name='name'
								value={formData.name}
								onChange={handleInputChange}
								required
								className='rounded-2xl p-2'
								placeholder='Enter your clinic name'
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

						<div className='space-y-2 md:col-span-2'>
							<Label htmlFor='address'>Address Line 1</Label>
							<Input
								id='addressOne'
								name='addressOne'
								value={formData.addressOne}
								onChange={handleInputChange}
								required
								className='rounded-2xl p-2'
								placeholder='Enter your clinic address'
							/>
						</div>
						<div className='space-y-2 '>
							<Label htmlFor='address'>Address Line 2 <span className='text-sm text-gray-500'>(optional)</span></Label>
							<Input
								id='addressTwo'
								name='addressTwo'
								value={formData.addressTwo}
								onChange={handleInputChange}
								className='rounded-2xl p-2'
								placeholder='Enter your clinic address'
							/>
						</div>

						<div className='space-y-2'>
							<Label htmlFor='city'>City</Label>
							<Input
							id='city'
							name='city'
							value={formData.city}
							onChange={handleInputChange}
							required
							className='rounded-2xl p-2'
							placeholder='Enter your city'
							/>
						</div>
						<div className='space-y-2'>
							<Label htmlFor='city'>State:</Label>
							<Input
							id='state'
							name='state'
							value={formData.state}
							onChange={handleInputChange}
							required
							className='rounded-2xl p-2'
							placeholder='Enter your state'
							/>
						</div>
						<div className='space-y-2'>
							<Label htmlFor='city'>Pincode:</Label>
							<Input
							id='pincode'
							name='pincode'
							value={formData.pincode}
							onChange={handleInputChange}
							required
							className='rounded-2xl p-2'
							placeholder='Enter your state'
							/>
						</div>


						<div className='space-y-2'>
							<Label htmlFor='adminName'>Admin Name</Label>
							<Input
								id='adminName'
								name='adminName'
								value={formData.adminName}
								onChange={handleInputChange}
								required
								className='rounded-2xl p-2'
								placeholder='Enter admin name'
							/>
						</div>

						<div className='space-y-2 '>
							<Label htmlFor='adminEmail'>Admin Email:</Label>
							<Input
								id='adminEmail'
								name='adminEmail'
								value={formData.adminEmail}
								onChange={handleInputChange}
								required
								className='rounded-2xl p-2'
								placeholder='Enter Admin Email'
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

						<Button
							type='submit'
							className='w-full rounded-2xl md:col-span-2'
							disabled={isLoading}
						>
							{isLoading ? 'Processing...' : 'Sign Up'}
						</Button>
					</form>

					<div className='text-center md:col-span-2'>
						Already have an account?{' '}
						<Link href='/signin/clinic' className=' text-primary hover:underline'>
							Sign in
						</Link>
					</div>
				</div>

				{/* Right side image section remains the same */}
				<div className='hidden md:block relative rounded-xl overflow-hidden'>
					<Image
						src='/plc2.png'
						alt='Medical illustration'
						layout='fill'
						objectFit='cover'
					/>
					{/* <div className='absolute inset-0 bg-gradient-to-br from-blue-500/50 to-indigo-500/50 flex items-center justify-center' /> */}
				</div>
			</div>
		</div>
	);
}
