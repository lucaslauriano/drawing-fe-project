import { DrawingProvider } from '@/contexts/DrawningProvider';
import './globals.css';
import { Inter } from 'next/font/google';
const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Draw Board',
  description: 'Created by @lucas.lauriano',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <div className='flex w-full h-screen bg-[#282828]'>
          <div className='flex justify-center items-center flex-1'>
            <DrawingProvider>{children}</DrawingProvider>
          </div>
        </div>
      </body>
    </html>
  );
}
