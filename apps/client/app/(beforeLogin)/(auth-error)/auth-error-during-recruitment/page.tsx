import { css } from "@styled-system/css";
import { Text } from "@wow-class/ui";
import LinkButton from "components/LinkButton";
import { routePath } from "constants/routePath";
import Image from "next/image";

const AuthErrorDuringRecruitmentPage = () => {
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
        GDSC Hongik 정회원만 이용 가능해요.
      </Text>
      <p className={descriptionStyle}>
        이번 학기 GDSC Hongik 정회원 모집 중이에요.
        <br />
        아래 버튼을 눌러 가입할 수 있어요!
      </p>
      <div className={buttonContainerStyle}>
        <LinkButton aria-label="홈으로 이동" href={routePath.landing}>
          홈으로 이동
        </LinkButton>
        <LinkButton
          aria-label="GDSC Hongik 가입하기"
          href={routePath.onboarding}
          variant="outline"
        >
          GDSC Hongik 가입하기
        </LinkButton>
      </div>
    </main>
  );
};

export default AuthErrorDuringRecruitmentPage;

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
