import React from "react";
import { Sidebar } from "../components";
import { ConversationList } from "./components";
import getConversations from "../actions/getConversations";
import getUsers from "../actions/getUsers";


export const metadata = {
    title: 'Chats - Messenger',
    description: 'Messenger Clone',
}

export default async function ConversationsLayout({
    children
}: {
    children: React.ReactNode,
}) {
    const conversations = await getConversations();
    const users = await getUsers();

    return (
        // @ts-expect-error Server Component
        <Sidebar>
            <div className="h-full">
                <ConversationList
                    users={users}
                    initialItems={conversations}
                />
                {children}
            </div>
        </Sidebar>
    );
}