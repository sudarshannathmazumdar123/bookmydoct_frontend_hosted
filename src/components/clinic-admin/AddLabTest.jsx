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
import {  useState } from 'react';
import { Button } from '../ui/button';
import useClinicAdminPanelStore from '@/store/clinicAdminPanelStore';


export default function AddLabTest({ isAddDrawerOpen, setIsAddDrawerOpen, handleAddDoctor}) {
	const {  isLoading } = useClinicAdminPanelStore();
    const [labTest, setLabTest] = useState({
        name: '',
        description: '',
        price: '',
    });


	const handleInputChange = (e) => {
		setLabTest({
			...labTest,
			[e.target.name]: e.target.value,
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
        try{
            await handleAddDoctor(labTest);
            setLabTest({
                name: '',
                description: '',
                price: '',
            })
        }catch(error){
            console.log(error)
        }  
	};

	return (
		<Sheet open={isAddDrawerOpen} onOpenChange={setIsAddDrawerOpen}>
			<SheetContent className='w-[600px] sm:min-w-[550px]'>
				<SheetHeader className='flex items-center justify-center'>
					<SheetTitle>Add Lab Test</SheetTitle>
				</SheetHeader>
				<ScrollArea className='h-[calc(100vh-80px)] pr-4 '>
					<form className='space-y-4 py-4 px-3'>
						<div className='space-y-2'>
							<Label htmlFor='name'>Test Name</Label>
							<Input
								id='name'
								placeholder='Enter Lab Test Name'
								name='name'
								onChange={handleInputChange}
								value={labTest?.name}
							/>
						</div>
						<div className='space-y-2'>
							<Label htmlFor='description'>Description</Label>
							<Input
								id='description'
								placeholder='Enter description'
								name='description'
								onChange={handleInputChange}
								value={labTest?.description}
							/>
						</div>
						<div className='space-y-2'>
							<Label htmlFor='price'>Price</Label>
							<Input
								id='price'
								placeholder=''
								type='number'
								name='price'
								onChange={handleInputChange}
								value={labTest?.price}
							/>
						</div>

						<div className='flex justify-end gap-2 pt-4'>
							<Button variant='outline' onClick={() => setIsAddDrawerOpen(false)}>
								Cancel
							</Button>
							<Button type='submit' onClick={handleSubmit} disabled={isLoading}>
								{isLoading ? 'Processing...' : 'Save'}
							</Button>
						</div>
					</form>
				</ScrollArea>
			</SheetContent>
		</Sheet>
	);
}
