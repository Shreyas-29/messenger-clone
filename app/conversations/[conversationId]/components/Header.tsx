'use client';

import React, { useMemo, useState } from 'react';
import { Conversation, User } from '@prisma/client';
import useOtherUser from '@/app/hooks/useOtherUser';
import { useRouter } from 'next/navigation';
import { IoChevronBack, IoSearchOutline, IoVideocamOutline } from 'react-icons/io5';
import { IoIosMore } from 'react-icons/io';
import { Avatar, AvatarGroup } from '@/app/components';
import ProfileDrawer from './ProfileDrawer';
import useActiveList from '@/app/hooks/useActiveList';
import { FullMessageType } from '@/app/types';


interface HeaderProps {
    conversation: Conversation & {
        users: User[];
    };
    messages: FullMessageType[];
}

const Header: React.FC<HeaderProps> = ({
    conversation,
    messages
}) => {

    const router = useRouter();
    const otherUser: User = useOtherUser(conversation);

    const { members } = useActiveList();
    const isActive = members.indexOf(otherUser?.email!) !== -1;

    const [drawerOpen, setDrawerOpen] = useState(false);

    const statusText = useMemo(() => {
        if (conversation?.isGroup) {
            return `${conversation?.users?.length} members`;
        }
        return isActive ? 'Online' : 'Offline';
    }, [conversation]);

    return (
        <div>
            <ProfileDrawer
                data={conversation}
                messages={messages}
                isOpen={drawerOpen}
                onClose={() => setDrawerOpen(false)}
            />
            <div className='bg-white w-full flex border-b sm:px-4 px-4 py-3 lg:px-6 justify-between items-center shadow-sm'>
                <div className='flex gap-3 items-center'>
                    <div onClick={() => router.push('/conversations')} className='lg:hidden text-blue-500 hover:text-blue-700 transition cursor-pointer w-10 h-10 rounded-full hover:bg-slate-100 flex items-center justify-center'>
                        <IoChevronBack className='w-6 h-6' />
                    </div>
                    <div onClick={() => setDrawerOpen(true)} className='flex items-center justify-start cursor-pointer gap-3'>
                        {conversation.isGroup ? (
                            <AvatarGroup users={conversation?.users} />
                        ) : (
                            <Avatar user={otherUser} />
                        )}
                        <div className='flex flex-col'>
                            <div className='capitalize font-medium'>
                                {conversation.name || otherUser.name}
                            </div>
                            <div className='text-sm text-gray-500'>
                                {statusText}
                            </div>
                        </div>
                    </div>
                </div>
                <div className='flex items-center justify-end gap-2 md:gap-4'>
                    <div className='text-blue-500 hover:text-blue-700 transition cursor-pointer w-10 h-10 rounded-full hover:bg-slate-100 flex items-center justify-center'>
                        <IoVideocamOutline className='w-5 h-5' />
                    </div>
                    <div className='text-blue-500 hover:text-blue-700 transition cursor-pointer w-10 h-10 rounded-full hover:bg-slate-100 flex items-center justify-center'>
                        <IoSearchOutline className='w-5 h-5' />
                    </div>
                    <div onClick={() => setDrawerOpen(true)} className='text-blue-500 hover:text-blue-700 transition cursor-pointer w-10 h-10 rounded-full hover:bg-slate-100 flex items-center justify-center'>
                        <IoIosMore className='w-5 h-5' />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header
