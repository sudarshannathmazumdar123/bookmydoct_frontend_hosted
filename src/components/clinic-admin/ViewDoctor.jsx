'use client';
import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
} from '@/components/ui/sheet';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import useAuthStore from '@/store/authStore';

export default function ViewDoctor({ isDrawerOpen, setIsDrawerOpen, doctor }) {
	const { user } = useAuthStore();

	return (
		<Sheet open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
			<SheetContent className='w-[600px] sm:min-w-[550px]'>
				<SheetHeader className='flex items-center justify-center'>
					<SheetTitle>{doctor?.fullName}</SheetTitle>
				</SheetHeader>
				<ScrollArea className='h-[calc(100vh-80px)] pr-4 '>
					<div className='space-y-4 py-4 px-3'>
						<div className='space-y-2'>
							<Label htmlFor='registrationNumber'>Registration Number</Label>
							<p className='bg-muted rounded-xl p-2'>{doctor?.registrationNumber}</p>
						</div>
						<div className='space-y-2'>
							<Label htmlFor='fullName'>Full Name</Label>
							<p className='bg-muted rounded-xl p-2'>{doctor?.fullName}</p>
						</div>
						<div className='space-y-2'>
							<Label htmlFor='phone'>Phone Number</Label>
							<p className='bg-muted rounded-xl p-2'>{doctor?.phoneNumber}</p>
						</div>
						<div className='space-y-2'>
							<Label htmlFor='email'>Email</Label>
							<p className='bg-muted rounded-xl p-2'>{doctor?.email}</p>
						</div>

						<div className='space-y-2'>
							<Label htmlFor='specialization'>Specialization</Label>
							<p className='bg-muted rounded-xl p-2'>{doctor?.specialization}</p>
						</div>
						<div className='space-y-2'>
							<Label htmlFor='specialization'>Qualification</Label>
							<p className='bg-muted rounded-xl p-2'>{doctor?.medicalDegree}</p>
						</div>
						<div className='space-y-2'>
							<Label htmlFor='specialization'>Experience</Label>
							<p className='bg-muted rounded-xl p-2'>{doctor?.experience}</p>
						</div>
						<div className='space-y-2'>
							<Label htmlFor='fees'>Fees</Label>
							<p className='bg-muted rounded-xl p-2'>
								{doctor?.fees?.find((fee) => fee.clinicId === user?.clinicId)?.fee}
							</p>
						</div>

						<div className='space-y-4'>
							<div className='flex items-center justify-between gap-2'>
								<Label className='text-primary text-lg'>Schedule</Label>
							</div>
							<div className='space-y-4'>
								<div className='flex items-center justify-between gap-2'>
									<Label>Day</Label>
									<Label> From</Label>
									<Label> To</Label>
									<Label>Max. Tokens</Label>
								</div>
								{doctor?.appointmentsSchedule.find(
									(clinic) => clinic.clinicId === user.clinicId
								).schedule.length === 0 ? (
									<p className='text-center'>No schedule added</p>
								) : (
									doctor?.appointmentsSchedule
										.find((clinic) => clinic.clinicId === user.clinicId)
										.schedule.map((day) => (
											<div
												key={day?._id}
												className='flex items-center justify-between gap-2'
											>
												<p>{day?.day}</p>

												<p className='bg-muted rounded-xl p-2'>{day?.startTime}</p>
												<span>→</span>
												<p className='bg-muted rounded-xl p-2'>{day?.endTime}</p>
												<p>{day?.maxSlots}</p>
											</div>
										))
								)}
							</div>
						</div>
					</div>
				</ScrollArea>
			</SheetContent>
		</Sheet>
	);
}
