import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { CalendarDays, Clock, MapPin, Phone, User } from 'lucide-react';
import useAuthStore from '@/store/authStore';
import { use } from 'react';

export default function AppointmentPopup({ appointment, onClose }) {
	const { user } = useAuthStore();
	return (
		<div className='fixed inset-0 flex items-center justify-center z-50'>
			<Card className='w-full max-w-md mx-auto'>
				<CardHeader>
					<CardTitle className='flex justify-between items-center'>
						Appointment Details
					</CardTitle>
				</CardHeader>
				<CardContent className='space-y-4'>
					<div className='flex items-center space-x-2'>
						<User className='h-5 w-5 text-gray-500' />
						<div>
							<p className='font-medium'>{appointment?.fullName}</p>
							<p className='text-sm text-gray-500'>
								{appointment?.age} years, {appointment?.gender}
							</p>
						</div>
					</div>
					<div className='flex items-center space-x-2'>
						<CalendarDays className='h-5 w-5 text-gray-500' />
						<p>{appointment?.appointmentDate}</p>
					</div>
					<div className='flex items-center space-x-2'>
						<Clock className='h-5 w-5 text-gray-500' />
						<p>
							{appointment?.appointmentTimeFrom} - {appointment?.appointmentTimeTo}
						</p>
					</div>
					<div className='flex items-center space-x-2'>
						<User className='h-5 w-5 text-gray-500' />
						<div>
							<p className='font-medium'>{appointment?.doctorName}</p>
							<p className='text-sm text-gray-500'>{appointment?.specialization}</p>
						</div>
					</div>
					<div className='flex items-center space-x-2'>
						<MapPin className='h-5 w-5 text-gray-500' />
						<div>
							<p className='font-medium'>{appointment?.clinicName}</p>
							<p className='text-sm text-gray-500'>{appointment?.clinicAddress}</p>
						</div>
					</div>
					<div className='flex items-center space-x-2'>
						<Phone className='h-5 w-5 text-gray-500' />
						<p>{appointment?.phoneNumber}</p>
					</div>
					{user?.role === 'user' && (
						<>
							<div className='mt-4'>
								<p className='font-medium'>
									Total Amount: {appointment?.totalAmount} INR
								</p>
							</div>
							<div className='mt-4'>
								<p className='font-medium'>Doctor Fees: {appointment?.doctorFee} INR</p>
							</div>
						</>
					)}
					{user?.role === 'clinic' && (
						<div className='mt-4'>
							<p className='font-medium'>
								Commision Amount: {appointment?.bookingCommission} INR
							</p>
						</div>
					)}
				</CardContent>
				<CardFooter>
					<Button onClick={onClose} className='w-full'>
						Close
					</Button>
				</CardFooter>
			</Card>
		</div>
	);
}
