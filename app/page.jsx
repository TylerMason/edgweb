// app/page.jsx
'use client';

import { useSession, signOut } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import PanZoomSVG from './components/PanZoomSVG';
import Categories from './components/categories';
import CheckBoxGroup from './components/CheckBoxGroup'; // Import the new component

export default function HomePage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState(null);

  let colours = "bg-green-500 bg-red-500 bg-pink-500 bg-blue-500 bg-purple-500 fill-green-500 fill-red-500 fill-blue-500 fill-pink-500 fill-purple-500"

  const checkboxes = [
    { id: 'windows', label: 'Windows', idPrefix: 'windowRepair', color: 'green-500' },
    { id: 'decks', label: 'Decks', idPrefix: 'deckRepair', color: 'pink-500' },
    { id: 'roofs', label: 'Roofs', idPrefix: 'roofRepair', color: 'red-500' },
    { id: 'reportedLeaks', label: 'Reported Leaks', idPrefix: 'leakRepair', color: 'blue-500' },
  ];

  const checkboxes2 = [
    { id: 'dtLocations', label: 'locations', idPrefix: 'edgDTlocations', color: 'purple-500' }
  ];

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
        <div className="lg:w-[300px] w-full h-full p-4 order-2 lg:order-none flex flex-col justify-between overflow-y-auto">
          <div className='space-y-6'>
            <div className="pt-4">
              <Image src="/logo.png" alt="Logo" width={300} height={100} objectFit="contain" />
            </div>
            <Categories selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />

            {/* Horizontal divider */}
            <hr className="border-gray-500" />

            {/* Dummy hyperlinks and CheckBoxGroup */}
            <div className="flex flex-col items-center text-center space-y-6">
              <CheckBoxGroup checkboxes={checkboxes} parentLabel="Builder Repair Locations" groupKey="builderRepair" /> {/* Pass the checkboxes and parentLabel props here */}
              <CheckBoxGroup checkboxes={checkboxes2} parentLabel="Destructive Testing" groupKey="dtLocations" />
            </div>
          </div>

          <div className="flex justify-center items-end">
            {/* Sign Out button */}
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
