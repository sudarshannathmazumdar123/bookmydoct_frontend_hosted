"use client"
import useAuthStore from '@/store/authStore'
import { useEffect } from 'react';


export default function RootLayout({ children }) {
  const validateTokens = useAuthStore(state => state.validateTokens)
  const user = useAuthStore(state => state.user)
  useEffect(() => {
    if (user) {
      validateTokens(user.role);
    }
  }, [user]);

  return (
    <html suppressHydrationWarning>
      <body>{children}</body>
    </html>
  )
} 