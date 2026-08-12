import { css } from "@styled-system/css";
import { Text } from "@wow-class/ui";
import { routePath } from "constants/routePath";
import Image from "next/image";
import Link from "next/link";
import { color } from "wowds-tokens";
import Button from "wowds-ui/Button";

const AuthPage = async () => {
  return (
    <main className={mainContentStyle}>
      <section className={leftColStyle}>
        <Text as="h1" className={loginTextStyle} typo="display1">
          로그인
        </Text>
        <div className={descriptionTextContainerStyle}>
          <Image
            alt="check-icon"
            height={20}
            src="/images/check-gray.svg"
            width={20}
          />
          <Text as="p" color="sub" typo="body1">
            와우클래스는 GDG Hongik Univ. 정회원만 이용 가능해요.
          </Text>
        </div>
        <div className={descriptionTextContainerStyle}>
          <Image
            alt="check-icon"
            height={20}
            src="/images/check-gray.svg"
            width={20}
          />
          <Text as="p" color="sub" typo="body1">
            GDG Hongik Univ. 가입을 위해선 GitHub 계정이 필요해요.
          </Text>
        </div>
        <div className={mobileDescriptionTextContainerStyle}>
          <Image
            alt="check-icon"
            height={20}
            src="/images/check-blue.svg"
            width={20}
          />
          <Text as="p" color="primary" typo="body1">
            PC에 최적화되어 있어요. PC로 이용해주세요.
          </Text>
        </div>
        <Button
          aria-label="github 로그인"
          asProp={Link}
          href={routePath["github-oauth"]}
          icon={githubLogoIcon}
          style={githubLoginButtonStyle}
        >
          GitHub 로그인
        </Button>
      </section>
      <section className={rightColStyle}>
        <Image
          fill
          alt="auth-background-image"
          className={authImageStyle}
          src="/images/auth-background.svg"
        />
      </section>
    </main>
  );
};

export default AuthPage;

const githubLogoIcon = (
  <Image
    alt="github-logo"
    height={18}
    src="/images/github-logo-white.svg"
    width={18}
  />
);

const mainContentStyle = css({
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  width: "100vw",
  height: "100vh",
  alignItems: "center",
  justifyContent: "center",
  "@media (max-width: 599px)": {
    gridTemplateColumns: "1fr 0",
  },
});

const leftColStyle = css({
  textAlign: "center",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
});

const loginTextStyle = css({
  marginBottom: "16px",
});

const descriptionTextContainerStyle = css({
  marginBottom: "4px",
  display: "flex",
  gap: "10px",
  stroke: "primary",
});

const mobileDescriptionTextContainerStyle = css({
  display: "none",
  marginBottom: "4px",
  "@media (max-width: 599px)": {
    display: "flex",
    gap: "10px",
  },
});

const rightColStyle = css({
  position: "relative",
  width: "100%",
  height: "100%",
});

const authImageStyle = css({
  objectFit: "cover",
  height: "100%",
  width: "100%",
});

const githubLoginButtonStyle = {
  backgroundColor: `${color.github}`,
  maxWidth: "328px",
  marginTop: "40px",
};
