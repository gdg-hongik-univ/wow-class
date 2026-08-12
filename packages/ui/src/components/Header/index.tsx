import { css } from "@styled-system/css";
import Image from "next/image";
import Link from "next/link";

import logoImageUrl from "../../assets/images/logo.svg";

/**
 * @description client 헤더 컴포넌트입니다.
 */

const Header = () => {
  return (
    <header className={headerContainerStyle} role="banner">
      <Link className={logoContainerStyle} href="/landing">
        <Image
          alt="gdg hongik univ. logo"
          className={imageStyle}
          height={24}
          src={logoImageUrl}
          width={49}
        />
        <div aria-level={1} className={titleStyle} role="heading">
          GDG
        </div>
        <div aria-level={2} className={subTitleStyle} role="heading">
          Hongik Univ.
        </div>
      </Link>
    </header>
  );
};

export default Header;

const headerContainerStyle = css({
  width: "100vw",
  height: "54px",
  borderBottomWidth: "button",
  borderBottomColor: "mono.400",
  borderBottomStyle: "solid",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

const logoContainerStyle = css({
  display: "flex",
  gap: "8px",
  width: "956px",
  paddingX: "16px",
  alignItems: "center",
  cursor: "pointer",
});

const imageStyle = css({
  width: "49px",
  height: "24px",
});

const titleStyle = css({
  fontFamily: "Product Sans",
  fontWeight: 700,
  fontSize: "20px",
  lineHeight: "130%",
});

const subTitleStyle = css({
  fontFamily: "Product Sans",
  fontWeight: 400,
  fontSize: "14px",
  lineHeight: "130%",
  color: "primary",
});
