import { Bell, Menu, User } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

const Header = ({ open, setOpen }) => {
    return (
        <header className="bg-white flex justify-between items-center shadow-md">
            <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
                <Link className='flex items-center max-md:justify-center' href='/'>
                    <Image
                        src={'/logo.svg'}
                        width={100}
                        height={100}
                        alt='logo'
                        priority
                        className='w-auto h-[50px]'
                    />
                </Link>
            </div>
            <div
                className='md:hidden mr-5'
                onClick={() => {
                    setOpen(!open)
                }}
            >
                <Menu />
            </div>
        </header>
    )
}

export default Header

