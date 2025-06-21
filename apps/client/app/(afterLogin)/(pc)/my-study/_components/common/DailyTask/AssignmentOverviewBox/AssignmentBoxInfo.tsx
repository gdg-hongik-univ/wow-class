import { Flex, styled } from "@styled-system/jsx";
import { Text } from "@wow-class/ui";
import { padWithZero, parseISODate } from "@wow-class/utils";
import Image from "next/image";
import type { StudyDetailTaskDto } from "types/dtos/studyDetail";
import type { AssignmentSubmissionFailureType } from "types/entities/common/assignment";
import type { DailyTaskType } from "types/entities/myStudy";
import { getAssignmentGithubFolderName } from "utils/getAssignmentGithubFolderName";

import { FailurePopover } from "./FailurePopover";

export const AssignmentBoxInfo = ({
  studyDetailTaskInfo,
}: {
  studyDetailTaskInfo: StudyDetailTaskDto<DailyTaskType>;
}) => {
  const {
    assignmentHistory,
    studySession,
    assignmentHistoryStatus,
    deadLine,
    studyHistory,
  } = studyDetailTaskInfo;

  const { year, month, day, hours, minutes } = parseISODate(deadLine);
  const deadlineText = `종료일시: ${year}년 ${month}월 ${day}일 ${padWithZero(
    hours
  )}:${padWithZero(minutes)}까지`;

  if (assignmentHistory === null) {
    return <Text color="sub">{deadlineText}</Text>;
  }
  const { submissionFailureType, submissionLink } = assignmentHistory;
  const { repositoryLink } = studyHistory;
  const { position } = studySession;

  const isAssignmentSubmissionSuccess = assignmentHistoryStatus === "SUCCEEDED";
  const isAssignmentSubmissionFailure = assignmentHistoryStatus === "FAILED";

  const isNotSubmittedFailure =
    isAssignmentSubmissionFailure && submissionFailureType === "NOT_SUBMITTED";

  const folderTitle = isAssignmentSubmissionSuccess
    ? submissionLink
    : repositoryLink;
  return (
    <>
      <Text color="sub">{deadlineText}</Text>
      {(isAssignmentSubmissionSuccess ||
        (isAssignmentSubmissionFailure && !isNotSubmittedFailure)) &&
        folderTitle && (
          <Flex alignItems="center" gap="xs">
            <Text as="div" color="sub">
              제출한 과제 :{" "}
              <Text as="span" color="textBlack">
                {`${getAssignmentGithubFolderName(folderTitle)}/week${position}`}
              </Text>
            </Text>
            <Image alt="dot" height={6} src="/images/dot.svg" width={6} />
            <styled.div
              color={isAssignmentSubmissionFailure ? "red.500" : "primary"}
              whiteSpace="nowrap"
            >
              {isAssignmentSubmissionFailure
                ? failMapping[submissionFailureType]
                : "글자수 충족"}
            </styled.div>
            <FailurePopover
              studyId={studySession.studyId}
              submissionFailureType={submissionFailureType}
            />
          </Flex>
        )}
    </>
  );
};

const failMapping: Record<AssignmentSubmissionFailureType, string> = {
  LOCATION_UNIDENTIFIABLE: "위치 확인 불가",
  WORD_COUNT_INSUFFICIENT: "글자수 부족",
  NOT_SUBMITTED: "제출 안함",
  NONE: "없음",
  UNKNOWN: "제출 실패",
};
