import "./global.css";
import "wowds-ui/styles.css";
import "@wow-class/ui/styles.css";
import "react-toastify/dist/ReactToastify.css";

import { GoogleAnalytics } from "@next/third-parties/google";
import { JotaiProvider } from "components/JotaiProvider";
import Navbar from "components/Navbar";
import { metaData } from "constants/metaData";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import { ToastContainer } from "react-toastify";
export const metadata: Metadata = {
  title: {
    default: "와우클래스: 멘토 | GDG Hongik Univ. 스터디 서비스",
    template: "%s | 와우클래스 멘토",
  },
  description:
    "와우클래스는 GDG Hongik Univ.가 제공하는 스터디 관리 플랫폼입니다.",
  keywords: ["GDG", "Hongik", "스터디 서비스", "와우 클래스"],
  openGraph: metaData.openGraph,
  robots: {
    index: false,
    follow: false,
  },
  icons: {
    icon: "/images/logo.svg",
    apple: "/images/logo.svg",
    other: [
      {
        rel: "icon",
        type: "image/svg+xml",
        url: "/images/logo.svg",
      },
    ],
  },
};

const RootLayout = ({
  children,
  modal,
}: Readonly<{
  children: ReactNode;
  modal: ReactNode;
}>) => {
  return (
    <html lang="ko">
      <body>
        <JotaiProvider>
          <ToastContainer
            hideProgressBar
            autoClose={4000}
            closeButton={false}
            limit={1}
          />
          <Navbar />
          {children}
          {modal}
        </JotaiProvider>
      </body>
      {process.env.NEXT_PUBLIC_GA_MENTOR_ID && (
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_MENTOR_ID} />
      )}
    </html>
  );
};

export default RootLayout;
