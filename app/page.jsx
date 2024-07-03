// app/page.jsx
'use client';

import { useSession, signOut } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import PanZoomSVG from './components/PanZoomSVG';
import Categories from './components/categories';

export default function HomePage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [status, router]);

  useEffect(() => {
    console.log('Selected category changed:', selectedCategory);
  }, [selectedCategory]);

  if (status === 'loading') {
    return <p>Loading...</p>;
  }

  if (!session) {
    return null;
  }

  return (
    <main className="flex flex-col min-h-screen items-center justify-between bg-slate-200">
      <div className="flex flex-col lg:flex-row w-full h-screen">
        <div className="lg:w-[300px] w-full h-full p-4 order-2 lg:order-none flex flex-col">
          <div className='space-y-8'>
            <div className="pt-4">
              <Image src="/logo.png" alt="Logo" width={300} height={100} objectFit="contain" />
            </div>
            <Categories selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
          </div>
          <div className="flex justify-center items-end">
            <button
              onClick={() => signOut({ callbackUrl: '/login' })}
              className="w-auto mt-4 p-2 bg-red-500 text-white rounded"
            >
              Sign Out
            </button>
          </div>
        </div>
        <div className="flex-grow flex items-center justify-center order-1 lg:order-none bg-white">
          <PanZoomSVG selectedCategory={selectedCategory} />
        </div>
      </div>
    </main>
  );
}
