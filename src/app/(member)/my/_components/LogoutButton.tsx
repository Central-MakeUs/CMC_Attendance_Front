'use client';

import { useRouter } from 'next/navigation';
import { clearAuthTokens } from '@/lib/cookies/client';

interface Props {
  className?: string;
  children?: React.ReactNode;
}

export default function LogoutButton({ className, children }: Props) {
  const router = useRouter();

  const handleLogout = () => {
    clearAuthTokens();
    router.replace("/login");
    router.refresh();
  };

  return (
    <button onClick={handleLogout} className={className}>
      {children}
    </button>
  );
}
