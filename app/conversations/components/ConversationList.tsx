'use client';

import useConversation from '@/app/hooks/useConversation';
import { FullConversationType } from '@/app/types';
import { useRouter } from 'next/navigation';
import React, { useEffect, useMemo, useState } from 'react'
import { IoPeople } from 'react-icons/io5';
import ConversationBox from './ConversationBox';
import GroupChatModal from './GroupChatModal';
import { User } from '@prisma/client';
import { useSession } from 'next-auth/react';
import { pusherClient } from '@/app/libs/pusher';
import { find } from 'lodash';


interface ConversationListProps {
    initialItems: FullConversationType[];
    users: User[];
}

const ConversationList: React.FC<ConversationListProps> = ({
    initialItems,
    users
}) => {

    const session = useSession();

    const [items, setItems] = useState(initialItems);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const router = useRouter();

    const { conversationId, isOpen } = useConversation();

    const pusherKey = useMemo(() => {
        return session?.data?.user?.email;
    }, [session?.data?.user?.email]);

    useEffect(() => {
        if (!pusherKey) {
            return;
        }

        pusherClient.subscribe(pusherKey);

        const updateHandler = (conversation: FullConversationType) => {
            setItems((current) => current.map((currentConversation) => {
                if (currentConversation.id === conversation.id) {
                    return {
                        ...currentConversation,
                        messages: conversation.messages
                    };
                }

                return currentConversation;
            }));
        }

        const newHandler = (conversation: FullConversationType) => {
            setItems((current) => {
                if (find(current, { id: conversation.id })) {
                    return current;
                }

                return [conversation, ...current]
            });
        }

        const removeHandler = (conversation: FullConversationType) => {
            setItems((current) => {
                return [...current.filter((convo) => convo.id !== conversation.id)]
            });
        }

        pusherClient.bind('conversation:update', updateHandler)
        pusherClient.bind('conversation:new', newHandler)
        pusherClient.bind('conversation:remove', removeHandler)
    }, [pusherKey, router]);

    return (
        <>
            <GroupChatModal
                users={users}
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
            <aside className={`fixed inset-y-0 pb-20 lg:pb-0 lg:left-20 lg:w-80 lg:block overflow-y-auto border border-gray-200 ${isOpen ? 'hidden' : 'block w-full left-0'}`}>
                <div className='px-5'>
                    <div className='flex justify-between w-full mb-4 pt-4'>
                        <div className='text-2xl font-bold text-neutral-800'>
                            Chats
                        </div>
                        <div
                            title='New Chat'
                            onClick={() => setIsModalOpen(true)}
                            className='rounded-full p-2 bg-gray-100 text-gray-600 cursor-pointer hover:opacity-75 transition ease-out'>
                            <IoPeople className='w-5 h-5 text-current' />
                        </div>
                    </div>
                    <div className='space-y-2'>
                        {items?.map((item) => (
                            <ConversationBox
                                key={item.id}
                                data={item}
                                selected={conversationId === item.id}
                            />
                        ))}
                    </div>
                </div>
            </aside>
        </>
    )
}

export default ConversationList
