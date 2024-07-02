'use client';

// app/components/withAuth.js
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import jwt from 'jsonwebtoken';

const withAuth = (WrappedComponent) => {
  return (props) => {
    const router = useRouter();

    useEffect(() => {
      const token = document.cookie.split('; ').find(row => row.startsWith('auth='))?.split('=')[1];

      if (!token) {
        router.push('/login');
        return;
      }

      try {
        jwt.verify(token, process.env.SECRET_KEY);
      } catch (error) {
        router.push('/login');
      }
    }, []);

    return <WrappedComponent {...props} />;
  };
};

export default withAuth;
