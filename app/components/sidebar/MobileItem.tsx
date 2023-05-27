import Link from 'next/link';
import React from 'react'

interface MobileItemProps {
    href: string;
    icon: any;
    active?: boolean;
    onClick?: () => void;
}


const MobileItem: React.FC<MobileItemProps> = ({
    href,
    icon: Icon,
    active,
    onClick
}) => {

    const handleClick = () => {
        if (onClick) {
            return onClick();
        }
    };

    return (
        <Link
            onClick={onClick}
            href={href}
            className={`group flex justify-center p-4 gap-x-3 leading-6 font-semibold w-full text-gray-500 hover:text-gray-800 hover:bg-gray-100 ${active && 'bg-gray-100 text-gray-800'}`}
        >
            <Icon className='w-5 h-5' />
        </Link>
    )
}

export default MobileItem
