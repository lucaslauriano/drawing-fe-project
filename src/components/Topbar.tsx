'use client';
import RangeSlider from '@/components/range-slider/ReangeSlider';
import { useDrawingContext } from '@/contexts/DrawingProvider';
import { Tool } from '@/types/entities.d';
import { BiSolidEraser } from 'react-icons/bi';
import { FaPen } from 'react-icons/fa6';
const Topbar: React.FC = () => {
  const { tool, setSize, size } = useDrawingContext();

  const handleChangeSize = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSize(Number(e.target.value));
  };

  return (
    <div className='bg-gray-600 p-4 w-full h-[60px] flex justify-start items-center border-l-[1px] border-gray-500'>
      <div className='text-white font-normal text-sm flex items-center'>
        {tool === Tool.DRAW ? (
          <FaPen name='pen' className='h-5 w-5 inline' />
        ) : (
          <BiSolidEraser name='eraser' className='h-5 w-5 inline' />
        )}
      </div>

      <RangeSlider size={size} handleChangeSize={handleChangeSize} />
    </div>
  );
};

export default Topbar;
