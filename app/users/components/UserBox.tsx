'use client';

import { Avatar, LoadingModal } from '@/app/components';
import { User } from '@prisma/client'
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useCallback, useState } from 'react'


interface UserBoxProps {
    data: User;
}

const UserBox: React.FC<UserBoxProps> = ({
    data
}) => {

    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const handleClick = useCallback(() => {
        setIsLoading(true);

        axios.post('/api/conversations', { userId: data.id })
            .then((data) => {
                router.push(`/conversations/${data.data.id}`);
            })
            .finally(() => setIsLoading(false));
    }, [data, router]);


    return (
        <div>
            {isLoading && (
                <LoadingModal />
            )}
            <div
                onClick={handleClick}
                className='w-full relative flex items-center space-x-3 bg-white px-3 py-2 hover:bg-gray-100 rounded-lg transition ease-out cursor-pointer'
            >
                <Avatar user={data!} />
                <div className='min-w-0 flex-1'>
                    <div className='focus:outline-none'>
                        <div className='flex items-center justify-between mb-1'>
                            <p className='font-medium text-gray-900'>
                                {data?.name}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserBox
