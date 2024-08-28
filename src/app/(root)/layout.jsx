import { Children, React, ReactNode } from "react";
import StreamVideoProvider from "@/providers/StreamClientProviders";

const RootLayout = ({ children }) => {
  return (
    <>
      <main>
        <StreamVideoProvider>{children}</StreamVideoProvider>
      </main>
    </>
  );
};

export default RootLayout;

// import { ReactNode } from 'react';

// import StreamVideoProvider from '@/providers/StreamClientProvider';

// const RootLayout = ({ children }: Readonly<{ children: ReactNode }>) => {
//   return (
//     <main>
//       <StreamVideoProvider>{children}</StreamVideoProvider>
//     </main>
//   );
// };
