import { css } from "@styled-system/css";
import { fetcher } from "@wow-class/utils";
import LoginButton from "components/LoginButton";
import { apiPath } from "constants/apiPath";
import { tags } from "constants/tags";
import { cookies } from "next/headers";
import Image from "next/image";
import type { DashboardApiResponseDto } from "types/dtos/auth";

const AuthPage = async () => {
  const cookieStore = cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  const response = await fetcher.get<DashboardApiResponseDto>(
    apiPath.dashboard,
    {
      next: { tags: [tags.dashboard] },
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  const memberRole = response.data?.member.role;
  const currentRecruitmentOpen =
    response.data?.currentRecruitmentRound.period.open;

  console.log(memberRole, currentRecruitmentOpen);

  return (
    <main className={mainContentStyle}>
      <section className={leftColStyle}>
        <h1 className={loginTextStyle}>로그인</h1>
        <div className={descriptionTextContainerStyle}>
          <Image
            alt="check-icon"
            height={20}
            src="/images/check.svg"
            width={20}
          />
          <p className={descriptionTextStyle}>
            와우클래스는 GDSC Hongik 정회원만 이용 가능해요.
          </p>
        </div>
        <div
          className={descriptionTextContainerStyle}
          style={{ marginBottom: "48px" }}
        >
          <Image
            alt="check-icon"
            height={20}
            src="/images/check.svg"
            width={20}
          />
          <p className={descriptionTextStyle}>
            GDSC Hongik 가입을 위해선 GitHub 계정이 필요해요.
          </p>
        </div>
        <LoginButton />
      </section>
      <section className={imageContainerStyle}>
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

const mainContentStyle = css({
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  width: "100vw",
  height: "100vh",
  alignItems: "center",
  justifyContent: "center",
});

const leftColStyle = css({
  textAlign: "center",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
});

const loginTextStyle = css({
  textStyle: "display1",
  marginBottom: "16px",
});

const descriptionTextContainerStyle = css({
  marginBottom: "4px",
  display: "flex",
  gap: "10px",
});

const descriptionTextStyle = css({
  color: "sub",
  textStyle: "body1",
});

const imageContainerStyle = css({
  position: "relative",
  width: "100%",
  height: "100%",
});

const authImageStyle = css({
  objectFit: "cover",
  height: "100%",
  width: "100%",
});
