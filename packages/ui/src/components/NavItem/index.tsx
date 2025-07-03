"use client";

import { css, cva } from "@styled-system/css";
import { styled } from "@styled-system/jsx";
import Image from "next/image";
import Link from "next/link";
import { useSelectedLayoutSegments } from "next/navigation";
import { useState } from "react";

import arrowImageUrl from "../../assets/images/arrow.svg";
import Text from "../Text";

/**
 * @description 내비게이션 바에서 사용하는 내비게이션 아이템 컴포넌트입니다.
 *
 * @param {string} href - 내비게이션 아이템의 링크 주소
 * @param {string} imageUrl - 내비게이션 아이템의 아이콘 이미지 URL
 * @param {string} alt - 내비게이션 아이템 아이콘 이미지의 대체 텍스트
 * @param {string} name - 내비게이션 아이템의 이름
 * @param {Array<{href: string, imageUrl: string, alt: string, name: string}>} [items] - 서브 내비게이션 아이템 배열
 * @returns {JSX.Element} 내비게이션 아이템 컴포넌트
 */
export interface NavItemProps {
  href: string;
  imageUrl: string;
  alt: string;
  name: string;
  items?: {
    href: string;
    imageUrl: string;
    alt: string;
    name: string;
  }[];
}

const NavItem = ({ href, imageUrl, alt, name, items }: NavItemProps) => {
  const [expanded, setExpanded] = useState(
    Boolean(items?.length && items?.length <= 1)
  );

  const segment = useSelectedLayoutSegments() || [];

  const handleClickNavItem = () => {
    if (items?.length !== 1) {
      setExpanded((prev) => !prev);
    }
  };

  const currentPath = `/${segment.join("/")}`;

  const navItemType =
    currentPath === href &&
    ((!segment[1] && `${segment[0]}` === href) || `/${segment[0]}` === href)
      ? "active"
      : "inactive";

  const hasSubNavItems = items && items.length > 1;
  return (
    <styled.div listStyle="none" role="presentation">
      <Link
        {...(hasSubNavItems && { "aria-controls": `${name}-submenu` })}
        aria-expanded={expanded ? "true" : "false"}
        {...(hasSubNavItems && { "aria-haspopup": "true" })}
        href={href}
        {...(navItemType === "active" && {
          onClick: (e) => e.preventDefault(),
        })}
        aria-label={`${name} 네비게이션 아이템`}
        tabIndex={0}
        className={navItemStyle({
          type: navItemType,
        })}
        onClick={handleClickNavItem}
      >
        <Image
          alt={alt}
          className={navItemImageStyle}
          height={20}
          src={imageUrl}
          width={20}
        />
        <Text as="div" typo="body1">
          {name}
        </Text>
        {hasSubNavItems && (
          <Image
            alt="toggle-icon"
            className={toggleIconStyle}
            height={20}
            src={arrowImageUrl}
            style={{ transform: expanded ? "rotate(0deg)" : "rotate(180deg)" }}
            width={20}
          />
        )}
      </Link>
      {expanded && items && (
        <ul aria-labelledby={name} id={`${name}-submenu`} role="menu">
          {items.map((item) => (
            <li key={item.name} role="none">
              <Link
                aria-label={`${item.name} 네비게이션 아이템`}
                href={`${href}/${item.href}`}
                role="menuitem"
                style={{ padding: "11px 36px" }}
                className={navItemStyle({
                  type: segment[1] === item.href ? "active" : "inactive",
                })}
                {...(segment[1] === item.href && {
                  onClick: (e) => e.preventDefault(),
                })}
              >
                <Image
                  alt={item.alt}
                  className={navItemImageStyle}
                  height={20}
                  src={item.imageUrl}
                  width={20}
                />
                <Text as="div" typo="body1">
                  {item.name}
                </Text>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </styled.div>
  );
};

export default NavItem;

const navItemStyle = cva({
  base: {
    display: "flex",
    gap: "12px",
    marginRight: "8px",
    alignItems: "center",
    padding: "11px 18px 11px 20px",
  },
  variants: {
    type: {
      active: {
        bg: "monoBackgroundPressed",
      },
      inactive: {
        bg: "white",
      },
    },
  },
});

const toggleIconStyle = css({
  width: "20px",
  height: "20px",
  marginLeft: "auto",
});

const navItemImageStyle = css({ width: "20px", height: "20px" });
