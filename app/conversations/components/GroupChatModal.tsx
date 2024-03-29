'use client';

import { Button, Input, Modal, Select } from '@/app/components';
import { User } from '@prisma/client';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';


interface GorupChatModalProps {
    users: User[];
    isOpen?: boolean;
    onClose: () => void;
}

const GroupChatModal: React.FC<GorupChatModalProps> = ({
    users,
    isOpen,
    onClose
}) => {

    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: {
            errors
        }
    } = useForm<FieldValues>({
        defaultValues: {
            message: ''
        }
    });

    const members = watch('members');

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);

        axios.post('/api/conversations', {
            ...data,
            isGroup: true,
        })
            .then(() => {
                router.refresh();
                onClose();
            })
            .catch(() => toast.error("Something went wrong!"))
            .finally(() => setIsLoading(false))
    };


    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
        >
            <form onSubmit={handleSubmit(onSubmit)} className='px-4 py-2'>
                <div className='space-y-4'>
                    <div className='pb-4'>
                        <h2 className='text-lg font-semibold leading-7 text-gray-900'>
                            Create a group chat
                        </h2>
                        <p className='mt-2 text-sm leading-6 text-gray-500'>
                            Create a chat with more than 2 people
                        </p>
                        <div className='mt-6 flex flex-col gap-y-6'>
                            <Input
                                register={register}
                                label='Name'
                                id='name'
                                disabled={isLoading}
                                required
                                errors={errors}
                            />
                            <Select
                                disabled={isLoading}
                                label="Members"
                                options={users.map((user) => ({
                                    value: user?.id,
                                    label: user?.name
                                }))}
                                onChnage={(value) => setValue('members', value, { shouldValidate: true })}
                                value={members}
                            />
                        </div>
                    </div>
                </div>
                <div className='mt-6 flex items-center justify-end gap-x-6'>
                    <Button
                        secondary
                        disabled={isLoading}
                        onClick={onClose}
                        type='button'
                    >
                        Cancel
                    </Button>
                    <Button
                        disabled={isLoading}
                        type='submit'
                    >
                        Create
                    </Button>
                </div>
            </form>
        </Modal>
    )
}

export default GroupChatModal
