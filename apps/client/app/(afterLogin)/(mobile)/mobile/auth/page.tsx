import { Flex } from "@styled-system/jsx";
import { Space, Text } from "@wow-class/ui";
import { routePath } from "constants/routePath";
import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import { color } from "wowds-tokens";
import Button from "wowds-ui/Button";

const MobileAuthPage = async () => {
  return (
    <>
      <Flex alignItems="center" direction="column">
        <Text typo="h1">로그인</Text>
        <Space height="lg" />
        <Text>
          와우클래스는 GDG Hongik Univ. 정회원만 이용 가능해요. <br />
          GDG Hongik Univ. 가입을 위해선 GitHub 계정이 필요해요.
        </Text>
      </Flex>
      <Button
        aria-label="github 로그인"
        asProp={Link}
        href={routePath["github-oauth"]}
        icon={githubLogoIcon}
        style={githubLoginButtonStyle}
      >
        GitHub 로그인
      </Button>
    </>
  );
};

const githubLogoIcon = (
  <Image
    alt="github-logo"
    height={18}
    src="/images/github-logo-white.svg"
    width={18}
  />
);

export default MobileAuthPage;

const githubLoginButtonStyle: CSSProperties = {
  backgroundColor: `${color.github}`,
  marginTop: "40px",
  bottom: "20px",
  position: "absolute",
  width: "calc(100% - 32px)",
};
