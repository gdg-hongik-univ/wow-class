import { css } from "@styled-system/css";
import { Flex } from "@styled-system/jsx";
import { studyApi } from "apis/study/studyApi";
import { routerPath } from "constants/router/routerPath";
import Link from "next/link";
import isAdmin from "utils/isAdmin";
import { Edit } from "wowds-icons";
import Divider from "wowds-ui/Divider";

import StudyAnnouncement from "./_components/announcement/StudyAnnouncement";
import AssignmentList from "./_components/assignment/AssignmentList";
import AttendanceList from "./_components/attendance/AttendanceList";
import CurriculumList from "./_components/curriculum/CurriculumList";
import Header from "./_components/header/Header";
import StudyStatics from "./_components/statics/StudyStatics";

export const generateMetadata = async ({
  params: { studyId },
}: {
  params: { studyId: string };
}) => {
  const study = await studyApi.getStudyBasicInfo(+studyId);
  return {
    title: study ? study.title : "스터디",
  };
};

const StudyPage = async ({ params }: { params: { studyId: string } }) => {
  const { studyId } = params;
  const adminStatus = await isAdmin();
  const data = adminStatus
    ? await studyApi.getStudyList()
    : await studyApi.getMyStudyList();
  const myStudy = data?.filter((study) => study.study.studyId === +studyId)[0];
  return (
    <Flex direction="column" gap="64px">
      <div className={HeaderWrapper}>
        <Header studyId={studyId} />
        <Link
          href={`${routerPath.studyDetailInfo.href}/${studyId}`}
          style={{ ...EditIconStyle, position: "absolute" }}
        >
          <Edit height={24} stroke="black" width={24} />
        </Link>
      </div>
      <AttendanceList studySessions={myStudy?.studySessions} />
      <Divider style={MinHeightFullDividerStyle} />
      <StudyAnnouncement studyId={studyId} />
      {/* <AssignmentList studyId={studyId} /> */}
      {/* <Divider style={MinHeightFullDividerStyle} />
      
      <Divider style={MinHeightFullDividerStyle} />
      <CurriculumList studyId={studyId} />
      <Divider style={MinHeightFullDividerStyle} />
      <StudyStatics studyId={studyId} /> */}
    </Flex>
  );
};

export default StudyPage;

const MinHeightFullDividerStyle = {
  minHeight: "1.2px",
};

const EditIconStyle = {
  position: "absolute",
  right: "0px",
  top: "0px",
  cursor: "pointer",
};

const HeaderWrapper = css({
  position: "relative",
  height: "fit-content",
});
