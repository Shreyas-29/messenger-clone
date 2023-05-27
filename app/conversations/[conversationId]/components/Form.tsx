'use client';

import useConversation from '@/app/hooks/useConversation';
import axios from 'axios';
import React from 'react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { HiPhoto } from 'react-icons/hi2';
import { FaPaperPlane } from 'react-icons/fa';
import MessageInput from './MessageInput';
import { CldUploadButton } from 'next-cloudinary';
import { IoAttachOutline } from 'react-icons/io5';

const Form = () => {

    const { conversationId } = useConversation();

    const {
        register,
        handleSubmit,
        setValue,
        formState: {
            errors
        }
    } = useForm<FieldValues>({
        defaultValues: {
            message: ''
        }
    });


    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setValue('message', '', { shouldValidate: true });
        axios.post('/api/messages', {
            ...data,
            conversationId
        })
    }

    const handleUpload = (result: any) => {
        axios.post('/api/messages', {
            image: result?.info?.secure_url,
            conversationId,
        })
    }


    return (
        <div className='py-4 px-4 bg-white border-t flex items-center gap-2 lg:gap-4 w-full'>
            <CldUploadButton
                options={{ maxFiles: 1 }}
                onUpload={handleUpload}
                uploadPreset='ssqanesp'
            >
                <div className='text-blue-500 hover:text-blue-700 transition cursor-pointer w-10 h-10 rounded-full hover:bg-slate-100 flex items-center justify-center'>
                    <IoAttachOutline className='w-5 h-5 text-blue-500 rotate-45' />
                </div>
            </CldUploadButton>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className='flex items-center gap-2 lg:gap-4 flex-1'
            >
                <MessageInput
                    id="message"
                    register={register}
                    errors={errors}
                    required
                    placeholder="Write a message"
                />
                <button
                    type='submit'
                    className='rounded-full p-2.5 bg-blue-500 hover:bg-blue-600 cursor-pointer transition ease-out'
                >
                    <FaPaperPlane className='text-white' size={20} />
                </button>
            </form>
        </div>
    )
}

export default Form
