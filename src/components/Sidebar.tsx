'use client';

import { FaHouse } from 'react-icons/fa6';
import { useRouter } from 'next/navigation';

const Sidebar: React.FC = () => {
  const router = useRouter();

  const handleClickGoToHome = () => {
    router.push('/');
  };

  return (
    <div className='flex flex-col items-center bg-gray-600 p-3 h-screen w-[60px] text-white  shadow-gray-400 shadow-sm'>
      <button onClick={handleClickGoToHome} className='mb-4'>
        <FaHouse className='text-gray-200' size={20} title='home' />
      </button>
      <div className='flex flex-col items-center gap-y-3 mt-4'></div>
    </div>
  );
};

export default Sidebar;
