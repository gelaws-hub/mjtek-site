// src/hooks/useGoToLogin.ts

import { useRouter } from 'next/navigation';

export const useGoToLogin = () => {
  const router = useRouter();

  // Custom function to redirect to login with current path
  const goToLogin = () => {
    const currentPath = window.location.pathname;  // Get the current page's pathname
    router.push(`/login?redirectTo=${encodeURIComponent(currentPath)}`);
  };

  return { goToLogin };
};
