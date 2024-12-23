import { Toaster } from "@/components/ui/sonner";
import ConvexClientProvider from "@/provders/convexClientProvider";
import { ModalProvider } from "@/provders/modalProvider";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Suspense } from "react";
import Loading from "@/components/auth/loading";
import { RecoilRoot } from 'recoil';
import { MotionConfig } from "framer-motion";

const inter = Inter({ subsets: ["latin"] });
const DEFAULT_EASE = [0.6, 0.01, -0.05, 0.9];


export const metadata: Metadata = {
  title: "Visual",
  description: "Digital collaboration whiteboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Suspense fallback={<Loading />}>
          <ConvexClientProvider>
            {/* <RecoilRoot> */}
            <Toaster />
            {/* <MotionConfig transition={{ ease: DEFAULT_EASE }}> */}
            <ModalProvider />
            {/* <ModalManager /> */}
            {children}
            {/* </MotionConfig> */}
            {/* </RecoilRoot> */}
          </ConvexClientProvider>
        </Suspense>
      </body>
    </html>
  );
}
