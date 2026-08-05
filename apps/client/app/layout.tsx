import "./global.css";
import "wowds-ui/styles.css";
import "@wow-class/ui/styles.css";
import "react-toastify/dist/ReactToastify.css";

import { GoogleAnalytics } from "@next/third-parties/google";
import type { Metadata } from "next";
import { ToastContainer } from "react-toastify";

import { JotaiProvider } from "../components/JotaiProvider";

export const metadata: Metadata = {
  title: {
    default: "와우클래스 | GDGoC Hongik 스터디 서비스",
    template: "%s | 와우클래스",
  },
  description:
    "와우클래스는 GDGoC Hongik이 제공하는 스터디 관리 플랫폼입니다. 이 서비스는 정규 스터디 과제 제출, 출석 체크 등 전반적인 스터디 활동을 효율적으로 관리할 수 있는 기능을 제공합니다.",
  openGraph: {
    title: "와우클래스 | GDGoC Hongik 스터디 서비스",
    description:
      "와우클래스는 GDGoC Hongik이 제공하는 스터디 관리 플랫폼입니다. 이 서비스는 정규 스터디 과제 제출, 출석 체크 등 전반적인 스터디 활동을 효율적으로 관리할 수 있는 기능을 제공합니다.",
    images: ["/images/og-image.png"],
    siteName: "와우클래스 | GDGoC Hongik 스터디 서비스",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "와우클래스 | GDGoC Hongik 스터디 서비스",
    description:
      "와우클래스는 GDGoC Hongik이 제공하는 스터디 관리 플랫폼입니다. 이 서비스는 정규 스터디 과제 제출, 출석 체크 등 전반적인 스터디 활동을 효율적으로 관리할 수 있는 기능을 제공합니다.",
    images: ["/images/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
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
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang="ko">
      <body>
        <ToastContainer
          hideProgressBar
          autoClose={4000}
          closeButton={false}
          limit={1}
        />
        <JotaiProvider>{children}</JotaiProvider>
      </body>
      {process.env.NEXT_PUBLIC_GA_CLIENT_ID && (
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_CLIENT_ID} />
      )}
    </html>
  );
};

export default RootLayout;
