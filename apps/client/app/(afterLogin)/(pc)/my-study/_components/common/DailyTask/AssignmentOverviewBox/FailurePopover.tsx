import { Flex } from "@styled-system/jsx";
import { Text } from "@wow-class/ui";
import { myStudyApi } from "apis/myStudyApi";
import Popover from "components/Popover";
import type { CSSProperties } from "react";
import type { StudyDetailTaskDto } from "types/dtos/studyDetail";
import type { AssignmentSubmissionFailureType } from "types/entities/common/assignment";
import type { DailyTaskType } from "types/entities/myStudy";
import { Help as HelpIcon } from "wowds-icons";

interface FailurePopoverProps {
  submissionFailureType: AssignmentSubmissionFailureType;
  studyId: StudyDetailTaskDto<DailyTaskType>["studySession"]["studyId"];
}
export const FailurePopover = async ({
  submissionFailureType,
  studyId,
}: FailurePopoverProps) => {
  if (
    submissionFailureType === "NONE" ||
    submissionFailureType === "NOT_SUBMITTED"
  )
    return null;

  let questionText = "";
  let detailContent: React.ReactNode = null;

  const basicInfo = await myStudyApi.getBasicStudyInfo(studyId);
  const minimumLength = basicInfo?.minAssignmentLength ?? 300;

  switch (submissionFailureType) {
    case "WORD_COUNT_INSUFFICIENT":
      questionText = "Q. 글자수가 부족하다고 나와요.";
      detailContent = (
        <p>
          wil.md 파일에 배운 내용을 최소 {minimumLength}
          자 이상 작성해야 해요. <br />
          <br />
          제대로 제출한 후에도 계속 글자수가 부족하다고 나온다면,
          <br />
          GDG Hongik Univ. 카카오톡 채널로 문의해주세요.
        </p>
      );
      break;

    case "LOCATION_UNIDENTIFIABLE":
      questionText = 'Q. "위치 확인 불가" 라고 나와요.';
      detailContent = (
        <>
          아래 조건에 맞게 wil.md 파일을 제출했는지 확인해주세요. <br />
          <br />
          <ul style={ulStyle}>
            <li>본인의 레포지토리가 맞는지</li>
            <li>제출한 브랜치 이름이 main인지</li>
            <li>파일 위치가 `weekn/wil.md` 가 맞는지</li>
            <li>커밋 후 원격 저장소에 push까지 완료했는지</li>
          </ul>
          <br />
          <br />
          제대로 제출한 후에도 계속 "위치 확인 불가"라고 나온다면, GDG Hongik
          Univ. 카카오톡 채널로 문의해주세요.
        </>
      );
      break;

    case "UNKNOWN":
      questionText = 'Q. "제출 실패" 라고 나와요.';
      detailContent = (
        <p>
          제출이 실패한 이유를 파악할 수 없어요. <br />
          <br />
          이름, 학번과 함께 어떤 상황인지
          <br />
          GDG Hongik Univ. 카카오톡 채널로 전달해주세요.
        </p>
      );
      break;

    default:
      return null;
  }

  return (
    <Popover
      triggerContent={<HelpIcon fill="sub" stroke="sub" style={iconStyle} />}
    >
      <Flex direction="column" gap="xs">
        <Text color="textWhite" typo="body3">
          {questionText}
        </Text>
        <Text as="div" color="outline" typo="body3">
          {detailContent}
        </Text>
      </Flex>
    </Popover>
  );
};

const iconStyle: CSSProperties = {
  cursor: "pointer",
};

const ulStyle: CSSProperties = {
  listStyleType: "disc",
  paddingLeft: "15px",
};
