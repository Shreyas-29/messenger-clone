import Image from 'next/image'
import React from 'react'
import { AuthForm } from './components'


export default function Home() {
    return (
        <div className='flex max-h-screen h-full flex-col justify-center py-12 sm:px-6 lg:px-8 bg-slate-100'>
            <div className='sm:mx-auto sm:w-full sm:max-w-md'>
                <Image
                    src='/images/messenger.png'
                    alt='logo'
                    width={1000}
                    height={1000}
                    draggable={false}
                    className='mx-auto w-12 h-auto'
                />
                <h2 className='mt-4 text-center text-3xl font-semibold tracking-tight text-gray-900'>
                    Sign in to your account
                </h2>
            </div>
            <AuthForm />
        </div>
    )
}
