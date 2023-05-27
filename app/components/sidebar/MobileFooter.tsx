'use client';


import useRoutes from '@/app/hooks/useRoutes';
import React from 'react'
import MobileItem from './MobileItem';
import useConversation from '@/app/hooks/useConversation';

const MobileFooter = () => {

    const routes = useRoutes();

    const { isOpen } = useConversation();

    if (isOpen) {
        return null;
    }

    return (
        <div className='fixed justify-between w-full z-40 flex items-center bg-white border-t lg:hidden bottom-0'>
            {routes?.map((route) => (
                <MobileItem
                    key={route.href}
                    href={route.href}
                    active={route.active}
                    icon={route.icon}
                    onClick={route.onClick}
                />
            ))}
        </div>
    )
}

export default MobileFooter
