'use client';

import { useDrawingContext } from '@/contexts/DrawningProvider';
import { FaHouse, FaPen, FaTextHeight } from 'react-icons/fa6';
import { BiSolidEraser, BiSolidTrash } from 'react-icons/bi';
import { Tool } from '@/types/entities.d';
import { useRouter } from 'next/navigation';
import { IconType } from 'react-icons';

interface ButtonConfig {
  tool?: Tool;
  onClick: () => void;
  icon: IconType;
  title: string;
}

const Sidebar: React.FC = () => {
  const { setTool, clearBoard, setColor, tool } = useDrawingContext();
  const router = useRouter();

  const handleClickGoToHome = () => {
    router.push('/');
  };

  const buttons: ButtonConfig[] = [
    {
      onClick: handleClickGoToHome,
      icon: FaHouse,
      title: 'home',
    },
    {
      tool: Tool.DRAW,
      onClick: () => setTool(Tool.DRAW),
      icon: FaPen,
      title: Tool.DRAW,
    },
    {
      tool: Tool.ERASE,
      onClick: () => setTool(Tool.ERASE),
      icon: BiSolidEraser,
      title: Tool.ERASE,
    },
    {
      onClick: clearBoard,
      icon: BiSolidTrash,
      title: Tool.CLEAR,
    },
    {
      tool: Tool.TEXT,
      onClick: () => setTool(Tool.TEXT),
      icon: FaTextHeight,
      title: Tool.TEXT,
    },
  ];

  return (
    <div className='flex flex-col items-center bg-gray-600 p-3 h-screen w-[60px] text-white shadow-gray-400 shadow-sm'>
      {buttons.map(
        ({ tool: buttonTool, onClick, icon: Icon, title }, index) => (
          <button
            key={index}
            onClick={onClick}
            className={`p-2 ${tool === buttonTool ? 'bg-gray-700' : ''} mb-4`}
            title={title}
          >
            <Icon
              size={20}
              className={
                buttonTool && tool === buttonTool
                  ? 'text-white'
                  : 'text-gray-200'
              }
            />
          </button>
        )
      )}

      <input
        type='color'
        onChange={(e) => {
          setTool(Tool.DRAW);
          setColor(e.target.value);
        }}
        className='mt-4 cursor-pointer w-10 h-10 border-none bg-transparent'
        title='pallet'
      />
    </div>
  );
};

export default Sidebar;
