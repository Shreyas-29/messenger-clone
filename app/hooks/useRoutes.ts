import { useMemo } from "react";
import { usePathname } from "next/navigation";
import { FiUsers } from 'react-icons/fi';
import { signOut } from "next-auth/react";
import useConversation from "./useConversation";
import { BiMessageSquareDetail } from 'react-icons/bi';
import { MdLogout } from 'react-icons/md';

const useRoutes = () => {
  const pathname = usePathname();
  const { conversationId } = useConversation();

  const routes = useMemo(() => [
    {
      label: 'Users',
      href: '/users',
      icon: FiUsers,
      active: pathname === '/users'
    },
    {
      label: 'Chat',
      href: '/conversations',
      icon: BiMessageSquareDetail,
      active: pathname === '/conversations' || !!conversationId
    },
    {
      label: 'Logout',
      onClick: () => signOut(),
      href: '#',
      icon: MdLogout,
    }
  ], [pathname, conversationId]);

  return routes;
};

export default useRoutes;
