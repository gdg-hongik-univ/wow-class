"use client";
import type { PropsWithChildren } from "react";
import { useEffect } from "react";

async function startClientMSW() {
  if (
    typeof window !== "undefined" &&
    process.env.NEXT_PUBLIC_API_MOCKING === "true"
  ) {
    const { worker } = await import("../public/mocks/browser");
    await worker.start();
  }
  //TODO: server side 에서 MSW 를 사용하도록 로직 추가
}

export const MSWProvider = ({ children }: PropsWithChildren) => {
  useEffect(() => {
    startClientMSW();
  }, []);

  return <>{children}</>;
};
