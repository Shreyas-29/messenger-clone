'use client';

import React from 'react';
import Link from 'next/link';

interface DesktopItemProps {
    label: string;
    icon: any;
    href: string;
    onClick?: () => void;
    active?: boolean;
}


const DesktopItem: React.FC<DesktopItemProps> = ({
    label,
    href,
    icon: Icon,
    active,
    onClick
}) => {

    const handleClick = () => {
        if (onClick) {
            return onClick();
        }
    }

    return (
        <div onClick={handleClick} data-tooltip-id={label} id={label} className='relative group'>
            <Link href={href} className={`group flex gap-x-3 rounded-md p-3 text-sm leading-6 font-semibold group text-gray-500 ${active ? 'bg-blue-500 text-white hover:bg-blue-600 hover:text-white' : 'hover:text-gray-800 hover:bg-gray-100'}`}>
                <Icon className='h-5 w-5 shrink-0' />
                <span className='sr-only'>
                    {label}
                </span>
            </Link>
        </div>
    )
}

export default DesktopItem
