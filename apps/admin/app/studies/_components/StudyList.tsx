"use client";
import { css } from "@styled-system/css";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo } from "react";
import type { StudyListApiResponseDto } from "types/dtos/studyList";

import EmptyStudyList from "./EmptyStudyList";
import StudyListItem from "./StudyListItem";

interface StudyListProps {
  studyList: StudyListApiResponseDto[] | undefined;
  semesterList: string[] | undefined;
  adminStatus: boolean;
}

const StudyList = ({
  studyList,
  semesterList,
  adminStatus,
}: StudyListProps) => {
  const semester = useSearchParams().get("semester");
  const router = useRouter();

  useEffect(() => {
    if (semester && semesterList && !semesterList.includes(semester))
      router.replace("/studies");
  }, [router, semester, semesterList]);

  const SortedStudies = useMemo(() => {
    if (!studyList) return [];

    const filtered = studyList.filter((studyItem) => {
      if (semester === null) return true;
      const currentSemesterString = `${studyItem.study.semester.academicYear}-${
        studyItem.study.semester.semesterType === "FIRST" ? 1 : 2
      }`;
      return semester === currentSemesterString;
    });

    return filtered.sort((a, b) => {
      const semesterA = a.study.semester;
      const semesterB = b.study.semester;

      if (semesterA.academicYear !== semesterB.academicYear) {
        return semesterB.academicYear - semesterA.academicYear;
      }

      const weightA = semesterA.semesterType === "SECOND" ? 2 : 1;
      const weightB = semesterB.semesterType === "SECOND" ? 2 : 1;
      if (weightA !== weightB) {
        return weightB - weightA;
      }

      return a.study.type.localeCompare(b.study.type);
    });
  }, [studyList, semester]);

  if (studyList?.length === 0) {
    return <EmptyStudyList />;
  }

  return (
    <section aria-label="study-list" className={SectionStyle}>
      {SortedStudies.map((studyItem) => (
        <StudyListItem
          adminStatus={adminStatus}
          key={`${studyItem.study.studyId}`}
          study={studyItem}
        />
      ))}
    </section>
  );
};

export default StudyList;

const SectionStyle = css({
  width: "100%",
  height: "100%",
  overflow: "auto",
});
