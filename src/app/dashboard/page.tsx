'use client';

import { useRouter } from 'next/navigation';
import { PiPlusCircleDuotone } from 'react-icons/pi';
const DashboardPage = () => {
  const router = useRouter();

  const handleClickNewDraw = () => {
    router.push('/board');
  };

  return (
    <main className='flex w-full h-screen items-center justify-center'>
      <div className='h-[400px] w-[600px] rounded-md bg-gray-600 flex items-center justify-center'>
        <div className='text-center '>
          <h3 className='my-6 text-sm font-semibold text-white'>Welcome</h3>
          <p className='mt-1 text-sm text-white'>
            Get started by creating a new draw.
          </p>
          <div className='mt-6'>
            <button
              type='button'
              onClick={handleClickNewDraw}
              className='inline-flex items-center border-[1.5px] border-gray-400 rounded-full px-3 py-2 text-sm font-semibold text-gray-400 hover:text-gray-50 shadow-sm hover:border-gray-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-50'
            >
              <PiPlusCircleDuotone
                aria-hidden='true'
                className='-ml-0.5 mr-1.5 h-5 w-5'
              />
              New Draw
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default DashboardPage;
