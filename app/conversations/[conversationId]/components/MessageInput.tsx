'use client';

import React from 'react'
import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form';


interface MessageInputProps {
    id: string;
    placeholder?: string;
    type?: string;
    required?: boolean;
    register: UseFormRegister<FieldValues>;
    errors: FieldErrors;
}
const MessageInput: React.FC<MessageInputProps> = ({
    id,
    placeholder,
    type,
    required,
    register,
    errors
}) => {
    return (
        <div className='relative w-full'>
            <input
                id={id}
                type={type}
                autoComplete={id}
                {...register(id, { required: true })}
                placeholder={placeholder}
                className='text-gray-800 bg-slate-100 py-2 px-4 w-full rounded-full focus-within:outline-1 focus-within:outline-blue-700'
            />
        </div>
    )
}

export default MessageInput
