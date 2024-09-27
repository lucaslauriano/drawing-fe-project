'use client';

import { useDrawingContext } from '@/contexts/DrawningProvider';
import { FaHouse, FaPen, FaTextHeight } from 'react-icons/fa6';
import { BiSolidEraser, BiSolidTrash } from 'react-icons/bi';
import { Tool } from '@/types/entities.d';
import { useRouter } from 'next/navigation';

const Sidebar: React.FC = () => {
  const { setTool, clearBoard, setColor, tool } = useDrawingContext();
  const router = useRouter();

  const handleClickGoToHome = () => {
    router.push('/');
  };

  return (
    <div className='flex flex-col items-center bg-gray-600 p-3 h-screen w-[60px] text-white  shadow-gray-400 shadow-sm'>
      <button onClick={handleClickGoToHome} className='mb-4'>
        <FaHouse className='text-gray-200' size={20} title='home' />
      </button>

      <div className='flex flex-col items-center gap-y-3 mt-4'>
        <button
          onClick={() => setTool(Tool.DRAW)}
          className={`p-2 ${tool === Tool.DRAW ? 'bg-gray-700' : ''}`}
        >
          <FaPen
            size={20}
            title={Tool.DRAW}
            className={tool === Tool.DRAW ? 'text-white' : 'text-gray-200'}
          />
        </button>

        <button
          onClick={() => setTool(Tool.ERASE)}
          className={`p-2 ${tool === Tool.ERASE ? 'bg-gray-700' : ''}`}
        >
          <BiSolidEraser
            size={20}
            title={Tool.ERASE}
            className={tool === Tool.ERASE ? 'text-white' : 'text-gray-200'}
          />
        </button>

        <button
          onClick={clearBoard}
          className={`p-2 ${tool === Tool.CLEAR ? 'bg-gray-700' : ''}`}
        >
          <BiSolidTrash
            size={20}
            title={Tool.CLEAR}
            className='hover:text-white text-gray-200'
          />
        </button>

        <button
          onClick={() => setTool(Tool.TEXT)}
          className={`p-2 ${tool === Tool.TEXT ? 'bg-gray-700' : ''}`}
        >
          <FaTextHeight />
        </button>

        <input
          type='color'
          onChange={(e) => setColor(e.target.value)}
          className='mt-4 cursor-pointer w-10 h-10 border-none bg-transparent'
          title='pallet'
        />
      </div>
    </div>
  );
};

export default Sidebar;
