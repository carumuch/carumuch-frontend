import type { Metadata } from 'next';
import localFont from 'next/font/local';
import { ModalProvider } from '@/components/modal/ModalContext';
import CustomModal from '@/components/modal/CustomModal';
import { GlobalLoadingSpinner } from '@/components/GlobalLoadingSpinner/GlobalLoadingSpinner';
import Providers from './providers';
import '../styles/globals.scss';

const pretendard = localFont({
  src: '../../public/fonts/PretendardVariable.woff2',
  display: 'swap',
  weight: '45 920',
});

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={pretendard.className}>
        <Providers>
          <ModalProvider>
            <GlobalLoadingSpinner />
            <div className="container">{children}</div>
            <CustomModal />
          </ModalProvider>
        </Providers>
      </body>
    </html>
  );
}
