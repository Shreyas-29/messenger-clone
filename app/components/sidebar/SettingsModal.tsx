'use client';

import { User } from '@prisma/client';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import Modal from '../Modal';
import Input from '../inputs/Input';
import Image from 'next/image';
import { CldUploadButton } from 'next-cloudinary';
import Button from '../Button';
import { CgSpinner } from 'react-icons/cg';


interface SettingsModalProps {
    isOpen?: boolean;
    currentUser: User;
    onClose: () => void;
}

const SettingsModal: React.FC<SettingsModalProps> = ({
    isOpen,
    currentUser,
    onClose
}) => {

    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [about, setAbout] = useState('');

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
            name: currentUser?.name,
            image: currentUser?.image,
            about: window.localStorage.getItem('about') || '',
        }
    });

    const image = watch('image');

    const handleUpload = (result: any) => {
        setValue('image', result.info.secure_url, {
            shouldValidate: true
        });
    }

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);

        // setAbout(about);

        window.localStorage.setItem('about', data?.about);

        axios.post('/api/settings', data)
            .then(() => {
                router.refresh();
                onClose();
            })
            .catch(() => toast.error('Something went wrong!'))
            .finally(() => setIsLoading(false));
    };

    // console.log(about);


    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
        >
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className='space-y-4'>
                    <div className='px-4'>
                        <h2 className='text-base font-semibold text-gray-900 leading-7'>Profile</h2>
                        <p className='text-gray-600 mt-1 text-sm leading-6'>Edit your profile</p>

                        <div className='mt-6 flex flex-col gap-y-4'>
                            <Input
                                disabled={isLoading}
                                label='Name'
                                id='name'
                                errors={errors}
                                required
                                register={register}
                            />
                            <Input
                                disabled={isLoading}
                                label='About'
                                id='about'
                                errors={errors}
                                required
                                register={register}
                            />
                            <div>
                                <label className='block text-sm font-medium leading-6 text-gray-900'>
                                    Photo
                                </label>
                                <div className='mt-2 flex items-center gap-x-3'>
                                    <Image
                                        src={image || currentUser?.image || '/images/user.png'}
                                        alt='Image'
                                        width={1000}
                                        height={1000}
                                        className='w-10 h-10 cursor-pointer rounded-full object-cover'
                                    />
                                    <CldUploadButton
                                        options={{ maxFiles: 1 }}
                                        onUpload={handleUpload}
                                        uploadPreset='ssqanesp'
                                    >
                                        <Button
                                            type='button'
                                            secondary
                                            disabled={isLoading}
                                        >
                                            Change
                                        </Button>
                                    </CldUploadButton>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='flex items-center justify-end gap-x-6'>
                        <Button
                            type='button'
                            secondary
                            onClick={onClose}
                        >
                            Cancel
                        </Button>
                        <Button
                            type='submit'
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <div className='flex items-center gap-2'>
                                    <CgSpinner className='w-5 h-5 text-current animate-spin' />
                                    <span>Saving</span>
                                </div>
                            ) : (
                                <span>Save</span>
                            )}
                        </Button>
                    </div>

                </div>
            </form>
        </Modal>
    )
}

export default SettingsModal
