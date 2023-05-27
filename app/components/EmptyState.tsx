import React from 'react'

const EmptyState = () => {
    return (
        <section className='w-full h-full'>
            <div className='flex items-center justify-center h-screen to-blue-500'>
                <div className='flex flex-col items-center justify-center'>
                    <img
                        src='/images/home.png'
                        alt=''
                        width={2000}
                        height={2000}
                        draggable={false}
                        className='w-80 h-auto object-cover'
                    />
                    <h2 className='text-xl md:text-2xl font-semibold text-gray-800'>
                        Connect and Chat with Friends
                    </h2>
                    <p className='text-gray-500 mt-4 max-w-lg text-center'>
                        Connect with your friends and family easily with Hoot.
                    </p>
                </div>
            </div>
        </section>
    )
}

export default EmptyState
