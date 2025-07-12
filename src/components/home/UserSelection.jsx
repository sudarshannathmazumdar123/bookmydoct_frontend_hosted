'use client';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Hospital, User } from 'lucide-react';
import Link from 'next/link';

export default function UserTypeSelectionSignIn({ isSignUp }) {
	const [selected, setSelected] = useState(null);

	return (
		<div className='min-h-screen bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center p-4'>
			<div className='bg-white rounded-xl shadow-2xl p-8 max-w-4xl w-full'>
				<h1 className='text-3xl font-bold text-center mb-8'>
					{isSignUp ? 'Register As' : 'Signing in as'}
				</h1>
				<div className='grid md:grid-cols-2 gap-8'>
					<button
						onClick={() => setSelected('clinic')}
						className={`p-8 rounded-lg flex flex-col items-center justify-center transition-all ${
							selected === 'clinic'
								? 'bg-blue-100 ring-2 ring-blue-500'
								: 'bg-gray-50 hover:bg-gray-100'
						}`}
					>
						<Hospital className='w-24 h-24 text-blue-600 mb-4' />
						<span className='text-xl font-semibold'>Clinic/Hospital</span>
					</button>
					<button
						onClick={() => setSelected('patient')}
						className={`p-8 rounded-lg flex flex-col items-center justify-center transition-all ${
							selected === 'patient'
								? 'bg-green-100 ring-2 ring-green-500'
								: 'bg-gray-50 hover:bg-gray-100'
						}`}
					>
						<User className='w-24 h-24 text-green-600 mb-4' />
						<span className='text-xl font-semibold'>Patient</span>
					</button>
				</div>
				<div className='mt-8 flex justify-center'>
					<Link
						href={selected ? `/${isSignUp ? 'signup' : 'signin'}/${selected}` : '#'}
						passHref
					>
						<Button disabled={!selected} size='lg' className='w-full max-w-xs'>
							Continue
						</Button>
					</Link>
				</div>
			</div>
		</div>
	);
}
