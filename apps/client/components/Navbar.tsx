import { css } from "@styled-system/css";
import { NavItem } from "@wow-class/ui";
import { dashboardApi } from "apis/dashboardApi";
import { myStudyApi } from "apis/myStudyApi";
import { routePath } from "constants/routePath";
import Image from "next/image";
import Link from "next/link";

import adminImageUrl from "../public/images/administrator.svg";
import folderImageUrl from "../public/images/folder.svg";
import homeImageUrl from "../public/images/home.svg";
import logoImageUrl from "../public/images/logo.svg";
import personImageUrl from "../public/images/person.svg";
import scheduleImageUrl from "../public/images/schedule.svg";
/**
 * @description client 내비게이션 바 컴포넌트입니다.
 */

const Navbar = async () => {
  const { manageRole, studyRole } = await dashboardApi.getDashboardInfo();

  const showConvertToMentorPageButton =
    manageRole === "ADMIN" || studyRole === "MENTOR";

  const myStudyList = await myStudyApi.getMyOngoingStudyInfo();
  const navMenu = [
    {
      href: "/my-study",
      imageUrl: homeImageUrl,
      alt: "home-icon",
      name: "나의 스터디",
      items: myStudyList?.map((studyItem) => {
        const { studyId, studyName } = studyItem;
        return {
          href: `${studyId}`,
          imageUrl: folderImageUrl,
          alt: studyName,
          name: studyName,
        };
      }),
    },
    {
      href: "/study-apply",
      imageUrl: scheduleImageUrl,
      alt: "schedule-icon",
      name: "수강 신청",
    },
    {
      href: "/my-page",
      imageUrl: personImageUrl,
      alt: "person-icon",
      name: "마이 페이지",
    },
  ];

  return (
    <aside aria-label="client navigation bar" className={navbarContainerStyle}>
      <Link
        aria-label="와우클래스 홈으로 이동"
        className={logoContainerStyle}
        href={routePath["my-study"]}
      >
        <div className={logoTextStyle}>와우클래스</div>
        <Image
          alt="logo"
          className={logoImageStyle}
          height={20.5}
          src={logoImageUrl}
          width={42}
        />
      </Link>
      <nav
        aria-label="client nav menu"
        className={navContainerStyle}
        role="navigation"
      >
        <section>
          {navMenu.map((menu) => (
            <NavItem
              alt={menu.alt}
              href={menu.href}
              imageUrl={menu.imageUrl}
              items={menu.items}
              key={menu.name}
              name={menu.name}
            />
          ))}
        </section>
        <section>
          {showConvertToMentorPageButton && (
            <NavItem
              alt="administrator-icon"
              href={routePath.admin || ""}
              imageUrl={adminImageUrl}
              name="멘토 페이지로 전환"
            />
          )}
        </section>
      </nav>
    </aside>
  );
};

export default Navbar;

const navbarContainerStyle = css({
  width: "250px",
  minWidth: "250px",
  height: "100vh",
  position: "fixed",
  paddingTop: "54px",
  borderRightWidth: "arrow",
  borderColor: "mono.400",
});

const logoTextStyle = css({
  fontSize: "24px",
  fontWeight: 700,
  lineHeight: "130%",
  letterSpacing: "-0.24px",
});

const logoImageStyle = css({
  width: "42px",
  height: "20.5px",
});

const navContainerStyle = css({
  padding: "8px 0px",
  display: "flex",
  flexDirection: "column",
  minHeight: "calc(100vh - 98px)",
  justifyContent: "space-between",
});

const logoContainerStyle = css({
  display: "flex",
  alignItems: "center",
  gap: "sm",
  padding: "6px 0px 7px 20px",
});
