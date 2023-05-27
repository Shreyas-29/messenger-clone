import React from "react";
import { Sidebar } from "../components";
import getCurrentUser from "../actions/getCurrentUser";
import getUsers from "../actions/getUsers";
import { UserLists } from "./components";


export const metadata = {
    title: 'Peoples - Messenger',
    description: 'Messenger Clone',
}

export default async function UsersLayout({
    children
}: {
    children: React.ReactNode
}) {

    const currentUser = await getCurrentUser();

    const users = await getUsers();

    return (
        <Sidebar currentUser={currentUser}>
            <div className="h-full">
                <UserLists items={users} />
                {children}
            </div>
        </Sidebar>
    )
}