'use client';

import { useRouter } from 'next/navigation';

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = () => {
    document.cookie = 'access_token=; max-age=0; path=/';
    router.push('/login');
  };

  return (
    <button
      onClick={handleLogout}
      className="text-xs text-grayscale-400 underline"
    >
      로그아웃
    </button>
  );
}
