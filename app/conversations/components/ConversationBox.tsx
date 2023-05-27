'use client';

import React, { useCallback, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { Conversation, Message, User } from '@prisma/client';
import { format } from 'date-fns';
import { useSession } from 'next-auth/react';
import { FullConversationType } from '@/app/types';
import useOtherUser from '@/app/hooks/useOtherUser';
import { Avatar, AvatarGroup } from '@/app/components';


interface ConversationBoxProps {
    data: FullConversationType;
    selected?: boolean;
}

const ConversationBox: React.FC<ConversationBoxProps> = ({
    data,
    selected
}) => {

    const otherUser = useOtherUser(data);
    const session = useSession();
    const router = useRouter();

    const handleClick = useCallback(() => {
        router.push(`/conversations/${data.id}`);
    }, [data, router]);

    const lastMessage = useMemo(() => {
        const messages = data.messages || [];

        return messages[messages.length - 1];
    }, [data.messages]);

    const unSeenMessageLength = () => {
        const messages = data?.messages || [];

        // here filter or map through data array & get those unseen messages[messages.length-1];

        // display the last message is send by the current user then show that last message text to "You: message" 
    };

    const userEmail = useMemo(() => session.data?.user?.email,
        [session.data?.user?.email]);

    const hasSeen = useMemo(() => {
        if (!lastMessage) {
            return false;
        }

        const seenArray = lastMessage.seen || [];

        if (!userEmail) {
            return false;
        }

        return seenArray
            .filter((user: any) => user.email === userEmail).length !== 0;
    }, [userEmail, lastMessage]);

    const lastMessageText = useMemo(() => {
        if (lastMessage?.image) {
            return 'Sent an image';
        }

        if (lastMessage?.body) {
            return lastMessage.body;
        }

        return 'Started a conversation';
    }, [lastMessage]);

    // console.log('lastMessage', lastMessage)


    return (
        <div
            onClick={handleClick}
            className={`w-full select-none relative flex items-center space-x-3 px-3 py-2 hover:bg-gray-100 rounded-lg transition cursor-pointer ${selected ? 'bg-gray-100 hover:bg-gray-200' : 'bg-white'}`}
        >
            {data.isGroup ? (
                <AvatarGroup users={data?.users} />
            ) : (
                <Avatar user={otherUser} />
            )}
            <div className='min-w-0 flex-1'>
                <div className='focus:outline-none flex flex-col items-start'>
                    <div className='flex items-center justify-between w-full'>
                        <p className='font-medium capitalize text-gray-900'>
                            {data.name || otherUser?.name}
                        </p>
                        {lastMessage?.createdAt && (
                            <p className="text-xs text-gray-400">
                                {format(new Date(lastMessage.createdAt), 'p')}
                            </p>
                        )}
                    </div>
                    <div className='flex items-center justify-start w-full'>
                        <p className={`truncate text-xs ${hasSeen ? 'text-gray-500' : 'text-gray-800 font-medium'}`}>
                            {lastMessageText}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ConversationBox
