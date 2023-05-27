'use client';

import React, { useState } from 'react';
import { FullMessageType } from '@/app/types';
import { useSession } from 'next-auth/react';
import clsx from 'clsx';
import { Avatar } from '@/app/components';
import { format } from 'date-fns';
import Image from 'next/image';
import { BsCheckAll } from 'react-icons/bs';
import ImageMoal from './ImageModal';


interface MessageBoxProps {
    data: FullMessageType;
    isLast?: boolean;
}

const MessageBox: React.FC<MessageBoxProps> = ({
    data,
    isLast
}) => {

    const [imageModalOpen, setImageModalOpen] = useState(false);

    const session = useSession();

    const isOwn = session?.data?.user?.email === data?.sender?.email;

    const seenList = (data.seen || [])
        .filter((user) => user?.email !== data?.sender?.email)
        .map((user) => user?.name)
        .join(', ');

    // console.log(isLast);

    const container = clsx('flex gap-3 p-4 select-none', isOwn && 'justify-end');
    const avatar = clsx(isOwn && 'order-2');
    const body = clsx('flex flex-col gap-1', isOwn && 'items-end');
    const message = clsx(
        'text-sm w-fit overflow-hidden px-4 py-2.5',
        isOwn ? 'bg-gradient-to-r from-sky-400 to-blue-500 text-white rounded-b-xl rounded-tl-xl' : 'bg-gray-100 rounded-b-xl rounded-tr-xl text-gray-800',
        data.image ? 'rounded-md p-0' : 'py-2 px-3'
    );



    return (
        // <div className={container}>
        //     <div className={avatar}>
        //         <Avatar user={data?.sender} />
        //     </div>
        //     <div className={body}>
        //         <div className='flex items-center gap-1'>
        //             <div className='text-sm text-gray-500'>
        //                 {data.sender.name}
        //             </div>
        //             <div className='text-xs text-gray-400'>
        //                 {format(new Date(data.createdAt), 'p')}
        //             </div>
        //         </div>
        //         <div className={message}>
        //             {data?.image ? (
        //                 <Image
        //                     src={data.image}
        //                     alt='Image'
        //                     width={1000}
        //                     height={1000}
        //                     className='w-72 h-72 cursor-pointer object-cover hover:scale-105 transition ease-in-out'
        //                 />
        //             ) : (
        //                 <div>
        //                     {data.body}
        //                 </div>
        //             )}
        //         </div>
        //         {isLast && isOwn && seenList.length > 0 && (
        //             <div className='text-xs text-gray-500'>
        //                 {`Seen by ${seenList}`}
        //             </div>
        //         )}
        //     </div>
        // </div>
        <div className={container}>
            <div className={body}>
                <div className={message}>
                    <ImageMoal
                        src={data.image}
                        isOpen={imageModalOpen}
                        onClose={() => setImageModalOpen(false)}
                    />
                    {data?.image ? (
                        <Image
                            src={data.image}
                            alt='Image'
                            onClick={() => setImageModalOpen(true)}
                            width={1000}
                            height={1000}
                            className='w-72 h-72 cursor-pointer object-cover hover:scale-105 transition ease-in-out rounded-md'
                        />
                    ) : (
                        <div>
                            {data.body}
                        </div>
                    )}
                </div>
                <div className={`flex gap-2`}>
                    <div className='text-xs text-gray-400'>
                        {format(new Date(data.createdAt), 'p')}
                    </div>
                    {isOwn && seenList.length > 0 && (
                        <div className={`text-xs text-blue-500`}>
                            <BsCheckAll className='w-4 h-4 text-current' />
                        </div>
                    )}
                </div>
                {isLast && isOwn && seenList.length > 0 && (
                    <div className='text-xs text-gray-500'>
                        {`Seen by ${seenList}`}
                    </div>
                )}
            </div>
        </div>
    )
}

export default MessageBox
