'use client';

import useConversation from '@/app/hooks/useConversation';

import { EmptyState } from "../components";

const Home = () => {
    const { isOpen } = useConversation();

    return (
        <div className={`lg:pl-80 h-full lg:block ${isOpen ? 'block' : 'hidden'}`}>
            <EmptyState />
        </div>
    )
};

export default Home;