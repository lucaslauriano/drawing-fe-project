import DrawingBoard from '@/components/DrawingBoard';
import Sidebar from '@/components/Sidebar';
import Topbar from '@/components/Topbar';

const DrawingPage = () => {
  return (
    <div className='flex justify-between w-full flex-row h-screen'>
      <Sidebar />
      <div className='flex flex-col w-full '>
        <Topbar />
        <DrawingBoard />
      </div>
    </div>
  );
};

export default DrawingPage;
