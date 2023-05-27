'use client';

import useRoutes from '@/app/hooks/useRoutes';
import React, { useState } from 'react'
import DesktopItem from './DesktopItem';
import { User } from '@prisma/client';
import Avatar from '../Avatar';
import SettingsModal from './SettingsModal';

interface DesktopSidebarProps {
    currentUser: User
}


const DesktopSidebar: React.FC<DesktopSidebarProps> = ({ currentUser }) => {

    const routes = useRoutes();

    const [isOpen, setIsOpen] = useState(false);


    // console.log({ currentUser })

    return (
        <>
            <SettingsModal
                isOpen={isOpen}
                currentUser={currentUser}
                onClose={() => setIsOpen(false)}
            />
            <div className='hidden lg:fixed lg:inset-y-0 lg:left-0 lg:z-50 lg:w-20 xl:px-6 lg:bg-white lg:border-r lg:pb-4 lg:flex lg:flex-col justify-between lg:overflow-y-auto'>
                <nav role='list' className='flex flex-col items-center space-y-2 mt-4'>
                    <div className='bg-gradient-to-r from-blue-500 to-blue-600 text-white w-10 h-10 mb-2 flex items-center justify-center rounded-lg'>
                        <h1 className='text-lg font-semibold'>H</h1>
                    </div>
                    {routes?.map((item) => (
                        <DesktopItem
                            key={item.label}
                            href={item.href}
                            label={item.label}
                            icon={item.icon}
                            active={item.active}
                            onClick={item.onClick}
                        />
                    ))}
                </nav>
                <nav className='mt-4 flex flex-col justify-between w-full items-center'>
                    <div className='cursor-pointer hover:opacity-75 transition' onClick={() => setIsOpen(true)}>
                        <Avatar user={currentUser} />
                    </div>
                </nav>
            </div>
        </>
    )
}

export default DesktopSidebar
