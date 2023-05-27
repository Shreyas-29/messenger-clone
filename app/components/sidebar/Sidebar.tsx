'use client';

import React, { useEffect, useState } from 'react';
import getCurrentUser from '@/app/actions/getCurrentUser';

import DesktopSidebar from './DesktopSidebar';
import MobileFooter from './MobileFooter';
import { User } from '@prisma/client';

function Sidebar({
    children,
    currentUser
}: {
    children: React.ReactNode;
    currentUser: User | null;
}) {

    // const currentUser = await getCurrentUser();
    // console.log('currentUser', currentUser);

    return (
        <div className="h-full">
            <DesktopSidebar currentUser={currentUser!} />
            <MobileFooter />
            <main className="lg:pl-20 h-full">
                {children}
            </main>
        </div>
    )
}

export default Sidebar;