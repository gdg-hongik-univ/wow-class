import { css } from "@styled-system/css";
import { Text } from "@wow-class/ui";
import { routePath } from "constants/routePath";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Button from "wowds-ui/Button";

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: true,
  },
};

const AuthErrorAfterRecruitmentPage = () => {
  return (
    <main className={mainContentStyle}>
      <Image
        alt="avatar-image"
        className={avatarImageStyle}
        height={200}
        src="/images/avatar.svg"
        width={200}
      />
      <Text as="h1" className={headingStyle} typo="display2">
        GDG Hongik Univ. 정회원만 이용 가능해요.
      </Text>
      <p className={descriptionStyle}>
        GDG Hongik Univ. 정회원 모집 기간이 아니에요!
        <br />
        모집 기간에 합류 후 이용해주세요.
      </p>
      <div className={buttonContainerStyle}>
        <Button
          aria-label="홈으로 이동"
          asProp={Link}
          href={routePath.landing}
          style={buttonStyle}
        >
          홈으로 이동
        </Button>
      </div>
    </main>
  );
};

export default AuthErrorAfterRecruitmentPage;

const mainContentStyle = css({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  width: "100vw",
  height: "100vh",
  textAlign: "center",
});

const avatarImageStyle = css({
  width: "200px",
  height: "200px",
  marginBottom: "48px",
});

const headingStyle = css({
  marginBottom: "16px",
});

const descriptionStyle = css({
  fontSize: "18px",
  fontWeight: 500,
  lineHeight: "160%",
  letterSpacing: "-0.18px",
  color: "sub",
  marginBottom: "48px",
});

const buttonContainerStyle = css({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  gap: "12px",
  width: "100%",
});

const buttonStyle = {
  maxWidth: "328px",
};
