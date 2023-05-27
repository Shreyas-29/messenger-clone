'use client';

import React, { Fragment, useMemo, useState } from 'react';
import { Conversation, User } from '@prisma/client';
import useOtherUser from '@/app/hooks/useOtherUser';
import { format } from 'date-fns';
import { Transition, Dialog, Switch } from '@headlessui/react';
import { IoCallOutline, IoChevronForwardSharp, IoClose, IoNotificationsOutline, IoTrash, IoVideocamOutline } from 'react-icons/io5';
import { AvatarGroup } from '@/app/components';
import ConfirmModal from './ConfirmModal';
import useActiveList from '@/app/hooks/useActiveList';
import Image from 'next/image';
import { FullMessageType } from '@/app/types';
import { toast } from 'react-hot-toast';
import { IoMdInformationCircleOutline } from 'react-icons/io';
import { MdBlock, MdDeleteOutline } from 'react-icons/md';
import ImageMoal from './ImageModal';


interface ProfileDrawerProps {
    isOpen: boolean;
    onClose: () => void;
    data: Conversation & {
        users: User[];
    },
    messages: FullMessageType[];

}

const ProfileDrawer: React.FC<ProfileDrawerProps> = ({
    isOpen,
    onClose,
    data,
    messages
}) => {

    const [confirmOpen, setConfirmOpen] = useState(false);
    const [enabled, setEnabled] = useState(false);
    const [imageModalOpen, setImageModalOpen] = useState(false);
    const [blocked, setBlocked] = useState(false);

    const otherUser = useOtherUser(data);

    const { members } = useActiveList();
    const isActive = members.indexOf(otherUser?.email!) !== -1;

    const joinedDate = useMemo(() => {
        return format(new Date(otherUser.createdAt), 'PP');
    }, [otherUser.createdAt]);

    const username = useMemo(() => {
        return data.name || otherUser.name;
    }, [data.name, otherUser.name]);

    const statusText = useMemo(() => {
        if (data.isGroup) {
            return `${data.users.length} members`;
        }
        return isActive ? 'Online' : 'Offline';
    }, [data])

    const aboutText = window.localStorage.getItem('about') || '';

    // console.log('aboutText', aboutText);

    return (
        <>
            <ConfirmModal
                isOpen={confirmOpen}
                onClose={() => setConfirmOpen(false)}
            />
            <Transition.Root show={isOpen} as={Fragment}>
                <Dialog as="div" className='relative z-50' onClose={onClose}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-500"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-500"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-40" />
                    </Transition.Child>

                    <div className='fixed inset-0 overflow-hidden'>
                        <div className='absolute inset-0 overflow-hidden'>
                            <div className='inset-y-0 fixed flex right-0 max-w-full pl-10'>
                                <Transition.Child
                                    as={Fragment}
                                    enter="transform transition ease-in-out duration-500"
                                    enterFrom="translate-x-full"
                                    enterTo="translate-x-0"
                                    leave="transform transition ease-in-out duration-500"
                                    leaveFrom="translate-x-0"
                                    leaveTo="translate-x-full"
                                >
                                    <Dialog.Panel className='pointer-events-auto w-screen max-w-sm'>
                                        <div className='flex h-full flex-col overscroll-y-scroll bg-white py-6 shadow-xl'>
                                            <div className='px-4 sm:px-6'>
                                                <div className='flex items-start justify-end'>
                                                    <div className='ml-3 flex h-7 items-center'>
                                                        <button
                                                            type='button'
                                                            onClick={onClose}
                                                            className='bg-white rounded-md text-gray-400 hover:text-gray-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2'>
                                                            <span className='sr-only'>
                                                                Close Panel
                                                            </span>
                                                            <IoClose className='w-5 h-5 text-current' />
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='relative mt-2 flex-1 px-8 sm:px-16'>
                                                <div className='flex flex-col items-start'>
                                                    <div className='flex items-center justify-center w-full gap-6'>
                                                        <div>
                                                            {data.isGroup ? (
                                                                <AvatarGroup users={data?.users} />
                                                            ) : (
                                                                <div className='relative'>
                                                                    <div className='relative inline-block rounded-full overflow-hidden w-16 h-16'>
                                                                        <Image
                                                                            src={otherUser.image! || '/images/user.png'}
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
                                                            )}
                                                        </div>
                                                        <div className='flex flex-col items-start'>
                                                            <div>
                                                                {username}
                                                            </div>
                                                            <div className='text-sm text-gray-500'>
                                                                {statusText}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className='flex items-center justify-center w-full gap-12 mt-6 mb-8'>
                                                        <div
                                                            onClick={() => toast((t) => (
                                                                <div className='flex items-center gap-2'>
                                                                    <IoMdInformationCircleOutline className='w-6 h-6 text-gray-500' />
                                                                    <span>Feature adding soon!</span>
                                                                </div>
                                                            ))}
                                                            className='flex flex-col items-center cursor-pointer hover:opacity-75'>
                                                            <IoCallOutline className='w-6 h-6 text-gray-700' />
                                                            <span className='text-gray-800 text-sm mt-1'>Audio</span>
                                                        </div>
                                                        <div
                                                            onClick={() => toast((t) => (
                                                                <div className='flex items-center gap-2'>
                                                                    <IoMdInformationCircleOutline className='w-6 h-6 text-gray-500' />
                                                                    <span>Feature adding soon!</span>
                                                                </div>
                                                            ))}
                                                            className='flex flex-col items-center cursor-pointer hover:opacity-75'>
                                                            <IoVideocamOutline className='w-6 h-6 text-gray-700' />
                                                            <span className='text-gray-800 text-sm mt-1'>Video</span>
                                                        </div>
                                                    </div>
                                                    <div className='w-full pb-4 pt-4 sm:pt-0'>
                                                        <dl className='space-y-6 sm:space-y-6'>
                                                            <div>
                                                                <dt className='text-sm text-gray-500 font-medium sm:w-40 sm:flex-shrink-0'>
                                                                    About
                                                                </dt>
                                                                <dd className='mt-1 text-sm text-gray-800 sm:col-span-2'>
                                                                    {aboutText ? aboutText : 'Hi there, I am using Hoot!'}
                                                                </dd>
                                                            </div>
                                                            <hr />
                                                            {data.isGroup && (
                                                                <div>
                                                                    <dt className='text-sm font-medium text-gray-500 sm:w-40 sm:flex-shrink-0'>
                                                                        Emails
                                                                    </dt>
                                                                    <dd className='mt-1 text-sm text-gray-900 sm:col-span-2'>
                                                                        {data?.users?.map((user) => user?.email).join(', ')}
                                                                    </dd>
                                                                </div>
                                                            )}
                                                            {!data.isGroup && (
                                                                <div>
                                                                    <dt className='text-sm font-medium text-gray-500 sm:w-40 sm:flex-shrink-0'>
                                                                        Email
                                                                    </dt>
                                                                    <dd className='mt-1 text-sm text-gray-800 sm:col-span-2'>
                                                                        {otherUser.email}
                                                                    </dd>
                                                                </div>
                                                            )}
                                                            <hr />
                                                            {!data.isGroup && (
                                                                <div className='hidden'>
                                                                    <dt className='text-sm text-gray-500 font-medium sm:w-40 sm:flex-shrink-0'>
                                                                        Joined
                                                                    </dt>
                                                                    <dd className='mt-1 text-sm text-gray-800 sm:col-span-2'>
                                                                        <time dateTime={joinedDate}>
                                                                            {joinedDate}
                                                                        </time>
                                                                    </dd>
                                                                </div>
                                                            )}
                                                            <hr className='hidden' />
                                                            <div>
                                                                <dt className='text-sm text-gray-500 font-medium sm:flex-shrink-0 flex items-center justify-between w-full cursor-pointer'>
                                                                    <span>Media, links and docs</span>
                                                                    <IoChevronForwardSharp className='w-5 h-5 text-gray-700' />
                                                                </dt>
                                                                <dd className='mt-2 text-sm text-gray-800 sm:col-span-2'>
                                                                    <div className='flex items-start w-full'>
                                                                        {messages?.map((message) => {
                                                                            if (message?.image) {
                                                                                return (
                                                                                    <>
                                                                                        <ImageMoal
                                                                                            src={message.image}
                                                                                            isOpen={imageModalOpen}
                                                                                            onClose={() => setImageModalOpen(false)}
                                                                                        />
                                                                                        <Image
                                                                                            key={message.id}
                                                                                            src={message.image}
                                                                                            alt='Image'
                                                                                            onClick={() => setImageModalOpen(true)}
                                                                                            width={500}
                                                                                            height={500}
                                                                                            className='w-14 h-14 rounded-md hover:opacity-80 cursor-pointer object-cover'
                                                                                        />
                                                                                    </>
                                                                                );
                                                                            }
                                                                            return null; // Skip rendering if it's not an image
                                                                        })}

                                                                        {messages && !messages.some((message) => message?.image) && (
                                                                            <span className='text-gray-800 mt-2'>No media</span>
                                                                        )}
                                                                    </div>
                                                                </dd>
                                                            </div>
                                                            <hr />
                                                            <div>
                                                                <dt onClick={() => setEnabled((prev) => !prev)} className='flex items-center justify-between w-full cursor-pointer'>
                                                                    <div className='flex items-center justify-start gap-3'>
                                                                        <IoNotificationsOutline className='w-6 h-6 text-gray-600' />
                                                                        <span className='text-gray-800'>
                                                                            Notifications
                                                                        </span>
                                                                    </div>
                                                                    <div>
                                                                        <Switch
                                                                            // checked={enabled}
                                                                            onChange={setEnabled}
                                                                            className={`${enabled ? 'bg-blue-500 border-blue-500' : 'bg-gray-200 border-gray-300'} relative inline-flex h-6 w-11 items-center rounded-full border`}
                                                                        >
                                                                            <span className="sr-only">Enable notifications</span>
                                                                            <span
                                                                                className={`${enabled ? 'translate-x-6' : 'translate-x-1'} inline-block h-4 w-4 transform rounded-full bg-white transition`}
                                                                            />
                                                                        </Switch>
                                                                    </div>
                                                                </dt>
                                                            </div>
                                                            <hr />
                                                            <div>
                                                                <dt className='flex items-center justify-center w-full gap-4 !mt-4'>
                                                                    <button
                                                                        onClick={() => setBlocked((prev) => !prev)}
                                                                        className={`w-full py-2 rounded-md flex items-center justify-center gap-2 border border-blue-500 ${blocked ? 'text-white bg-blue-500 hover:bg-blue-600' : 'bg-white text-blue-500 hover:bg-blue-100/60'}`}>
                                                                        <MdBlock className='w-5 h-5 text-current' />
                                                                        <span>{blocked ? 'Blocked' : 'Block'}</span>
                                                                    </button>
                                                                    <button onClick={() => setConfirmOpen(true)} className='w-full py-2 rounded-md flex items-center justify-center gap-2 border border-blue-500 bg-white hover:bg-blue-100/60 text-blue-500'>
                                                                        <MdDeleteOutline className='w-5 h-5 text-current' />
                                                                        <span>Delete</span>
                                                                    </button>
                                                                </dt>
                                                            </div>
                                                        </dl>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Dialog.Panel>
                                </Transition.Child>
                            </div>
                        </div>
                    </div>
                </Dialog>
            </Transition.Root>
        </>
    )
}

export default ProfileDrawer
