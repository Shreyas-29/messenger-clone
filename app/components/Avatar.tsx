'use client';

import { User } from '@prisma/client';
import Image from 'next/image';
import React from 'react'
import useActiveList from '../hooks/useActiveList';


interface AvatarProps {
    user: User;
}

const Avatar: React.FC<AvatarProps> = ({ user }) => {
    // console.log(user?.image)

    const { members } = useActiveList();
    const isActive = members.indexOf(user?.email!) !== -1;

    return (
        <div className='relative'>
            <div className='relative inline-block rounded-full overflow-hidden w-9 h-9'>
                <Image
                    src={user?.image! || '/images/user.png'}
                    alt='User'
                    width={500}
                    height={500}
                    className='w-full h-full object-cover'
                />
            </div>
            {isActive && (
                <span className='absolute inline-block rounded-full bg-green-500 top-0 right-0 h-2 w-2 md:h-2.5 md:w-2.5 ring-2 ring-white' />
            )}
        </div>
    )
}

export default Avatar
